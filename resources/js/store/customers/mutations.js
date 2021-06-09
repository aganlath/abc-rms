export const setCustomers = (state, customers) => state.customers = state.customers.concat(customers);

export const setCustomersPage = (state, page) => state.page = page + 1;

export const setCustomersLastPage = (state, page) => state.lastPage = page;

export const setCustomersLoading = (state, loading) => state.loading = loading;

export const setCustomersSearchKey = (state, searchKey) => state.searchKey = searchKey;

export const resetCustomers = (state) => state.customers = [];

export const resetCustomersPage = (state) => state.page = 1;

export const resetCustomersLastPage = (state) => state.lastPage = null;
