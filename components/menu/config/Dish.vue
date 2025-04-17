<template lang="pug">
div(class="flex justify-center mx-auto")
  Card(class="p-4 bg-gray-50 w-full rounded-sm")
    div
      div(class="flex justify-between items-center")
        div(class="flex items-center gap-4")
          div
            Avatar(class="h-16 w-16 rounded-md")
              AvatarImage(src="https://s2-receitas.glbimg.com/w-RIgGFLB5I_mxAwM5G6exgRktE=/0x0:1080x608/924x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_e84042ef78cb4708aeebdf1c68c6cbd6/internal_photos/bs/2021/5/K/EPOEiySp2bPFu4ciALlQ/capas-para-materias-gshow-home.jpg")
          div
            .text-start.font-medium {{ dish.name }}
            .text-sm.text-gray-500
              | {{ dish.description.slice(0, 50) }}{{ dish.description.length > 50 ? '...' : '' }}
            .text-md.font-bold
              | R$ {{ dish.price / 100 }}
        div(class="flex items-center")
          Button(
            class="hover:bg-gray-100 rounded-md"
            variant="outlined"
            @click=""
          )
            Eye
          Button(
            class="hover:bg-gray-100 hover:text-gray-700 rounded-md"
            variant="outlined"
            @click=""
          )
            Pencil
          Button(
            class="hover:bg-gray-100 text-red-500 rounded-md"
            variant="outlined"
            @click="menuStore.deleteDish(dish.id)"
          )
            Trash2

</template>

<script setup>
import { useMenuStore } from '~/store/menu'
import { Pencil, Trash2, Eye } from 'lucide-vue-next'

defineProps({
  dish: {
    type: Object,
    default: () => {}
  }
})

const menuStore = useMenuStore()

const deleteDish = async () => {
  const response = await menuStore.deleteDish(dish.id)
  if (response) {
    toast.success('Prato deletado com sucesso!')
  } else {
    toast.error('Erro ao deletar prato')
  }
}
</script>
