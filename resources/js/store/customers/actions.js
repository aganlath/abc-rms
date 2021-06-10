import CustomerService from "../../services/CustomerService";

export const fetchCustomers = async ({state, commit}) => {
    await CustomerService.index(state.nextPage, state.limit, state.searchKey)
        .then(response => {
            const { data : { meta: meta } } = response;
            const { data : { data: customers } } = response;

            commit('setCustomers', customers);
            commit('setCustomersNextPage', meta.current_page + 1);
            return commit('setCustomersLastPage', meta.last_page);
        })
        .catch(error => {
            throw error.response;
        })
};

export const searchCustomers = async ({commit, dispatch}, searchKey) => {
    commit('setCustomersSearchKey', searchKey);
    dispatch('resetAll')

   return dispatch('fetchCustomers');
};

export const resetAll = ({commit}) => {
    commit('resetCustomers');
    commit('resetCustomersNextPage');
    commit('resetCustomersLastPage');
}

export const addCustomer = async ({dispatch}, customer) => {
    await CustomerService.store(customer)
        .then(() => {
            return dispatch('fetchCustomers');
        })
        .catch(error => {
            throw error.response;
        })
};

export const editCustomer = async ({dispatch}, customer) => {
    await CustomerService.update(customer)
        .then(() => {
            dispatch('resetAll');

            return dispatch('fetchCustomers');
        })
        .catch(error => {
            throw error.response;
        })
};

export const deleteCustomer = async ({dispatch}, customerId) => {
    await CustomerService.destroy(customerId)
        .then(() => {
            dispatch('resetAll');

            return dispatch('fetchCustomers');
        })
        .catch(error => {
            throw error.response;
        })
};
