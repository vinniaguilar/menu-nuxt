<template lang="pug">
div.grid.grid-cols-12
  div(class="col-span-12 p-4 mx-auto")
    div
      .text-3xl.font-bold Seu cardápio
      .mt-1.text-sm.text-gray-500
        | Adicione, edite ou remova itens do seu cardápio.
    div.mt-4
      span.font-bold Observação: 
      span É necessário criar categorias para adicionar itens ao cardápio. Cada item do seu cardápio precisa fazer parte de uma categoria
    div.mt-8
      Card(class="w-full bg-gray-50 rounded-sm")
        div(class="grid grid-cols-12 divide-x-2 gap-8")
          div.p-2(class="col-span-4")
            MenuConfigCategory(@changeCategoryTab="categoryTab = $event")
          div(class="col-span-8") 
            MenuConfigDishes(:categoryTab="categoryTab")
</template>

<script setup>
const categoryTab = ref(null)
definePageMeta({
  layout: 'sidebar'
})
</script>
