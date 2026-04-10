import axiosClient from "../axiosService";

const eventsApi = {
    getAll: () => axiosClient.get("/events"),
    getById: (id) => axiosClient.get(`/events/${id}`),
    getMy: () => axiosClient.get("/events/my"),
    create: (payload) => axiosClient.post("/events", payload),
    update: (id, payload) => axiosClient.put(`/events/${id}`, payload),
    remove: (id) => axiosClient.delete(`/events/${id}`),
    approve: (id) => axiosClient.put(`/events/${id}/approve`),
    reject: (id) => axiosClient.put(`/events/${id}/reject`),
    cancelApproval: (id) => axiosClient.put(`/events/${id}/approval-cancel`)
};

export default eventsApi;
