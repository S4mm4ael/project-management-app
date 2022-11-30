import { createContext, useReducer } from 'react';
import reducer from '../../utils/reducer';
import { Action, Props, User } from '../../utils/types';

const name = localStorage.getItem('name') || '';
const login = localStorage.getItem('login') || '';
const token = localStorage.getItem('token') || '';
const id = localStorage.getItem('id') || '';

const initialUserData = {
  username: name,
  login: login,
  token: token,
  id: id,
};

console.log('auth');
export const AuthContext = createContext<[User, React.Dispatch<Action>]>(null!);

export function AuthProvider({ children }: Props): JSX.Element {
  const [state, dispatch] = useReducer(reducer, initialUserData);

  return <AuthContext.Provider value={[state, dispatch]}>{children}</AuthContext.Provider>;
}
