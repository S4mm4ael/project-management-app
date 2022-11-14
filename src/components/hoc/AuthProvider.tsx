import { createContext, useState } from 'react';

type Props = {
  children: JSX.Element;
};

type ValueType = {
  user: string | null;
  signIn: (newUser: string | null, callback: () => void) => void;
  signOut: (callback: () => void) => void;
};

export const AuthContext = createContext<ValueType>({
  user: null,
  signIn: () => {},
  signOut: () => {},
});

export function AuthProvider({ children }: Props): JSX.Element {
  const [user, setUser] = useState<string | null>(null);

  const signIn = (newUser: string | null, callback: () => void) => {
    setUser(newUser);
    callback();
  };
  const signOut = (callback: () => void) => {
    setUser(null);
    callback();
  };

  const value: ValueType = { user, signIn, signOut };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
