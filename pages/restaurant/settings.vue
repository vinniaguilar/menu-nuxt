<template lang="pug">
div.grid.grid-cols-12
  div(class="col-span-12 p-4 mx-auto")
    div
      .text-3xl.font-bold
        | Configurações do seu restaurante
      .mt-1.text-sm.text-gray-500
        | Altere as informações do seu restaurante, como nome, descrição e endereço.
    div
      .mt-8
        Label Nome do restaurante*
        Input(v-model="restaurantStore.restaurant.name" type="text" placeholder="Nome do restaurante" class="w-full mt-1")
      .mt-8
        Label Descrição do restaurante*
        Textarea(v-model="restaurantStore.restaurant.description" type="text" placeholder="Descrição do restaurante" class="w-full mt-1")
    div
      Button(type="submit" class="w-full mt-8" @click="updateRestaurant()")
        Loader2(class="w-4 h-4 mr-2 animate-spin" v-if="loading") 
        | Atualizar informações
      .text-center.mt-1.text-sm.text-red-500(v-if="hasError")
        | Preencha todos os campos obrigatórios
</template>

<script setup>
import { useRestaurantStore } from '~/store/restaurant'
import { Loader2 } from 'lucide-vue-next'
import { toast } from 'vue-sonner'

definePageMeta({
  layout: 'sidebar'
})
const restaurantStore = useRestaurantStore()

const loading = ref(false)
const hasError = ref(false)

const updateRestaurant = async () => {
  hasError.value = false

  const restaurantCopy = {
    ...restaurantStore.restaurant
  }

  if (!restaurantCopy.name || !restaurantCopy.description) {
    hasError.value = true
    return
  }

  loading.value = true
  const result = await restaurantStore.updateRestaurant(restaurantCopy)
  if (!result) {
    hasError.value = true
    loading.value = false
    return
  }

  toast.success('Restaurante atualizado com sucesso!', {
    description: 'As informações do seu restaurante foram atualizadas.'
  })
  loading.value = false
}
</script>
