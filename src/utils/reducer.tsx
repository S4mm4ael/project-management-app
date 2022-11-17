import { Action, User } from './types';

export default function reducer(state: User, action: Action) {
  const { type, data } = action;
  switch (type) {
    case 'user':
      state = {
        username: data.username,
        login: data.login,
        token: data.token,
        id: data.id,
      };
      return state;
    default:
      throw new Error();
  }
}
