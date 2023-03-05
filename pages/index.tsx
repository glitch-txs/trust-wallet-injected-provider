import Trust from '@/components/Trust'
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
      <Trust/>
      <button onClick={()=> window.open("https://link.trustwallet.com/open_url?coin_id=60&url=https://trust-wallet-injected-provider.vercel.app/")} >
        Deep Link
      </button>
      </div>
    </>
  )
}
