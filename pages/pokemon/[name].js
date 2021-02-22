import { useRef } from 'react'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { useSpring, animated } from 'react-spring'

import fetcher from './../../lib/fetcher';
import { useResize } from './../../hooks/useResize'
import {
  PokemonTypeColors,
  leftPad,
  transformSpriteToBaseImage,
  baseImageUrl,
} from './../../lib/global'

import PokemonStats from './../../components/pokemonStats'
import MainLayout from './../../layouts/main'

const calc = (x, y, width, height) => [x - width / 2, y - height / 2];

const trans1 = (x, y) => `translate3d(-${x / 30}px,-${y / 30}px,0)`;

const trans2 = (x, y) => `translate3d(${x / 20}px,${y / 20}px,0)`;

const MaskSize = 225;
const ImageSize = 325;

const MaskStyling = {
  width: MaskSize,
  height: MaskSize,
  bottom: 55,
};

const PokemonImageStyling = {
  position: 'absolute',
  width: ImageSize,
  height: ImageSize,
  display: 'block',
  left: 0,
  right: 0,
  bottom: 5,
  margin: 'auto',
};

const transformStatNames = (statName) => {
  const map = [
    ['special-attack', 'Sp. Atk'],
    ['special-defense', 'Sp. Def'],
  ];
  let transformed = statName;
  map.forEach(([a, b]) => {
    if (a === statName) {
      transformed = b;
    }
  });

  return transformed;
};

const PokemonDetail = () => {
  const router = useRouter();

  const { data, error } = useSWR(`https://pokeapi.co/api/v2/pokemon/${router.query.name}`, fetcher);

  const [props, set] = useSpring(() => ({
    xy: [0, 0],
    config: { mass: 10, tension: 550, friction: 140 },
  }));

  const containerRef = useRef(null);
  const { width, height, top, left } = useResize(containerRef);

  const pokemon = data;

  if (error) return <h1>Something went wrong!</h1>;
  if (!pokemon) return <h1>Loading...</h1>;

  const backgroundColors = pokemon.types.map(({ type }) => {
    const [[, backgroundColor]] = Object.entries(PokemonTypeColors).filter(
      ([key]) => key === type.name
    );

    return backgroundColor;
  });

  const stats = pokemon.stats.map((resource) => ({
    name: transformStatNames(resource.stat.name),
    min: resource.base_stat,
    max:
      resource.stat.name === 'hp'
        ? Number(resource.base_stat) * 2 + 204
        : (Number(resource.base_stat) * 2 + 99) * 1.1,
  }));

  return (
    <MainLayout>
      <div className="px-2 md:px-24 lg:px-64 pt-24">
        <div className="container mx-auto">
          <button
            className="text-primary font-semibold transform hover:-translate-y-1 transition-transform ease-in duration-150 focus:outline-none"
            onClick={() => router.back()}>
            <span className="text-primary font-semibold">Go Back</span>
          </button>
          <div
            className="flex flex-col lg:flex-row justify-center items-start w-full mx-auto my-4 rounded-lg shadow-lg"
            style={{
              backgroundColor: backgroundColors[0].medium,
            }}>
            <div
              className="w-full"
              ref={containerRef}
              onMouseMove={({ clientX, clientY }) =>
                set({
                  xy: calc(clientX - left, clientY - top, width + left, height + top),
                })
              }>
              <div className="px-4 md:px-8">
                <p className="text-md mt-4 text-white font-medium">#{leftPad(data.id, 3)}</p>
                <h1 className="text-2xl md:text-3xl lg:text-4xl text-white font-bold pb-6 capitalize">
                  {data.species.name}
                </h1>
              </div>
              <div className="relative text-center mx-auto w-full h-96 mt-8 lg:mt-24">
                <animated.div
                  style={{
                    ...MaskStyling,
                    backgroundColor: backgroundColors[0].light,
                    transform: props.xy.interpolate(trans1),
                  }}
                  className="rounded-full absolute inset-x-auto mx-auto z-0 inline-block left-0 right-0"
                />
                <animated.div
                  style={{
                    ...PokemonImageStyling,
                    position: 'absolute',
                    transform: props.xy.interpolate(trans2),
                  }}>
                  <Image
                    src={transformSpriteToBaseImage(data.id, baseImageUrl)}
                    alt={name}
                    width={175}
                    height={175}
                  />
                </animated.div>
              </div>
            </div>
            <div className="-mt-12" />
            <div className="bg-white lg:mt-0 rounded-t-3xl rounded-b-lg lg:rounded-t-none lg:rounded-b-none lg:rounded-r-lg overflow-hidden w-full pt-16 lg:pt-8 px-6 md:px-12 lg:px-24">
              <div className="relative mt-8 lg:h-178">
                <h1 className="font-semibold text-lg mb-4">Base Stats</h1>
                <ul className="capitalize">
                  {stats.map((st) => (
                    <PokemonStats
                      key={`stats-${st.name}`}
                      title={st.name}
                      min={st.min}
                      max={st.max}
                    />
                  ))}
                </ul>
                <p className="mt-10 mb-6 text-darkerGray font-medium">
                  Min & Max values are calculated for level 100 Pokemon. Minimum values are based on 0
                  EVs & 0 IVs, meanwhile Maximum values are based on 252 EVs & 31 IVs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default PokemonDetail;
