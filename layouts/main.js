import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Header from './../components/Header';
import { cachedPokemonsSelector, getCachedPokemons } from './../features/cachedPokemonsSlice';
import { SliceStatus } from './../lib/global';
import SplashScreen from './../components/SplashScreen';

const MainLayout = ({ children }) => {
  const dispatch = useDispatch();
  const cachedPokemons = useSelector(cachedPokemonsSelector);

  useEffect(() => {
    dispatch(getCachedPokemons());
    //eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      {cachedPokemons.status.state === SliceStatus.LOADING ||
      cachedPokemons.status.state === SliceStatus.IDLE ? (
        <SplashScreen />
      ) : (
        <>
          <Header />
          {children}
        </>
      )}
    </Fragment>
  );
};

export default MainLayout;
