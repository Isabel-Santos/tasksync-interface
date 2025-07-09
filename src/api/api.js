import axios from 'axios';
import { getAccessToken, getRefreshToken, saveAccessToken, saveRefreshToken, logout, saveUser } from '../utils/auth';

// Define a URL base da API
// const API_URL = process.env.REACT_APP_API_URL || 'https://localhost:5000';
const API_URL = ''; // Deixe em branco para usar o proxy

// Configurações padrão do axios
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Para suportar cookies, se necessário
});


// Adiciona o token automaticamente em cada requisição
api.interceptors.request.use((config) => {
  const token = getAccessToken();
  // const token = localStorage.getItem('token');
  // console.log('Token JWT:', token);  // Verifique se o token está correto
  console.log(`[API Interceptor] Tentando enviar requisição para: ${config.url}`);
//   if (token) {
//     try{
//       const payload = JSON.parse(atob(token.split('.')[1]));
//       config.headers['X-User-ID'] = payload.sub;  //Linha de debug
//       config.headers.Authorization = `Bearer ${token}`;
//     } catch (e) {
//       console.warn('Token inválido ou expirado:', e);
//     }
//   } else {
//       console.warn('⚠️ Nenhum token JWT encontrado');
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );
  if (token) {
      console.log('[API Interceptor] Token encontrado:', token.substring(0, 15) + '...'); // Mostra só o início do token
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      // Este log é esperado para as rotas de login e cadastro
      console.warn('[API Interceptor] Nenhum token JWT encontrado no localStorage.');
    }
    return config;
  },
  (error) => {
      // --- LOG DE DEBUG 2: ERRO NA REQUISIÇÃO ---
      console.error('[API Interceptor] Erro antes de enviar a requisição:', error);
      return Promise.reject(error);
  });

