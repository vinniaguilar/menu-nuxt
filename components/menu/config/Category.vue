<template lang="pug">
div(class="px-4")
  .text-start.font-medium Categorias
  Dialog
    DialogTrigger(as-child)
      Button(
        class="mt-4 text-white px-4 py-2 rounded-md transition duration-200 ease-in-out w-full"
      ) Adicionar categoria
        Plus
    DialogContent(class="sm:max-w-[425px]")
      DialogHeader
        DialogTitle Adicionar Categoria
        DialogDescription
          | Adicione uma nova categoria ao seu cardápio.
      div(class="grid grid-cols-12 gap-4")
        div(class="col-span-12")
          Input(
            v-model="newCategory.name"
            type="text"
            placeholder="Nome da categoria"
          )
      DialogFooter
        DialogClose(as-child)
          Button(
            variant="outline"
          ) Fechar
        Button(
          :disabled="newCategory.name.trim() === ''"
          @click="addCategory()"
        ) Adicionar
  div.mt-4
    div(
      v-for="category in menuStore.categories"
      :key="category.id"
      class="p-2 duration-200 ease-in-out mt-2 rounded-sm cursor-pointer"
      :class="selectedCategory === category.id ? 'bg-[#f9f1e6]' : 'hover:bg-gray-200 text-gray-600'"
      @click="selectedCategory = category.id; $emit('changeCategoryTab', category.id)"
    ) 
      div(class="flex justify-between items-center")
        div(:class="selectedCategory === category.id ? 'font-bold' : ''") {{ category.name }}
        ChevronRight(class="text-gray-400" )
</template>

<script setup>
import { useMenuStore } from '~/store/menu'
import { toast } from 'vue-sonner'
import { Plus, ChevronRight } from 'lucide-vue-next'
const menuStore = useMenuStore()

onMounted(() => {
  menuStore.fetchCategories()
})

const selectedCategory = ref(null)
const newCategory = ref({
  name: ''
})

const addCategory = () => {
  menuStore.createCategory(newCategory.value)
  newCategory.value.name = ''
}
</script>
