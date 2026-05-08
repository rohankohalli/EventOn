import api from '../index';

const applicationApi = {
    applyForRole: (data) => api.post('/applications', data),
    getMyApplication: () => api.get('/applications/me'),
    getAllApplications: () => api.get('/applications'),
    approveApplication: (id) => api.put(`/applications/${id}/approve`),
    rejectApplication: (id) => api.put(`/applications/${id}/reject`),
};

export default applicationApi;
