import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Nav from '../components/nav';

export default function Home() {
	return (
		<div className={styles.container}>
			<Nav>
				<h1>test</h1>
			</Nav>
		</div>
	);
}
