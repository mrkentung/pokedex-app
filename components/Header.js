import Image from 'next/image';

const Header = () => {
  return (
    <div className="w-full bg-primary flex items-center justify-center py-2 transition-all duration-300 transform">
      <Image
        className="w-10 h-10 transition duration-500 ease-in-out transform hover:rotate-180 cursor-pointer"
        alt="Pokeball"
        src="/images/pokeball.png"
        height={40}
        width={40}
      />
    </div>
  );
};

export default Header;
