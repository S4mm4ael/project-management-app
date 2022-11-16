import { useLocation, Navigate } from 'react-router-dom';
import { Props } from '../../utils/types';
import { useAuth } from '../hook/useAuth';

function RequireAuth({ children }: Props): JSX.Element {
  const location = useLocation();
  const auth = useAuth();

  if (!auth[0].token) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
}

export default RequireAuth;
