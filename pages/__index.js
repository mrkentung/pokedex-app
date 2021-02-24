import React from 'react';
import useSWR, { useSWRPages } from 'swr';

import fetcher from '../lib/fetcher';
import PokemonShort from '../components/pokemonShort';
import MainLayout from '../layouts/main';

export default function Home() {
  const { pages, isLoadingMore, loadMore, isReachingEnd } = useSWRPages(
    'pokemon-list',
    ({ offset, withSWR }) => {
      console.log('offset', offset);
      const url = offset || 'https://pokeapi.co/api/v2/pokemon';
      const { data } = withSWR(useSWR(url, fetcher));

      if (!data) return null;

      const { results } = data;
      return results.map((result) => <PokemonShort key={result.name} name={result.name} />);
    },
    (SWR) => SWR.data.next,
    []
  );

  const [infiniteScrollEnabled, setInfiniteScrollEnabled] = React.useState(false);
  const $loadMoreButton = React.useRef(null);
  const infiniteScrollCount = React.useRef(0);
  // const isOnScreen = useOnScreen($loadMoreButton, "600px");

  React.useEffect(() => {
    if (!infiniteScrollEnabled) return;

    loadMore();

    const count = infiniteScrollCount.current;

    if (count + 1 === 3) {
      setInfiniteScrollEnabled(false);
      infiniteScrollCount.current = 0;
    } else {
      infiniteScrollCount.current = count + 1;
    }
  }, [infiniteScrollEnabled]);

  return (
    <MainLayout>
      <section className="container mx-auto">
        <div className="-mx-2 flex flex-wrap">{pages}</div>
        <div className="mx-auto mt-10 mb-20 w-1/3">
          <button
            ref={$loadMoreButton}
            className="bg-red-600 border-solid border-2 hover:bg-white border-red-600 text-white hover:text-red-600 font-bold py-2 px-4 rounded-full w-full"
            disabled={isLoadingMore || isReachingEnd}
            onClick={() => {
              loadMore();
              setInfiniteScrollEnabled(true);
            }}>
            Load More Pokémon
          </button>
        </div>
      </section>
    </MainLayout>
  );
}
