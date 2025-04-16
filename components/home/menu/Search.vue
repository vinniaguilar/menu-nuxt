<template lang="pug">
div.relative.w-full.items-center.max-w-sm
  Input.pl-10(v-model="search" type="text" placeholder="Pesquisar pratos..." @input="$emit('input', search)")
    span.absolute.start-0.inset-y-0.flex.items-center.justify-center.pl-3
      Search.size-4.text-muted-foreground
  span.absolute.start-0.inset-y-0.flex.items-center.justify-center.pl-3
    Search.size-4.text-muted-foreground
</template>

<script setup>
import { Search } from 'lucide-vue-next'

const search = ref('')
</script>
