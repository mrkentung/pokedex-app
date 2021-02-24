import React, { FC } from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';

import '../styles/tailwind.css';
import store from '../features/store';

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  // const Layout = Component ? Component : React.Fragment;

  return (
    <>
      <Head>
        <title>Podedex</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  );
};

export default MyApp;
