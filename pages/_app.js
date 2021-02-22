import React from 'react'
import Head from 'next/head'

import '../styles/tailwind.css'

function MyApp({ Component, pageProps }) {
  const Layout = Component.Layout ? Component.Layout : React.Fragment

  return (
    <Layout>
      <Head>
        <title>Podedex</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp;
