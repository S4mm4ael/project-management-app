import { createContext, useState } from 'react';

type Props = {
  children: JSX.Element;
};

type ValueType = {
  username: string | null;
  login: string | null;
  password: string | null;
  signUp: (user: string | null, callback: () => void) => void;
  signIn: (newUser: string | null, callback: () => void) => void;
  signOut: (callback: () => void) => void;
};

export const AuthContext = createContext<ValueType>({
  username: null,
  login: null,
  password: null,
  signUp: () => {},
  signIn: () => {},
  signOut: () => {},
});

export function AuthProvider({ children }: Props): JSX.Element {
  const [username, setUser] = useState<string | null>(null);
  const [login, setLogin] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);

  const signUp = (user: string | null, callback: () => void) => {
    setUser(user);
    callback();
  };
  const signIn = (newUser: string | null, callback: () => void) => {
    setUser(newUser);
    callback();
  };
  const signOut = (callback: () => void) => {
    setUser(null);
    callback();
  };

  const value: ValueType = { username, login, password, signUp, signIn, signOut };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
