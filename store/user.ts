export const useUserStore = defineStore('user', {
  state: () => ({
    user: {},
    session: null,
    loggedIn: false
  }),
  actions: {
    setUser(user: object) {
      this.user = user
    },
    setLoggedIn(boolean: boolean) {
      this.loggedIn = boolean
    }
  },
  persist: true
})
