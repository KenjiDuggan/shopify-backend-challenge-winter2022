// Default State
export const state = () => ({
    auth: {
        loggedIn: false
    },
    user: {},
})

// Getters
export const getters = {
    isAuthenticated(state) {
        return state.auth.loggedIn // auth object as default will be added in vuex state, when you initialize nuxt auth
    },
    getUserInfo(state) {
        return state.auth.user
    }
}
 
// Mutations 
export const mutations = {
    SET_AUTH_STATE(state, loggedin) {
        state.auth.loggedIn = loggedin
    },
}
