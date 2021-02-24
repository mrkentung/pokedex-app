import React from 'react';
import { useSelector } from 'react-redux';
import { AiFillGithub } from 'react-icons/ai';

import PokemonForm from './../components/PokemonForm';
import MainLayout from './../layouts/main';
import InfiniteScroll from './../components/InfiniteScroll';
import PokemonCard from './../components/PokemonCard';
import { pokemonsSelector, getPokemons } from './../features/pokemonSlice';
import { SliceStatus } from './../lib/global';
import { cachedPokemonsSelector } from './../features/cachedPokemonsSlice';
import PokemonSkeleton from './../components/PokemonSkeleton';

const Index = () => {
  const pokemons = useSelector(pokemonsSelector);
  const cachedPokemons = useSelector(cachedPokemonsSelector);

  return (
    <MainLayout>
      <div className="px-2 md:px-24 lg:px-64 pt-24">
        <div className="container mx-auto flex items-center justify-center lg:justify-start">
          <h1 className="text-3xl lg:text-5xl font-semibold sm:text-left inline-block">
            React Pokédex
          </h1>
          <a
            href="https://github.com/mrkentung/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block ml-4 transform hover:opacity-50 hover:-translate-y-1 transition-all duration-150">
            <AiFillGithub size={32} />
          </a>
        </div>

        <InfiniteScroll
          data={pokemons.data}
          paginationHandler={(page: number) =>
            getPokemons({
              page,
              cachedPokemons: cachedPokemons.data,
              pokemons: pokemons.data,
            })
          }
          isLoading={pokemons.status.state === SliceStatus.LOADING}>
          {({ mutatePage }) => (
            <>
              <div className="my-4 md:my-6 lg:my-8 container mx-auto">
                <PokemonForm placeholder="Search for a pokémon..." mutatePage={mutatePage} />
              </div>
              <div className="container mx-auto w-full text-center">
                {!(
                  cachedPokemons.status.state === SliceStatus.LOADING ||
                  cachedPokemons.status.state === SliceStatus.IDLE
                ) && (
                  <>
                    <InfiniteScroll.Container>
                      {pokemons.data.map((pokemon, index) =>
                        pokemon === null ? (
                          <PokemonSkeleton key={`loading-${index}`} />
                        ) : (
                          <PokemonCard key={pokemon.id} {...pokemon} />
                        )
                      )}
                    </InfiniteScroll.Container>
                    <InfiniteScroll.Waypoint />
                  </>
                )}
              </div>
            </>
          )}
        </InfiniteScroll>
      </div>
    </MainLayout>
  );
};

export default Index;
