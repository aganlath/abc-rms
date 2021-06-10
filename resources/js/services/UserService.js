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
}
