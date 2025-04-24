import { useUserStore } from './user'
import { supabase } from '~/utils/supabase'
import { toast } from 'vue-sonner'
import type { User, AuthCredentials } from '~/types'

interface AuthState {
  loading: boolean
}

type AuthResponse = {
  data: User | null
  error: Error | null
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    loading: false
  }),

  getters: {
    isLoading(): boolean {
      return this.loading
    }
  },

  actions: {
    async register(credentials: AuthCredentials): Promise<AuthResponse> {
      this.loading = true

      try {
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email: credentials.email,
          password: credentials.password
        })

        if (authError) {
          throw authError
        }

        if (!authData.user) {
          throw new Error('Dados do usuário não encontrados')
        }

        const { data: userData, error: userError } = await supabase
          .from('users')
          .insert([{ email: credentials.email }])
          .select()
          .single()

        if (userError) {
          throw userError
        }

        toast.success('Registro realizado com sucesso!')
        return { data: userData, error: null }
      } catch (error) {
        console.error('Erro ao registrar:', error)
        toast.error('Erro ao se registrar. Tente novamente mais tarde.')
        return { data: null, error: error as Error }
      } finally {
        this.loading = false
      }
    },

    async login(credentials: AuthCredentials): Promise<AuthResponse> {
      this.loading = true

      try {
        const { error: authError } = await supabase.auth.signInWithPassword({
          email: credentials.email,
          password: credentials.password
        })

        if (authError) {
          throw authError
        }

        const { data: userData, error: userError } = await supabase
          .from('users')
          .select()
          .eq('email', credentials.email)
          .single()

        if (userError) {
          throw userError
        }

        if (!userData) {
          throw new Error('Usuário não encontrado')
        }

        const userStore = useUserStore()
        userStore.setUser(userData)
        userStore.setLoggedIn(true)

        toast.success('Login realizado com sucesso!')
        return { data: userData, error: null }
      } catch (error) {
        console.error('Erro ao fazer login:', error)
        toast.error('Erro ao fazer login. Tente novamente mais tarde.')
        return { data: null, error: error as Error }
      } finally {
        this.loading = false
      }
    },

    async logout(): Promise<void> {
      try {
        const { error } = await supabase.auth.signOut()

        if (error) {
          throw error
        }

        const userStore = useUserStore()
        userStore.clearUser()

        toast.success('Logout realizado com sucesso!')
      } catch (error) {
        console.error('Erro ao fazer logout:', error)
        toast.error('Erro ao fazer logout. Tente novamente mais tarde.')
      }
    }
  }
})
