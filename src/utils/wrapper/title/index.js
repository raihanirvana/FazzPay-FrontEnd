import Head from "next/head";

function Title({ title, children }) {
  return (
    <>
      <Head>
        <title>FazzPay - {title}</title>
      </Head>
      {children}
    </>
  );
}

export default Title;
