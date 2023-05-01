import Head from "next/head";

export default function CustomHead({ title }) {
  return (
    <Head>
      <title>{title}</title>
      <meta
        name="description"
        content="Revolutionize your HR processes with our cutting-edge Next.js application, tailored to streamline and enhance your workforce management experience."
      />
      <meta
        name="keywords"
        content="Human resource, Engage Candid, Scan a job description for problematic language, Act like a researcher"
      />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/logo.svg" />
    </Head>
  );
}
