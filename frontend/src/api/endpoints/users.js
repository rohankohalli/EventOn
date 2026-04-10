import axiosClient from "../axiosService";

const userApi = {
    getAll: () => axiosClient.get('/users'),
    getById: (id) => axiosClient.get(`/users/${id}`),
    updateUser: (id, data) => axiosClient.put(`/users/${id}`, data),
    RemoveUser: (id) => axiosClient.delete(`/users/${id}`),
    updatePreferences: (data) => axiosClient.patch('/users/preferences', data)
}

export default userApi
