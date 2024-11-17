import Aside from "@/components/Aside/Aside";
import BubalinosContent from "@/components/BubalinosContent/BubalinosContent";

import Container from "@/components/Container/Container";
import Header from "@/components/Header/Header";
import Head from "next/head";


export default function Bubalinos() {
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
                <BubalinosContent/>
                </Container>
            </main>
        </>
    )
}