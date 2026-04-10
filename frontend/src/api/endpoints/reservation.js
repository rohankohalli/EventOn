import axiosClient from '../axiosService';

const reservationsApi = {
    getMy: () => axiosClient.get("/reservation/my"),
    getById: (id) => axiosClient.get(`/reservation/${id}`),
    create: (payload) => axiosClient.post("/reservation", payload),
    cancel: (id) => axiosClient.delete(`/reservation/${id}`),
    remove: (id) => axiosClient.delete(`/reservation/${id}`),
    getByEvent: (eventId) => axiosClient.get(`/reservation/event/${eventId}`),
    getAll: () => axiosClient.get("/reservation/all")
};

export default reservationsApi;
