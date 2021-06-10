export const setUsers = (state, users) => state.users =  _.uniqBy(state.users.concat(users), 'id');

export const setUsersNextPage = (state, page) => state.nextPage = page;

export const setUsersLastPage = (state, page) => state.lastPage = page;

export const setUsersSearchKey = (state, searchKey) => state.searchKey = searchKey;

export const resetUsers = (state) => state.users = [];

export const resetUsersNextPage = (state) => state.nextPage = 1;

export const resetUsersLastPage = (state) => state.lastPage = null;
