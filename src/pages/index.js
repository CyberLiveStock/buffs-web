import LoginContainer from "@/components/LoginContainer/LoginContainer";
import LoginContent from "@/components/LoginContent/LoginContent";
// Import LoginContent from "@/components/LoginContent"
import Head from "next/head";

export default function Index() {
  return (
    <>
      <Head>
        <title>Buffs &copy; 2024</title>
        <meta name="description" content="Buffs" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <LoginContainer>
          <LoginContent />
        </LoginContainer>
      </main>
    </>
  );
}
