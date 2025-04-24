<template lang="pug">
div
  Toaster(richColors)
  NuxtLayout
</template>

<script setup lang="ts">
import { useRestaurantStore } from './store/restaurant'
import { useUserStore } from './store/user'
const router = useRouter()
const restaurantStore = useRestaurantStore()
const userStore = useUserStore()

const handleInitApp = async () => {
  console.log('handleInitApp')
  console.log('Usuário na store: ', userStore.user)

  const result = await restaurantStore.getRestaurant()
  if (!result) {
    router.push('/restaurant/create')
  }
}

onMounted(() => {
  handleInitApp()
})
</script>

<style>
body {
  font-family: Inter;
}
</style>
