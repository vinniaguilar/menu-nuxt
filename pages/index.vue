<template lang="pug">
  div
    HomeMenuHeader
    HomeMenuSearch.mt-8(v-model="search" @input="search = $event")
    HomeMenuContent.mt-6(:items="filteredItems")

</template>

<script setup>
definePageMeta({
  layout: 'sidebar'
})

const search = ref('')

const items = [
  {
    title: 'Prato 1',
    img: 'https://img.freepik.com/free-photo/top-view-table-full-food_23-2149209253.jpg?semt=ais_hybrid&w=740',
    description: 'Descrição do prato 1',
    price: 10.0
  },
  {
    title: 'Prato 2',
    img: 'https://img.freepik.com/free-photo/top-view-table-full-food_23-2149209253.jpg?semt=ais_hybrid&w=740',
    description: 'Descrição do prato 2',
    price: 15.0
  },
  {
    title: 'Prato 3',
    img: 'https://img.freepik.com/free-photo/top-view-table-full-food_23-2149209253.jpg?semt=ais_hybrid&w=740',
    description: 'Descrição do prato 3',
    price: 20.0
  },
  {
    title: 'Prato 4',
    img: 'https://img.freepik.com/free-photo/top-view-table-full-food_23-2149209253.jpg?semt=ais_hybrid&w=740',
    description: 'Descrição do prato 4',
    price: 25.0
  },
  {
    title: 'Prato 5',
    img: 'https://img.freepik.com/free-photo/top-view-table-full-food_23-2149209253.jpg?semt=ais_hybrid&w=740',
    description: 'Descrição do prato 5',
    price: 30.0
  },
  {
    title: 'Prato 6',
    img: 'https://img.freepik.com/free-photo/top-view-table-full-food_23-2149209253.jpg?semt=ais_hybrid&w=740',
    description: 'Descrição do prato 6',
    price: 35.0
  }
]

const filteredItems = computed(() => {
  if (!search.value) {
    return items
  }
  return items.filter((item) =>
    item.title.toLowerCase().includes(search.value.toLowerCase())
  )
})
</script>
