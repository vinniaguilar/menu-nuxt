<template lang="pug">
div(class="w-full grid grid-cols-12 gap-4")
  Card(v-for="item in items" :key="item.title" class="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3")
    CardHeader
      CardTitle {{ item.title }}
    CardContent
      CardDescription {{ item.description }}
      p.text-sm.font-semibold.text-muted-foreground R${{ currency(item.price) }}
    CardFooter
      Button(@click="router.push('food/123')" class="w-full")
        | Adicionar ao carrinho
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    required: true
  }
})

const router = useRouter()

const currency = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
}
</script>