// Interceptor de resposta: tenta refresh automático se token expirado
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.error('[API Interceptor] Erro recebido da API:', error.toJSON());
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes('/auth/refresh')
    ) {
      originalRequest._retry = true;
      const refreshToken = getRefreshToken();
      if (!refreshToken) {
        logout(); // Encerra a sessão se não houver refresh_token
        window.location.href = '/login';
        return Promise.reject(error);
      }

      try {
        const res = await axios.post(`${API_URL}/auth/refresh`, {}, {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        });

        const newAccessToken = res.data.access_token;
        saveAccessToken(newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest); // Reenvia a requisição original
      } catch (refreshError) {
        logout();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);


// ------------------- AUTENTICAÇÃO -------------------
// Função de login
// export const login = async (email, password) => {
//   try {
//     const response = await api.post('/auth/login', { email, password });
//     if (response.data.access_token && response.data.refresh_token) {
//       saveAccessToken(response.data.access_token);
//       saveRefreshToken(response.data.refresh_token);
//     }
//     return response.data;
//   } catch (error) {
//     console.error('Erro ao fazer login:', error.response || error);
//     throw error;
//   }
// };
// Etapa 1: Envia email e senha para receber o pedido de 2FA
export const login = (email, password) => {
  console.log('[API Call] Chamando login...');
  return api.post('/auth/login', { email, password });
};

// Etapa 2: Envia o código 2FA para obter os tokens
export const verify2FA = async (email, code) => {
  console.log('[API Call] Chamando verify2FA...');
  const response = await api.post('/auth/verify-2fa', { email, code });
  // Se a verificação for bem-sucedida, salva os tokens e dados do usuário
  if (response.data?.access_token) {
    saveAccessToken(response.data.access_token);
    saveRefreshToken(response.data.refresh_token);
    saveUser(response.data.user);
  }
  return response;
};

// Função de logout
export const logoutAndRedirect = () => {
  logout();
  window.location.href = '/login'; // Redireciona para a página de login
};

// Função de registro
export const register = async (data) => {
    console.log('[API Call] Chamando register...');
  try {
    const response = await api.post('/auth/signup', data);
    return response.data;
  } catch (error) {
    console.error('Erro ao cadastrar usuário:', error.response?.data || error.message);
    return {
      success: false,
      message: error.response?.data?.message || 'Erro ao cadastrar usuário'
    };
  }
};

// ------------------- OPERAÇÕES DE TAREFAS -------------------
// Obter lista de tarefas
export const getTasks = async () => {
    console.log('[API Call] Chamando getTasks...');
  try {
    const response = await api.get('/tasks/list', {
      withCredentials: true,
    });

    console.log("Resposta da API:", response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Erro ao buscar tarefas:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Erro ao buscar tarefas');
  }
};

// Criar nova tarefa
export const createTask = async (title, description = "") => {
  try {
    // const token = localStorage.getItem("token");
    // if (!token) {
    //   throw new Error("Token não encontrado");
    const response = await api.post('/tasks/add', {
      title,
      description,
      status: 'Pendente',
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao criar tarefa:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Erro ao criar tarefa');
  }
};

// Atualizar tarefa
export const updateTask = async (taskId, title, description = null, status = null) => {
  try {
    const response = await api.put(`/tasks/${taskId}/update`, {
      title, description, status

    });
    return response.data;

  } catch (error) {

    console.error('Erro ao atualizar tarefa:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Erro ao atualizar tarefa');

  }
};



// Excluir tarefa

export const deleteTask = async (taskId) => {

  try {
    const response = await api.delete(`/tasks/${taskId}/remove`);
    return response.data;
  } catch (error) {
    console.error('Erro ao excluir tarefa:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Erro ao excluir tarefa');
  }
};


// import axios from 'axios';
// import { getAccessToken, getRefreshToken, saveAccessToken, saveRefreshToken, logout, saveUser } from '../utils/auth';

// // URL do seu backend. Manteremos HTTPS.
// const API_URL = 'https://localhost:5000';

// const api = axios.create({
//   baseURL: API_URL,
//   withCredentials: true,
// });

// // Interceptor que adiciona o token de autorização em cada requisição
// api.interceptors.request.use((config) => {
//   const token = getAccessToken();
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// }, (error) => Promise.reject(error));

// // Interceptor que tenta atualizar o token automaticamente se ele expirar
// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
//     if (error.response?.status === 401 && !originalRequest._retry && !originalRequest.url.includes('/auth/refresh')) {
//       originalRequest._retry = true;
//       const refreshToken = getRefreshToken();
//       if (!refreshToken) {
//         logout();
//         window.location.href = '/login';
//         return Promise.reject(error);
//       }
//       try {
//         const res = await axios.post(`${API_URL}/auth/refresh`, {}, {
//           headers: { Authorization: `Bearer ${refreshToken}` },
//         });
//         const newAccessToken = res.data.access_token;
//         saveAccessToken(newAccessToken);
//         originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//         return api(originalRequest);
//       } catch (refreshError) {
//         logout();
//         window.location.href = '/login';
//         return Promise.reject(refreshError);
//       }
//     }
//     return Promise.reject(error);
//   }
// );

// // --- FUNÇÕES DA API EXPORTADAS CORRETAMENTE ---

// // AUTENTICAÇÃO
// export const requestLogin = (email, password) => {
//   return api.post('/auth/login', { email, password });
// };

// export const verify2FA = async (email, code) => {
//   const response = await api.post('/auth/verify-2fa', { email, code });
//   if (response.data?.access_token) {
//     saveAccessToken(response.data.access_token);
//     saveRefreshToken(response.data.refresh_token);
//     saveUser(response.data.user);
//   }
//   return response;
// };

// export const register = (data) => {
//   return api.post('/auth/signup', data);
// };

// // TAREFAS
// export const getTasks = () => api.get('/tasks/list');
// export const createTask = (data) => api.post('/tasks/add', data);
// export const updateTask = (id, data) => api.put(`/tasks/${id}`, data);
// export const deleteTask = (id) => api.delete(`/tasks/${id}/remove`);
