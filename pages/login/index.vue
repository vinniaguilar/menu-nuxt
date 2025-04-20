<template lang="pug">
div(class="grid grid-cols-12 gap-4 h-screen")
  div(class="mx-4 col-span-12 md:col-span-8 md:col-start-3 lg:col-span-6 lg:col-start-4 flex items-center justify-center")
    div(class="grid gap-6 w-full max-w-sm mx-auto")
      div
        .text-4xl.font-bold.mb-1 Login
        .text-sm.text-gray-600.mb-4 Faça login na sua conta para continuar
      div
        Input(v-model="form.email" type="email" placeholder="Email" class="mb-4")
        Input(v-model="form.password" type="password" placeholder="Senha" class="mb-4")
      div
        Button(type="submit" class="w-full" @click="handleLogin()")
          Loader2(class="w-4 h-4 mr-2 animate-spin" v-if="loading") 
          | Entrar
      div
        .text-sm.text-gray-600.mt-4 Não tem uma conta? 
          NuxtLink(to="/register" class="text-primary font-medium hover:underline") Criar conta
</template>

<script setup>
import { useAuthStore } from '~/store/auth'
import { toast } from 'vue-sonner'
import { Loader2 } from 'lucide-vue-next'

const authStore = useAuthStore()
const router = useRouter()
const form = ref({
  email: '',
  password: ''
})
const loading = ref(false)

const handleLogin = async () => {
  if (!validateForm.value) {
    toast.error('Preencha todos os campos corretamente.')
    return
  }

  loading.value = true
  const result = await authStore.login({
    email: form.value.email,
    password: form.value.password
  })

  if (result) {
    router.push('/')
    return
  }

  console.log('Fazendo registro com', form.value)

  loading.value = false
}

const validateForm = computed(() => {
  return form.value.email && form.value.password
})
</script>
