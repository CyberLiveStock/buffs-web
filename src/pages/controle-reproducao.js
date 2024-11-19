import Aside from "@/components/Aside/Aside";
import Container from "@/components/Container/Container";
import Header from "@/components/Header/Header";
import ReproducaoContent from "@/components/ReproducaoContent/ReproducaoContent";
import Head from "next/head";

export default function Reproducao() {
  return (
    <>
      <Head>
        <title>Buffs &copy; 2024</title>
        <meta name="description" content="Buffs" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header/>
        <Container>
            <Aside/>
            <ReproducaoContent/>
        </Container>
      </main>
    </>
  );
}
