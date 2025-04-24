import type { User } from '~/types'
import persistedState from 'pinia-plugin-persistedstate'

interface UserState {
  user: Partial<User>
  session: any | null
  loggedIn: boolean
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    user: {},
    session: null,
    loggedIn: false
  }),

  getters: {
    isAuthenticated(): boolean {
      return this.loggedIn && !!this.user.id
    },
    
    currentUser(): Partial<User> {
      return this.user
    }
  },

  actions: {
    setUser(user: Partial<User>) {
      this.user = user
    },

    setLoggedIn(status: boolean) {
      this.loggedIn = status
    },

    clearUser() {
      this.user = {}
      this.session = null
      this.loggedIn = false
    }
  },

  persist: true
})
