import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useApp';

function ProtectedRoute({ children }: { children: JSX.Element }): JSX.Element {
  const location = useLocation();
  const user = useAppSelector((store) => store.userReducer.user);

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
}

export default ProtectedRoute;
