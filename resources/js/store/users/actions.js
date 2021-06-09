import UserService from "../../services/UserService";

export const fetchUsers = async ({state, commit}) => {
    await UserService.index(state.page, state.limit, state.searchKey)
        .then(response => {
            const { data : { meta: meta } } = response;
            const { data : { data: users } } = response;

            commit('setUsers', users);
            commit('setUsersPage', meta.current_page);
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
    commit('resetUsersPage');
    commit('resetUsersLastPage');
}
