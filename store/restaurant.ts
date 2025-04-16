export const useRestaurantStore = defineStore('restaurant', {
  state: () => ({
    restaurant: {
      id: 7,
      name: 'Teste Aguilar',
      description: 'Teste Aguilar',
      logo_url: null,
      created_at: '2025-04-16T05:28:00.221935+00:00'
    }
  }),
  actions: {
    async getRestaurant() {
      const data = await $fetch('/api/restaurant', {
        method: 'GET',
        params: {
          id: 7
        }
      })
      this.restaurant = data
      return data
    },
    async createRestaurant(restaurant: {
      name: string
      description: string
      logo_url: string
    }) {
      const data = await $fetch('/api/restaurant', {
        method: 'POST',
        body: restaurant
      })
      this.restaurant = data
      return data
    },
    async updateRestaurant(restaurant: {
      id: number
      name: string
      description: string
      logo_url: string
    }) {
      const data = await $fetch('/api/restaurant', {
        method: 'PUT',
        body: restaurant
      })
      this.restaurant = data
      return data
    }
  }
})
