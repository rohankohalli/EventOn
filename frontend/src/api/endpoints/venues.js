import axiosClient from "../axiosService";

const venuesApi = {
    getAll: () => axiosClient.get("/venues"),
    getById: (id) => axiosClient.get(`/venues/${id}`),
    getVenueEvents: (id) => axiosClient.get(`/venues/${id}/events`),
    getMy: () => axiosClient.get("/venues/my"),
    create: (payload) => axiosClient.post("/venues", payload),
    update: (id, payload) => axiosClient.put(`/venues/${id}`, payload),
    remove: (id) => axiosClient.delete(`/venues/${id}`),
};

export default venuesApi;
