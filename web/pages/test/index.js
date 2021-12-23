import Head from "next/head";
import Image from "next/image";
import Custom_iso from "../../src/Custom_iso";
import Conf_page from "../../src/Conf_page";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Test</title>
        <meta name="description" content="Test" />
        <link rel="icon" href="/favicon4.ico" />
      </Head>

      {/* <Custom_iso /> */}
      <Conf_page />
    </div>
  );
}
