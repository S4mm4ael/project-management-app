import { Body } from './types';

const url = 'https://final-task-backend-production-e4cb.up.railway.app';

export async function createUser(body: Body) {
  const response = await fetch(`${url}/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  if (response.status === 200) {
    const user = await response.json();
    console.log('succsess sign up', user);
    return user;
  }
  if (response.status !== 200) {
    console.log('error', response.status);
    if (response.status === 409) {
      console.log('409 User already exist');
    }
  }
  throw new Error(`${response.status}`);
}

export async function loginUser(body: Body) {
  const response = await fetch(`${url}/auth/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  if (response.status === 200) {
    const user = await response.json();
    console.log('succsess sign in', user);
    return user;
  }
  if (response.status !== 200) {
    console.log('error', response.status);
    if (response.status === 409) {
      console.log('401 User does not exist');
    }
  }
  throw new Error(`${response.status}`);
}
