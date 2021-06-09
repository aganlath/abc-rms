export const setUsers = (state, users) => state.users = state.users.concat(users);

export const setUsersPage = (state, page) => state.page = page + 1;

export const setUsersLastPage = (state, page) => state.lastPage = page;

export const setUsersSearchKey = (state, searchKey) => state.searchKey = searchKey;

export const resetUsers = (state) => state.users = [];

export const resetUsersPage = (state) => state.page = 1;

export const resetUsersLastPage = (state) => state.lastPage = null;
