export type User = {
  username: string | null;
  login: string | null;
  password: string | null;
  token: string | null;
  id: string | null;
};

export type Action = {
  type: 'createUser' | 'loginUser';
  data: User;
};

export type Props = {
  children: JSX.Element;
};

export type Body = {
  name?: string;
  login?: string;
  password?: string;
};
