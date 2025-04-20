<template lang="pug">
div(class="px-4 pr-12")
  div
    div(v-if="categoryTab" class="flex justify-between items-center")
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
                div.mt-6
                  Label Adicione a imagem do seu prato
                  Input(
                    type="file"
                    placeholder=""
                    class="mt-1 cursor-pointer"
                    @input="uploadImage($event)"
                  )
                  div.mt-2(v-if="newDish.image")
                    | Preview da imagem
                    img(
                      :src="newDish.image"
                      class="w-32 h-32 object-cover rounded-md"
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
    div(v-else class="flex justify-center items-center h-64")
      div(class="text-center")
        div(class="text-gray-500") Selecione uma categoria para adicionar pratos.
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
import { toast } from 'vue-sonner'
import { handleUploadFile } from '~/utils/uploader'

const props = defineProps({
  categoryTab: {
    type: String,
    default: ''
  }
})

const uploadImage = async (event) => {
  const result = await handleUploadFile(event)
  console.log('result', result)
  if (result) {
    newDish.value.image = result
    console.log('newDish.value.image', newDish.value.image)
  } else {
    toast.error('Erro ao fazer upload da imagem')
  }
}

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
  image: '',
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
    newDish.value.image = ''
    newDish.value.price = 0
    newDish.value.is_active = true
  } catch (error) {
    toast.error('Erro ao adicionar prato')
  }
}
</script>
