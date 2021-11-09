import React, { Component } from 'react';
import styles from '../styles/dvd.module.css';

export default class Sketch extends Component {
	constructor(props) {
		super();
		this.renderRef = React.createRef();
		this.state = {};
	}

	componentDidMount() {
		const p5 = require('p5');

		this.sketch = new p5((p) => {
			this.dvdScale = 0.25;

			p.preload = () => {
				this.dvdImage = p.loadImage('/dvd/dvdlogo.png');
			};

			p.setup = () => {
				p.createCanvas(p.windowWidth - 2, p.windowHeight).parent(this.renderRef.current);
				p.background('white');

				p.colorMode(p.HSL, 100);
				this.dvdSpeed = p.createVector(p.random([-1, 1]), p.random([-1, 1])).setMag(0.3);
				p.angleMode(p.DEGREES);
				this.dvdSpeed.rotate(p.random(-10, 10));
				this.backgroundColor = p.color(p.random(100), 100, 50);
				p.background(this.backgroundColor);
				this.dvdPos = p.createVector(
					p.random(0, p.width - this.dvdImage.width * this.dvdScale),
					p.random(0, p.height - this.dvdImage.height * this.dvdScale)
				);
				p.windowResized();
			};

			p.draw = () => {
				p.background(this.backgroundColor);
				let a;
				dvdMove(this, p);
				p.image(
					this.dvdImage,
					this.dvdPos.x,
					this.dvdPos.y,
					this.dvdImage.width * this.dvdScale,
					this.dvdImage.height * this.dvdScale
				);
				if (p.millis() < 2000) {
					p.push();
					p.fill(255);
					p.textFont('sans-serif', 40);
					p.textAlign(p.CENTER, p.CENTER);
					p.text('click!', p.width / 2, p.height / 2);
					p.pop();
				}
			};

			p.windowResized = () => {
				p.resizeCanvas(p.windowWidth, p.windowHeight);
			};

			function dvdMove(a, p) {
				a.dvdPos.x += a.dvdSpeed.x * p.deltaTime;
				a.dvdPos.y += a.dvdSpeed.y * p.deltaTime;

				if (a.dvdPos.x < 0) {
					//dvdPos.x *= -1;
					a.dvdPos.x = p.constrain(
						a.dvdPos.x,
						0,
						p.width - a.dvdImage.width * a.dvdScale
					);
					a.dvdSpeed.x *= -1;
					changeBackground(a, p);
				}
				if (a.dvdPos.y < 0) {
					//dvdPos.y *= -1;
					a.dvdPos.y = p.constrain(
						a.dvdPos.y,
						0,
						p.height - a.dvdImage.height * a.dvdScale
					);
					a.dvdSpeed.y *= -1;
					changeBackground(a, p);
				}
				if (a.dvdPos.x > p.width - a.dvdImage.width * a.dvdScale) {
					//dvdPos.x -= 2 * abs(dvdPos.x - dvdImage * dvdScale);
					a.dvdPos.x = p.constrain(
						a.dvdPos.x,
						0,
						p.width - a.dvdImage.width * a.dvdScale
					);
					a.dvdSpeed.x *= -1;
					changeBackground(a, p);
				}
				if (a.dvdPos.y > p.height - a.dvdImage.height * a.dvdScale) {
					a.dvdPos.y = p.constrain(
						a.dvdPos.y,
						0,
						p.height - a.dvdImage.height * a.dvdScale
					);
					a.dvdSpeed.y *= -1;
					changeBackground(a, p);
				}
			}

			function changeBackground(a, p) {
				let oldColor = a.backgroundColor;
				a.backgroundColor = p.color(p.random(100), 100, 50);
				let d = p.abs(p.hue(a.backgroundColor) - p.hue(oldColor));
				if (d < 10 || d > 90) changeBackground(a, p);
				let r = p.random(-15, 15);
				// dvdSpeed.rotate(r);
			}
		});
	}

	render() {
		return (
			<div>
				<div ref={this.renderRef} className={styles.canvasContainer}></div>
			</div>
		);
	}
}
