import * as React from 'react';
import { ReactNode } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../hook/useAuth';

type Props = {
  children: JSX.Element;
};

function RequireAuth({ children }: Props): JSX.Element {
  const location = useLocation();
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
}

export default RequireAuth;
