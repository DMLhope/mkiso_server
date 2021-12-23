import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import App from "../src/App.jsx";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Mkiso</title>
        <meta name="description" content="Mkiso" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <App />
    </div>
  );
}
