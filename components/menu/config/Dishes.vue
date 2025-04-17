<template lang="pug">
div(class="px-4 pr-12")
  div
    div(class="flex justify-between items-center")
      div
        .text-start.font-medium Pratos
        .text-sm.text-gray-500
          | {{ menuStore.categories.find(category => category.id === categoryTab)?.name }}
      div(class="flex items-center")
        Dialog
          DialogTrigger(as-child)
            Button(
              class="mt-4 text-white px-4 py-2 rounded-md transition duration-200 ease-in-out w-full"
            ) Adicionar prato
              Plus
          DialogContent(class="sm:max-w-[600px]")
            DialogHeader
              DialogTitle Adicionar prato
              DialogDescription
                | Adicione um novo prato ao seu cardápio.
            div(class="grid grid-cols-12 gap-4")
              div(class="col-span-12 gap-4")
                Input(
                  v-model="newDish.name"
                  type="text"
                  placeholder="Nome do prato"
                )
                Textarea.mt-6(
                  v-model="newDish.description"
                  type="text"
                  placeholder="Descrição do prato"
                )
                Input.mt-6(
                  v-model="newDish.price"
                  type="number"
                  placeholder="Preço do prato"
                )
                div.mt-6(class="flex items-center space-x-2")
                  Switch(
                    class="cursor-pointer"
                    :model-value="newDish.is_active"
                    id="is_active"
                    @update:model-value="newDish.is_active = $event"
                  ) 
                  Label
                    | O prato estará visível para os clientes
            DialogFooter
              DialogClose(as-child)
                Button(
                  variant="outline"
                ) Fechar
              Button(
                @click="addDish()"
                :disabled="!isValidNewDish"
              ) Adicionar
  div
    MenuConfigDish.mt-4(
      v-for="dish in dishes"
      :key="dish.id"
      :dish="dish"
    )
</template>

<script setup>
import { ref, computed, watch, toRef } from 'vue'
import { useMenuStore } from '~/store/menu'
import { Plus, Trash2 } from 'lucide-vue-next'

const props = defineProps({
  categoryTab: {
    type: String,
    default: ''
  }
})

const dishes = computed(() => {
  const menuStore = useMenuStore()
  return menuStore.dishes[props.categoryTab] || []
})

const categoryTab = toRef(props, 'categoryTab')

const menuStore = useMenuStore()

watch(
  categoryTab,
  (newCategoryTab) => {
    if (newCategoryTab) {
      menuStore.fetchDishes(newCategoryTab)
    }
  },
  { immediate: true }
)

const newDish = ref({
  name: '',
  description: '',
  price: 0,
  is_active: true
})

const isValidNewDish = computed(() => {
  return (
    newDish.value.name.trim() !== '' &&
    newDish.value.description.trim() !== '' &&
    newDish.value.price > 0
  )
})

const addDish = async () => {
  try {
    const payload = {
      ...newDish.value,
      category_id: categoryTab.value
    }

    await menuStore.createDish(payload)
    newDish.value.name = ''
    newDish.value.description = ''
    newDish.value.price = 0
    newDish.value.is_active = true
  } catch (error) {
    toast.error('Erro ao adicionar prato')
  }
}
</script>
