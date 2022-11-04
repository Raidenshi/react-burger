import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { authUser } from '../../services/store/actions/auth';

function ProtectedRoute({ children }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const user = useSelector((store) => store.userReducer.user);

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
}

export default ProtectedRoute;
