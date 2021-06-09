const baseUrl = '/api/login';

export default class AuthService {
    static login(credentials) {
        return axios.post(`${baseUrl}`, credentials);
    }
}
