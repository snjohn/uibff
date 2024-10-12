import axios from 'axios';

const apiClient = axios.create({
    // baseURL: 'http://localhost:8088',
    baseURL: 'http://gatewayserver:8088',
});

apiClient.interceptors.request.use(
    async (config) => {
        config.headers.Accept = 'application/json'
        return config;
    },
    async (error) => {
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    (response) => response, async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            return apiClient(originalRequest);
        }
        return Promise.reject(error);
    }
);

export default apiClient;