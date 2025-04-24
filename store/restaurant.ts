import { useMenuStore } from './menu'
import type { Restaurant } from '~/types'
import { toast } from 'vue-sonner'

interface RestaurantState {
  restaurant: Restaurant
}

type ApiResponse<T> = {
  data: T
}

export const useRestaurantStore = defineStore('restaurant', {
  state: (): RestaurantState => ({
    restaurant: {
      id: null,
      name: '',
      description: '',
      logo_url: null
    }
  }),

  getters: {
    hasRestaurant(): boolean {
      return !!this.restaurant.id
    },

    currentRestaurant(): Restaurant {
      return this.restaurant
    }
  },

  actions: {
    async getRestaurant() {
      try {
        const response = await $fetch<ApiResponse<Restaurant>>('/api/restaurant', {
          method: 'GET',
          params: {
            id: 7 // TODO: Remover ID hardcoded
          }
        })

        if (!response.data) {
          throw new Error('Restaurante não encontrado')
        }

        this.restaurant = response.data
        
        const menuStore = useMenuStore()
        await menuStore.fetchCategories()
        
        return true
      } catch (error) {
        console.error('Error fetching restaurant:', error)
        toast.error('Erro ao buscar restaurante')
        return false
      }
    },

    async createRestaurant(restaurant: Omit<Restaurant, 'id'>) {
      try {
        const response = await $fetch<ApiResponse<Restaurant>>('/api/restaurant', {
          method: 'POST',
          body: restaurant
        })

        if (!response.data) {
          throw new Error('Erro ao criar restaurante')
        }

        this.restaurant = response.data
        toast.success('Restaurante criado com sucesso!')
        return true
      } catch (error) {
        console.error('Error creating restaurant:', error)
        toast.error('Erro ao criar restaurante')
        return false
      }
    },

    async updateRestaurant(restaurant: Partial<Restaurant>) {
      try {
        if (!this.restaurant.id) {
          throw new Error('ID do restaurante não encontrado')
        }

        const response = await $fetch<ApiResponse<Restaurant>>('/api/restaurant', {
          method: 'PUT',
          body: {
            id: this.restaurant.id,
            ...restaurant
          }
        })

        if (!response.data) {
          throw new Error('Erro ao atualizar restaurante')
        }

        this.restaurant = response.data
        toast.success('Restaurante atualizado com sucesso!')
        return true
      } catch (error) {
        console.error('Error updating restaurant:', error)
        toast.error('Erro ao atualizar restaurante')
        return false
      }
    }
  },

  persist: true
})
