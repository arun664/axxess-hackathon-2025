import Layout from "@/components/default/layout";
import "../styles/globals.css";
import { AuthProvider } from "@/context/AuthContext";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  if (Component.noLayout) {
    return (
      <>
        <Head>
          <title>AxxessHealth</title>
        </Head>
        <Component {...pageProps} />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>AxxessHealth</title>
      </Head>
      <AuthProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </>
  );
}

export default MyApp;
