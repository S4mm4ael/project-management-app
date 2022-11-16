import { Action, User } from './types';

export default function reducer(state: User, action: Action) {
  const { type, data } = action;
  switch (type) {
    case 'createUser':
      state = {
        username: data.username,
        login: data.login,
        password: data.password,
        token: data.token,
        id: data.id,
      };
      return state;
    case 'loginUser':
      state = {
        username: state.username,
        login: state.login,
        password: state.password,
        token: data.token,
        id: state.id,
      };
      return state;
    default:
      throw new Error();
  }
}
