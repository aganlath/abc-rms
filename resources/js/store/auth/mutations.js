export const setValidationError = (state, error) => state.validationError = error;

export const setAuthUser = (state, userData) => {
    state.user = userData;

    localStorage.setItem('user', JSON.stringify(userData));
    axios.defaults.headers.common.Authorization = `Bearer ${userData.api_token}`;
};
