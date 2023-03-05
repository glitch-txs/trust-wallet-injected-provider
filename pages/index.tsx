import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>Trust Wallet Injected Provider</title>
        <meta name="description" content="Test for TW Provider" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection:'column', gap:'30px' }} >
      <button>
        Connect
      </button>
    </div>
    </>
  )
}
