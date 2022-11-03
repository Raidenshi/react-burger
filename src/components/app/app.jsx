import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ForgotPage from '../../pages/forms/forgot-page';
import HomePage from '../../pages/home/home-page';
import LoginPage from '../../pages/forms/login-page';
import Page404 from '../../pages/page-404';
import RegisterPage from '../../pages/forms/register-page';
import ResetPage from '../../pages/forms/reset-page';
import Layout from '../layout/layout';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="forgot-password" element={<ForgotPage />} />
          <Route path="reset-password" element={<ResetPage />} />
          <Route path="*" element={<Page404 />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
