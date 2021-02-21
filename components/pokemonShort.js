import useSWR from 'swr';
import Link from 'next/link';
import Image from 'next/image';

import fetcher from '../lib/fetcher';
import {
  PokemonTypeColors,
  leftPad,
  transformSpriteToBaseImage,
  baseImageUrl,
} from './../lib/global';

const MaskStyling = {
  width: 130,
  height: 130,
  zIndex: -10,
  bottom: 8,
  left: 16,
};
const ImageContainerStyling = {
  width: 175,
  height: 175,
};

function PokemonShort({ name }) {
  const { data, error } = useSWR(`https://pokeapi.co/api/v2/pokemon/${name}`, fetcher);

  if (error) return <h1>Something went wrong!</h1>;
  if (!data) return <h1>Loading...</h1>;

  const backgroundColors = data.types.map(({ type }) => {
    const [[, backgroundColor]] = Object.entries(PokemonTypeColors).filter(
      ([key]) => key === type.name
    );

    return backgroundColor;
  });

  return (
    <div className="my-5 p-2 w-1/3">
      <Link href={`/pokemon/${name}`}>
        <div
          className="w-full rounded-lg overflow-hidden shadow-lg mx-auto cursor-pointer hover:shadow-2xl transition-all duration-200 ease-in-out transform hover:-translate-y-2"
          style={{
            backgroundColor: backgroundColors[0].medium,
          }}>
          <div
            className="py-32 mx-auto w-full flex items-center justify-center relative"
            style={{
              backgroundColor: backgroundColors[0].medium,
            }}>
            <p className="text-6xl font-semibold text-black text-opacity-25 absolute tracking-xl top-1/8 pointer-events-none">
              #{leftPad(data.id, 3)}
            </p>
            <div className="inset-x-auto bottom-0 absolute z-20" style={ImageContainerStyling}>
              <div
                className="rounded-full absolute z-0 inset-x-auto mx-auto"
                style={{
                  ...MaskStyling,
                  backgroundColor: backgroundColors[0].light,
                }}
              />
              <Image
                src={transformSpriteToBaseImage(data.id, baseImageUrl)}
                alt={name}
                width={175}
                height={175}
              />
            </div>
          </div>
          <div className="bg-white w-full pt-5 pb-8 text-center">
            <h1 className="capitalize font-semibold text-3xl mb-2">{data.name}</h1>
            <div className="flex flex-wrap mx-auto justify-center">
              {data.types.map(({ type }, index) => {
                return (
                  <p
                    key={`${data.id}-${type.name}`}
                    className={
                      'font-bold uppercase text-sm' +
                      (index !== data.types.length - 1 ? ' mr-6' : '')
                    }
                    style={{ color: backgroundColors[index].medium }}>
                    {type.name}
                  </p>
                );
              })}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default PokemonShort;
