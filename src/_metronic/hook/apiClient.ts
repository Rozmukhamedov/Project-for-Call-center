import axios from "axios";
import * as authHelper from "../../app/modules/auth/core/AuthHelpers";

const API_URL = import.meta.env.VITE_APP_API_URL;

const apiClient = axios.create({
  baseURL: `${API_URL}`,
  timeout: 100000,
});

// Функция для обновления токена
const refreshAccessToken = async () => {
  const getUserInfo: any = authHelper.getAuth();

  try {
    const response = await axios.post("/auth-admin/refresh", {
      refreshToken: getUserInfo.refreshToken, // Храните refreshToken в безопасном месте
    });

    const { accessToken } = response.data;

    // Обновляем токен в хранилище и заголовках
    apiClient.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${accessToken}`;

    return accessToken;
  } catch (error) {
    console.error("Ошибка обновления токена", error);
    throw error;
  }
};

// Интерцептор запросов
apiClient.interceptors.request.use(
  (config) => {
    const getUserInfo: any = authHelper.getAuth();
    const token = getUserInfo.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Интерцептор ответов
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    // Если ошибка 401 и запрос ещё не был повторён
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newToken = await refreshAccessToken();

        // Повторяем запрос с новым токеном
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return apiClient(originalRequest);
      } catch (err) {
        console.error("Не удалось обновить токен");
        // Обработка выхода пользователя или перенаправления
        // localStorage.removeItem("accessToken");
        // localStorage.removeItem("refreshToken");
        // window.location.href = "/login";
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
