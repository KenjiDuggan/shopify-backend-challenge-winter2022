// Default State
export const state = () => ({
    auth: {
        loggedIn: false 
    },
})

// Getters
export const getters = {
    isAuthenticated(state) {
        return state.auth.loggedIn // auth object as default will be added in vuex state, when you initialize nuxt auth
    },
    getUserInfo(state) {
        console.log(state.auth.user)
        return state.auth.user
    }
}
 
// Mutations 
export const mutations = {
    SET_AUTH_STATE(state, loggedin) {
        state.auth.loggedIn = loggedin
    },
}
