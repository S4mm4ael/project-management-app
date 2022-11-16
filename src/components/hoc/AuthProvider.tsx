import { createContext, useReducer } from 'react';
import reducer from '../../utils/reducer';
import { Action, Props, User } from '../../utils/types';

const initialUserData = {
  username: null,
  login: null,
  password: null,
  token: null,
  id: null,
};

export const AuthContext = createContext<[User, React.Dispatch<Action>]>(null!);

export function AuthProvider({ children }: Props): JSX.Element {
  const [state, dispatch] = useReducer(reducer, initialUserData);

  return <AuthContext.Provider value={[state, dispatch]}>{children}</AuthContext.Provider>;
}
