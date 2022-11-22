export function clearLocalStorage() {
  localStorage.removeItem('token');
  localStorage.removeItem('name');
  localStorage.removeItem('login');
  localStorage.removeItem('id');
}
