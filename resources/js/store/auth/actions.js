import AuthService from "../../services/AuthService";

export const login = async ({commit}, credentials) => {
    await AuthService.login(credentials)
        .then(({ data }) => {
            return commit('setAuthUser', data);
        })
        .catch(error => {
            const errors = Object.values(error.response.data.errors);
            commit('setValidationError', errors[0][0]);

            throw error.response.status;
        });
};

export const logout = ({commit}) => {
    commit('setAuthUser', {});

    window.location.replace('/');
};
