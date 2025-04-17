import { useRestaurantStore } from './restaurant'
import { toast } from 'vue-sonner'

export const useMenuStore = defineStore('menu', {
  state: () => ({
    categories: [],
    dishes: []
  }),
  actions: {
    async fetchCategories() {
      console.log('Fetching categories...')
      const restaurantStore = useRestaurantStore()
      const restaurantId = restaurantStore.restaurant.id
      try {
        const data = await $fetch('/api/categories', {
          method: 'GET',
          params: {
            restaurant_id: restaurantId
          }
        })
        console.log('Fetched categories:', data)
        this.categories = data
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    },
    async fetchDishes(categoryId: number) {
      console.log('Fetching dishes...')
      const restaurantStore = useRestaurantStore()
      try {
        const data = await $fetch('/api/dishes', {
          method: 'GET',
          params: {
            restaurant_id: restaurantStore.restaurant.id,
            category_id: categoryId
          }
        })
        this.dishes[categoryId] = data
        console.log('Fetched dishes:', data)
      } catch (error) {
        console.error('Error fetching dishes:', error)
      }
    },
    async createCategory(category: { name: string }) {
      const restaurantStore = useRestaurantStore()
      const restaurantId = restaurantStore.restaurant.id

      const payload = {
        restaurant_id: restaurantId,
        name: category.name
      }

      console.log('Payload:', payload)
      try {
        await $fetch('/api/categories', {
          method: 'POST',
          body: payload
        })

        toast.success('Categoria criada com sucesso!')
        this.fetchCategories()
      } catch (err) {
        console.error('Error creating category:', err)
        toast.error('Erro ao criar categoria, tente novamente mais tarde')
      }
    },
    async createDish(dish: {
      name: string
      description: string
      price: number
      category_id: number
    }) {
      const restaurantStore = useRestaurantStore()
      const restaurantId = restaurantStore.restaurant.id

      const payload = {
        restaurant_id: restaurantId,
        ...dish
      }

      console.log('Payload:', payload)
      try {
        await $fetch('/api/dishes', {
          method: 'POST',
          body: payload
        })

        toast.success('Prato criado com sucesso!')
        this.fetchDishes(dish.category_id)
      } catch (err) {
        console.error('Error creating dish:', err)
        toast.error('Erro ao criar prato, tente novamente mais tarde')
      }
    }
  }
})
