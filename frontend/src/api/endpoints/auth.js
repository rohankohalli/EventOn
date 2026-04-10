import axiosClient from "../axiosService";

const authApi = {
    login: (payload) => axiosClient.post("/auth/login", payload),
    register: (payload) => axiosClient.post("/auth/register", payload),
    me: () => axiosClient.get("/auth/me"),
    refresh: () => axiosClient.post("/auth/refresh"),
    logout: () => axiosClient.post("/auth/logout"),
    password_reset_req: () => axiosClient.post("/auth/pass-reset-req"),
    password_reset: (payload) => axiosClient.post("/auth/pass-reset", payload)
}

export default authApi;
