import { useLocation, Navigate } from 'react-router-dom';
import { Props } from '../../utils/types';

function RequireAuth({ children }: Props): JSX.Element {
  const location = useLocation();
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
}

export default RequireAuth;
