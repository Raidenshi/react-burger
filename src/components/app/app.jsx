import React, { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import ForgotPage from '../../pages/forms/forgot-page';
import HomePage from '../../pages/home/home-page';
import LoginPage from '../../pages/forms/login-page';
import Page404 from '../../pages/page-404/page-404';
import RegisterPage from '../../pages/forms/register-page';
import ResetPage from '../../pages/forms/reset-page';
import Layout from '../layout/layout';
import ProfilePage from '../../pages/profile/profile-page';
import ProtectedRoute from '../protected-route/protected-route';
import { useDispatch, useSelector } from 'react-redux';
import { authUser } from '../../services/store/actions/auth';
import IngredientPage from '../../pages/ingredient/ingredient-page';
import { getData } from '../../services/store/actions/getData';
import {
  SET_CURRENT_INGREDIENT,
  UPDATE_CONSTRUCTOR_LIST,
} from '../../services/store/reducers/IngredientsSlice';
import { postOrder } from '../../services/store/actions/postOrder';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const background = location.state && location.state.background;
  const user = useSelector((store) => store.userReducer.user);
  const addedIngredients = useSelector(
    (store) => store.ingredientsReducer.addedIngredients
  );

  function closeModal() {
    navigate(-1);
  }

  function openModalOrder() {
    const addedIngredientsID = {
      ingredients: addedIngredients.map((el) => el._id),
    };
    if (user) {
      dispatch(postOrder(addedIngredientsID)).then(() => {
        dispatch(UPDATE_CONSTRUCTOR_LIST([]));
      });
    } else {
      navigate('/login');
    }
  }

  function openModalIngredient(ingredient) {
    dispatch(SET_CURRENT_INGREDIENT(ingredient));
  }

  useEffect(() => {
    dispatch(getData());
    dispatch(authUser());
  }, []);
  return (
    <>
      <Routes location={background || location}>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <HomePage
                openModalIngredient={openModalIngredient}
                openModalOrder={openModalOrder}
              />
            }
          />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="forgot-password" element={<ForgotPage />} />
          <Route path="reset-password" element={<ResetPage />} />
          <Route
            path="profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route path="ingredient/:id" element={<IngredientPage />} />
          <Route
            path="order"
            element={
              <ProtectedRoute>
                <OrderDetails />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Page404 />} />
        </Route>
      </Routes>
      {background && (
        <Routes>
          <Route
            path="/ingredient/:id"
            element={
              <Modal closeModal={closeModal}>
                <IngredientPage />
              </Modal>
            }
          />
          <Route
            path="/order"
            element={
              <ProtectedRoute>
                <Modal closeModal={closeModal}>
                  <OrderDetails />
                </Modal>
              </ProtectedRoute>
            }
          />
        </Routes>
      )}
    </>
  );
}

export default App;
