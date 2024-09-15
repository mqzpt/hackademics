import Head from "next/head";
import Header from "../components/Header";
import Main from "../components/Main";

import { NextSeo } from "next-seo";

export default function Home() {
  return (
    <div className="text-black bg-black">
      <NextSeo
        title="Home: nine4"
        description="Welcome to nine4 homepage."
        canonical="https://nine4-3.vercel.app/"
        openGraph={{
          url: "https://nine4-3.vercel.app/",
        }}
      />
      <Head>
        <title>StudySphere</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Header />
      <Main />
    </div>
  );
}
