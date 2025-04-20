// import { useMenuStore } from './menu'
import { supabase } from '~/utils/supabase'
import { toast } from 'vue-sonner'

export const useAuthStore = defineStore('auth', {
  state: () => ({}),
  actions: {
    async register({ email, password }) {
      console.log('Tentando registrar com:', email, password)
      const { data, error } = await supabase.auth.signUp({
        email,
        password
      })

      if (error) {
        console.error('Erro ao registrar:', error.message)
        toast.error('Erro ao se registrar. Tente novamente mais tarde.')
        return
      }

      if (data) {
        console.log('Usuário registrado com sucesso:', data)
      }

      return data
    },
    async login({ email, password }) {
      console.log('Tentando fazer login com:', email, password)
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) {
        console.error('Erro ao fazer login:', error.message)
        toast.error('Erro ao fazer login. Tente novamente mais tarde.')
        return
      }

      if (data) {
        console.log('Usuário logado com sucesso:', data)
      }

      return data
    }
  }
})
