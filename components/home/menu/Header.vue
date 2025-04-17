<template lang="pug">
div
  .font-bold.text-2xl
    | {{ restaurantStore.restaurant.name }}
  .text-sm.text-gray-500
    | Disfrute de uma refeição deliciosa, são X pratos no cardápio disponíveis...
</template>

<script setup>
import { useRestaurantStore } from '~/store/restaurant'

const restaurantStore = useRestaurantStore()
</script>
