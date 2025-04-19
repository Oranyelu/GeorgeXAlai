import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { session } = useAuth();

  if (!session) {
    return <Navigate to="/auth" />;
  }

  return children;
};

export default PrivateRoute;
