import UserService from "../../services/UserService";

export const fetchUsers = async ({state, commit}) => {
    await UserService.index(state.nextPage, state.limit, state.searchKey)
        .then(response => {
            const { data : { meta: meta } } = response;
            const { data : { data: users } } = response;

            commit('setUsers', users);
            commit('setUsersNextPage', meta.current_page + 1);
            return commit('setUsersLastPage', meta.last_page);
        })
        .catch(error => {
            throw error.response;
        })
};

export const searchUsers = async ({commit, dispatch}, searchKey) => {
    dispatch('resetAll')
    commit('setUsersSearchKey', searchKey);

   return dispatch('fetchUsers');
};

export const resetAll = ({commit}) => {
    commit('resetUsers');
    commit('resetUsersNextPage');
    commit('resetUsersLastPage');
}
