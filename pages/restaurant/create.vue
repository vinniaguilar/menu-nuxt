<template lang="pug">
div.grid.grid-cols-12
  div(class="col-span-12 md:col-start-6 md:col-span-6 mx-auto p-4")
    div.text-3xl.font-bold
      | Cadastre seu restaurante
    div.mt-1.text-sm.text-gray-500
      | Crie seu restaurante e adicione pratos ao cardápio para exibir para seus futuros clientes
    div.mt-12
      div
        Label Nome do restaurante*
        Input(v-model="restaurantObj.name" type="text" id="restaurant-name" placeholder="Nome do restaurante" class="w-full mt-1")
      div.mt-8
        Label Descrição do restaurante*
        Textarea(v-model="restaurantObj.description" type="text" placeholder="Descrição do restaurante" class="w-full mt-1")
    div
      Button(type="submit" class="w-full mt-8" @click="createRestaurant()" :disabled="loading")
        Loader2(class="w-4 h-4 mr-2 animate-spin" v-if="loading") 
        | Criando restaurante
      .text-center.mt-1.text-sm.text-red-500(v-if="hasError")
        | Preencha todos os campos obrigatórios
</template>

<script setup>
import { Loader2 } from 'lucide-vue-next'
import { useRestaurantStore } from '~/store/restaurant'
const router = useRouter()
const restaurantStore = useRestaurantStore()

const restaurantObj = {
  name: '',
  description: ''
}
const loading = ref(false)
const hasError = ref(false)

const createRestaurant = async () => {
  hasError.value = false
  if (!restaurantObj.name || !restaurantObj.description) {
    hasError.value = true
    return
  }

  loading.value = true
  const result = await restaurantStore.createRestaurant(restaurantObj)
  if (!result) {
    hasError.value = true
    loading.value = false
    return
  }

  router.push('/')

  loading.value = false
}
</script>
