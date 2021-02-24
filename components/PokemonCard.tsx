import React from 'react';
import { useRouter } from 'next/router';

import { Pokemon } from './../features/pokemonSlice';
import { PokemonTypeColors, PokemonTypePlaceholders } from './../lib/global';
import { leftPad } from './../lib/leftpad';
import Trail from './Trail';
import ProgressiveImage from 'react-progressive-image-loading';

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

type Props = Pokemon;

const PokemonCard = ({ id, name, sprites, types }: Props) => {
  const router = useRouter();

  const backgroundColors = types.map(({ type }) => {
    const [[, backgroundColor]] = Object.entries(PokemonTypeColors).filter(
      ([key]) => key === type.name
    );

    return backgroundColor;
  });

  const imagePlaceholder = types.map(({ type }) => {
    const [[image]] = Object.entries(PokemonTypePlaceholders).filter(([key]) => key === type.name);

    return image;
  });

  return (
    <Trail open={true}>
      <div
        className="w-full rounded-lg overflow-hidden shadow-lg mx-auto cursor-pointer hover:shadow-2xl transition-all duration-200 ease-in-out transform hover:-translate-y-2"
        style={{
          backgroundColor: backgroundColors[0].medium,
        }}
        aria-hidden="true"
        onClick={() => router.push(`/pokemon/${id}`)}>
        <div
          className="py-32 mx-auto w-full flex items-center justify-center relative"
          style={{
            backgroundColor: backgroundColors[0].medium,
          }}>
          <p className="text-6xl font-semibold text-black text-opacity-25 absolute tracking-xl top-1/8 pointer-events-none">
            #{leftPad(id, 3)}
          </p>

          <div className="inset-x-auto bottom-0 absolute z-20" style={ImageContainerStyling}>
            <div
              className="rounded-full absolute z-0 inset-x-auto mx-auto"
              style={{
                ...MaskStyling,
                backgroundColor: backgroundColors[0].light,
              }}
            />
            <ProgressiveImage
              preview={imagePlaceholder[0]}
              src={sprites.frontDefault}
              render={(src, style) => <img src={src} style={style} alt={name} />}
            />
          </div>
        </div>

        <div className="bg-white w-full pt-5 pb-8 text-center">
          <h1 className="capitalize font-semibold text-3xl mb-2">{name}</h1>
          <div className="flex flex-wrap mx-auto justify-center">
            {types.map(({ type }, index) => {
              return (
                <p
                  key={`${id}-${type.name}`}
                  className={
                    'font-bold uppercase text-sm' + (index !== types.length - 1 ? ' mr-6' : '')
                  }
                  style={{ color: backgroundColors[index].medium }}>
                  {type.name}
                </p>
              );
            })}
          </div>
        </div>
      </div>
    </Trail>
  );
};

export default PokemonCard;
