export function clearLocalStorage() {
  localStorage.removeItem('token');
  localStorage.removeItem('name');
  localStorage.removeItem('login');
  localStorage.removeItem('id');
}

export function setLocalStorage(token: string, name: string, login: string, id: string) {
  localStorage.setItem('token', token);
  localStorage.setItem('name', name);
  localStorage.setItem('login', login);
  localStorage.setItem('id', id);
}
