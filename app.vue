<template lang="pug">
  Toaster(richColors)
  SidebarProvider
    AppSidebar
    main
      SidebarTrigger
      NuxtPage.m-8
</template>

<script setup lang="ts">
import { useRestaurantStore } from './store/restaurant'
const router = useRouter()
const restaurantStore = useRestaurantStore()

const handleInitApp = async () => {
  console.log('handleInitApp')
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
