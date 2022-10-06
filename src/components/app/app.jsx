import React from 'react';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngridients from '../burger-ingridients/burger-ingredients';

import appStyles from './app.module.css';

function App() {
  const URL = 'https://norma.nomoreparties.space/api/ingredients';
  const [state, setState] = React.useState({
    isLoading: false,
    data: {},
  });

  React.useEffect(() => {
    const getingridientsData = async () => {
      setState({ ...state, isLoading: true });
      const result = await fetch(URL);
      const ingrData = await result.json();
      setState({ isLoading: false, data: ingrData });
    };

    getingridientsData();
  }, []);

  return (
    <>
      <AppHeader />
      <main className={appStyles.main}>
        {state.data.data && <BurgerIngridients data={state.data.data} />}
        {state.data.data && <BurgerConstructor data={state.data.data} />}
      </main>
    </>
  );
}

export default App;
