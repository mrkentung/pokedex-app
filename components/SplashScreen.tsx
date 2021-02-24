import React from 'react';
import Image from 'next/image';

const SplashScreen = () => {
  return (
    <div className="bg-primary h-screen w-full text-center relative flex items-center justify-center">
      <Image 
        className="w-24 h-24 animate-spin mb-16"
        alt="Pokeball"
        src="/images/pokeball.png"
        height={40}
        width={40}
      />
    </div>
  );
};
export default SplashScreen;
