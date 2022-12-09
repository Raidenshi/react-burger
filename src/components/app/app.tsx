import React, { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import ForgotPage from '../../pages/forms/forgot-page';
import HomePage from '../../pages/home/home-page';
import LoginPage from '../../pages/forms/login-page';
import Page404 from '../../pages/page-404/page-404';
import RegisterPage from '../../pages/forms/register-page';
import ResetPage from '../../pages/forms/reset-page';
import FeedPage from '../../pages/feed/feed-page';
import Layout from '../layout/layout';
import ProfilePage from '../../pages/profile/profile-page';
import ProtectedRoute from '../protected-route/protected-route';
import { useAppDispatch, useAppSelector } from '../../hooks/useApp';
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
import { IIngredient } from '../../types/ingredientsTypes';
import FeedItemModal from '../feed-item-modal/feed-item-modal';
import FeedItemPage from '../../pages/feed-item/feed-item-page';
import ProfileForm from '../profile-form/profile-form';
import FeedListProfile from '../feed-list-profile/feed-list-profile';

function App() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const background = location.state && location.state.background;
  const user = useAppSelector((store) => store.userReducer.user);
  const addedIngredients = useAppSelector(
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

  function openModalIngredient(ingredient: IIngredient) {
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
          >
            <Route index element={<ProfileForm />} />
            <Route path="orders" element={<FeedListProfile />} />
          </Route>
          <Route
            path="/profile/orders/:id"
            element={
              <ProtectedRoute>
                <FeedItemPage>
                  <FeedItemModal />
                </FeedItemPage>
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
          <Route path="feed" element={<FeedPage />} />
          <Route
            path="feed/:id"
            element={
              <FeedItemPage>
                <FeedItemModal />
              </FeedItemPage>
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
          <Route
            path="/feed/:id"
            element={
              <Modal closeModal={closeModal}>
                <FeedItemModal />
              </Modal>
            }
          />
          <Route
            path="profile/orders/:id"
            element={
              <Modal closeModal={closeModal}>
                <FeedItemModal />
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  );
}

export default App;
