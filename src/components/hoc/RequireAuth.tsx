import { useLocation, Navigate } from 'react-router-dom';
import { Props } from '../../utils/types';
import { useAuth } from '../hook/useAuth';

function RequireAuth({ children }: Props): JSX.Element {
  const location = useLocation();
  const auth = useAuth();
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
}

export default RequireAuth;
