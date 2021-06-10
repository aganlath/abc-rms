export const setCustomers = (state, customers) => state.customers = _.uniqBy(state.customers.concat(customers), 'id');

export const setCustomersNextPage = (state, page) => state.nextPage = page;

export const setCustomersLastPage = (state, page) => state.lastPage = page;

export const setCustomersSearchKey = (state, searchKey) => state.searchKey = searchKey;

export const resetCustomers = (state) => state.customers = [];

export const resetCustomersNextPage = (state) => state.nextPage = 1;

export const resetCustomersLastPage = (state) => state.lastPage = null;
