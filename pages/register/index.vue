<template lang="pug">
  div(class="grid grid-cols-12 gap-4 h-screen")
    div(class="mx-4 col-span-12 md:col-span-8 md:col-start-3 lg:col-span-6 lg:col-start-4 flex items-center justify-center")
      div(class="grid gap-6 w-full max-w-sm mx-auto")
        div
          .text-4xl.font-bold.mb-1 Registrar
          .text-sm.text-gray-600.mb-4 Seja bem-vindo! Crie sua conta para começar a usar o cardápio.
        div
          Input(v-model="form.email" type="email" placeholder="Email" class="mb-4")
          Input(v-model="form.password" type="password" placeholder="Senha" class="mb-4")
          Input(v-model="form.passwordConfirmation" type="password" placeholder="Confirme sua senha" class="mb-2")
          .text-sm.text-red-500.mb-4(v-if="form.password !== form.passwordConfirmation")
            | As senhas não coincidem
        div
          Button(type="submit" class="w-full" @click="handleRegister()" :disabled="loading")
            Loader2(class="w-4 h-4 mr-2 animate-spin" v-if="loading") 
            | Registrar
        div
          .text-sm.text-gray-600.mt-4 Já possui uma conta? 
            NuxtLink(to="/login" class="text-primary font-medium hover:underline") Acessar conta
  </template>

<script setup>
import { useAuthStore } from '~/store/auth'
import { toast } from 'vue-sonner'
import { Loader2 } from 'lucide-vue-next'

const authStore = useAuthStore()
const router = useRouter()
const form = ref({
  email: '',
  password: '',
  passwordConfirmation: ''
})
const loading = ref(false)

const handleRegister = async () => {
  if (!validateForm.value) {
    toast.error('Preencha todos os campos corretamente.')
    return
  }

  loading.value = true
  const result = await authStore.register({
    email: form.value.email,
    password: form.value.password
  })

  if (result) {
    router.push('/')
    return
  }
  loading.value = false
}

const validateForm = computed(() => {
  if (form.value.password !== form.value.passwordConfirmation) {
    toast.error('As senhas não coincidem.')
    return false
  }

  if (form.value.password.length < 6) {
    toast.error('A senha deve ter pelo menos 6 caracteres.')
    return false
  }

  return (
    form.value.email && form.value.password && form.value.passwordConfirmation
  )
})
</script>
