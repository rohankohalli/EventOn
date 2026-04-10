import axios from "axios";

const axiosClient = axios.create({
    baseURL: "http://localhost:8000/api",
    withCredentials: true,
});

axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

axiosClient.interceptors.response.use(
    (response) => response, async (error) => {
        const originalrequest = error.config;

        // If access token expired AND we didn't retry yet
        if (error.response?.status === 401 && !originalrequest._retry) {
            originalrequest._retry = true;

            try {
                const res = await authApi.refresh();
                const newAccessToken = res.data.accessToken;

                localStorage.setItem("accessToken", newAccessToken);

                originalrequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return axiosClient(originalrequest);

            } catch (err) {
                localStorage.removeItem("accessToken");
                // window.location.href = "/login";
                return Promise.reject(err);
            }
        }
        return Promise.reject(error);
    }
);

export default axiosClient;
