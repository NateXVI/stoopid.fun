import Image from 'next/image';
import styles from '../styles/Nav.module.css';
import Link from 'next/link';

export default function Nav({ children }) {
	const pictureSize = 50;
	return (
		<>
			<nav className={styles.nav}>
				<div className={styles.titleContainer}>
					<Link href="/">
						<a>
							<div className={styles.iconContainer}>
								<Image
									src="/images/icon.png"
									width={`${pictureSize}px`}
									height={`${pictureSize}px`}
									className={styles.icon}
									placeholder="icon"
								/>
							</div>
						</a>
					</Link>
					<Link href="/">
						<a>
							<h1>stoopid.fun</h1>
						</a>
					</Link>
				</div>
			</nav>
			<main>{children}</main>
		</>
	);
}
