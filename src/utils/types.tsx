export type User = {
  username: string | null;
  login: string | null;
  token: string | null;
  id: string | null;
};

export type Action = {
  type: 'user';
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

export type LoginInputs = {
  login: string;
  password: string;
};

export type RegistrationInputs = {
  name: string;
  login: string;
  password: string;
};

export type PropsModal = {
  active: boolean;
  setActive: (value: boolean) => void;
  setError: (value: string) => void;
  case: string;
};
export type PropsModalConfirm = {
  token: string | null;
  active: boolean;
  setActive: (value: boolean) => void;
  setError: (value: string) => void;
  boardId: string | null;
  columnId: string;
  handleGetColumns: () => Promise<void>;
  handleConfirm?: () => void;
};

export type Boards = {
  _id: string;
  title: string;
  owner: string;
  users: string[];
};

export type BoardsBody = {
  title: string;
  owner: string;
  users: string[];
};

export type Columns = {
  _id: string;
  title: string;
  order: number;
  boardId: string;
};

export type ColumnBody = {
  title: string;
  order: number;
};

export type Tasks = {
  _id: string;
  title: string;
  order?: number;
  boardId?: string;
  columnId?: string;
  description?: string;
  userId?: string;
  users?: string[];
  color?: string;
};
