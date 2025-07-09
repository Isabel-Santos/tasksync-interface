// Access Token
export const getAccessToken = () => localStorage.getItem('access_token');
export const saveAccessToken = (token) => localStorage.setItem('access_token', token);

// Refresh Token
export const getRefreshToken = () => localStorage.getItem('refresh_token');
export const saveRefreshToken = (token) => localStorage.setItem('refresh_token', token);

//Salvamento e recuperação de dados do usuário
export const saveUser = (user) => {
  if (user) {
    localStorage.setItem('user', JSON.stringify(user));
  }
};
export const getUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

// Autenticação
export const isAuthenticated = () => !!getAccessToken();

// Logout geral
export const logout = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('user');
};

// (opcional) Alias mais genéricos para compatibilidade
export const storeAccessToken = saveAccessToken;
export const getToken = getAccessToken;
export const clearToken = () => localStorage.removeItem('access_token');


// export const getAccessToken = () => localStorage.getItem('access_token');
// export const saveAccessToken = (token) => localStorage.setItem('access_token', token);

// export const getRefreshToken = () => localStorage.getItem('refresh_token');
// export const saveRefreshToken = (token) => localStorage.setItem('refresh_token', token);

// export const saveUser = (user) => {
//   if (user) {
//     localStorage.setItem('user', JSON.stringify(user));
//   }
// };
// export const getUser = () => {
//   const user = localStorage.getItem('user');
//   return user ? JSON.parse(user) : null;
// };

// export const isAuthenticated = () => !!getAccessToken();

// export const logout = () => {
//   localStorage.removeItem('access_token');
//   localStorage.removeItem('refresh_token');
//   localStorage.removeItem('user');
// };