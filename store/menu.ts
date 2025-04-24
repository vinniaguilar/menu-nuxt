import { useRestaurantStore } from './restaurant'
import { toast } from 'vue-sonner'
import type { Category, Dish } from '~/types'

interface MenuState {
  categories: Category[]
  dishes: Record<number, Dish[]>
}

type ApiResponse<T> = {
  data: T
}

export const useMenuStore = defineStore('menu', {
  state: (): MenuState => ({
    categories: [],
    dishes: {}
  }),

  getters: {
    getCategoryById: (state) => (id: number) => {
      return state.categories.find(category => category.id === id)
    },

    getDishesByCategory: (state) => (categoryId: number) => {
      return state.dishes[categoryId] || []
    },

    hasCategories: (state) => {
      return state.categories.length > 0
    }
  },

  actions: {
    async fetchCategories() {
      const restaurantStore = useRestaurantStore()
      const restaurantId = restaurantStore.restaurant.id

      if (!restaurantId) {
        toast.error('ID do restaurante não encontrado')
        return false
      }

      try {
        const response = await $fetch<ApiResponse<Category[]>>('/api/categories', {
          method: 'GET',
          params: {
            restaurant_id: restaurantId
          }
        })

        if (!response.data) {
          throw new Error('Nenhuma categoria encontrada')
        }

        this.categories = response.data
        return true
      } catch (error) {
        console.error('Error fetching categories:', error)
        toast.error('Erro ao buscar categorias')
        return false
      }
    },

    async fetchDishes(categoryId: number) {
      const restaurantStore = useRestaurantStore()
      const restaurantId = restaurantStore.restaurant.id

      if (!restaurantId) {
        toast.error('ID do restaurante não encontrado')
        return false
      }

      try {
        const response = await $fetch<ApiResponse<Dish[]>>('/api/dishes', {
          method: 'GET',
          params: {
            restaurant_id: restaurantId,
            category_id: categoryId
          }
        })

        if (!response.data) {
          throw new Error('Nenhum prato encontrado')
        }

        this.dishes[categoryId] = response.data
        return true
      } catch (error) {
        console.error('Error fetching dishes:', error)
        toast.error('Erro ao buscar pratos')
        return false
      }
    },

    async createCategory(category: Pick<Category, 'name'>) {
      const restaurantStore = useRestaurantStore()
      const restaurantId = restaurantStore.restaurant.id

      if (!restaurantId) {
        toast.error('ID do restaurante não encontrado')
        return false
      }

      try {
        const response = await $fetch<ApiResponse<Category>>('/api/categories', {
          method: 'POST',
          body: {
            restaurant_id: restaurantId,
            name: category.name
          }
        })

        if (!response.data) {
          throw new Error('Erro ao criar categoria')
        }

        await this.fetchCategories()
        toast.success('Categoria criada com sucesso!')
        return true
      } catch (error) {
        console.error('Error creating category:', error)
        toast.error('Erro ao criar categoria')
        return false
      }
    },

    async createDish(dish: Omit<Dish, 'id' | 'restaurant_id' | 'created_at'>) {
      const restaurantStore = useRestaurantStore()
      const restaurantId = restaurantStore.restaurant.id

      if (!restaurantId) {
        toast.error('ID do restaurante não encontrado')
        return false
      }

      try {
        const response = await $fetch<ApiResponse<Dish>>('/api/dishes', {
          method: 'POST',
          body: {
            restaurant_id: restaurantId,
            ...dish
          }
        })

        if (!response.data) {
          throw new Error('Erro ao criar prato')
        }

        await this.fetchDishes(dish.category_id)
        toast.success('Prato criado com sucesso!')
        return true
      } catch (error) {
        console.error('Error creating dish:', error)
        toast.error('Erro ao criar prato')
        return false
      }
    },

    async updateDish(dish: Partial<Dish> & { id: number }) {
      try {
        const response = await $fetch<ApiResponse<Dish>>('/api/dishes', {
          method: 'PUT',
          body: dish
        })

        if (!response.data) {
          throw new Error('Erro ao atualizar prato')
        }

        await this.fetchDishes(dish.category_id!)
        toast.success('Prato atualizado com sucesso!')
        return true
      } catch (error) {
        console.error('Error updating dish:', error)
        toast.error('Erro ao atualizar prato')
        return false
      }
    }
  }
})
