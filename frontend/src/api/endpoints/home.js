import axiosClient from '../axiosService';

const homeApi = {
    getAll: () => axiosClient.get("/stats")
}

export default homeApi
