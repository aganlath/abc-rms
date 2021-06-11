import axios from "axios";

const baseUrl = '/api/users';

export default class UserService {
    static index(page, limit, searchKey = null) {
        return axios.get(`${baseUrl}`, {
            params: {
                page: page,
                limit: limit,
                search: searchKey
            },
        });
    }

    static upload_csv(file) {
        let formData = new FormData();
        formData.append('csv_file', file);

        return axios.post(`${baseUrl}/upload_csv`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }
}
