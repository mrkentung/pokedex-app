import { Fragment } from 'react';
import Head from 'next/head';

export default function Home() {
  return (
    <Fragment>
      <Head>
        <title>Home</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="md:flex bg-white rounded-lg p-24 justify-center">
        <img
          className="h-16 w-16 md:h-24 md:w-24 rounded-full mx-auto md:mx-0 md:mr-6"
          src="https://pbs.twimg.com/profile_images/595885543474401280/LbeFDcwr_400x400.jpg"
          alt="profile pict"
        />
        <div className="text-center md:text-left">
          <h2 className="text-lg">Adhi Widiyanto</h2>
          <div className="text-purple-500">JavaScript developer</div>
          <div className="text-gray-600">Twitter: @mrkentunggg</div>
          <div className="text-gray-600">tawadancanda@gmail.com</div>
        </div>
      </div>
      <div className="p-4 shadow rounded bg-white container mx-auto">
        <h1 className="text-purple-500 leading-normal">Next.js</h1>
        <p className="text-gray-500">with Tailwind CSS</p>
      </div>
    </Fragment>
  );
}
