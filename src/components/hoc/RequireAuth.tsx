import { useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../hook/useAuth';

type Props = {
  children: JSX.Element;
};

function RequireAuth({ children }: Props): JSX.Element {
  const location = useLocation();
  const { login } = useAuth();

  if (!login) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
}

export default RequireAuth;
