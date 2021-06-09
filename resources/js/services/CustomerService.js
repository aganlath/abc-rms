import axios from "axios";

const baseUrl = '/api/customers';

export default class CustomerService {
    static index(page, limit, searchKey = null) {
        return axios.get(`${baseUrl}`, {
            params: {
                page: page,
                limit: limit,
                search: searchKey
            },
        });
    }

    static store(customer) {
        return axios.post(`${baseUrl}`, customer);
    }

    static update(customer) {
        return axios.patch(`${baseUrl}/${customer.id}`, customer);
    }

    static destroy(customerId) {
        return axios.delete(`${baseUrl}/${customerId}`);
    }
}
