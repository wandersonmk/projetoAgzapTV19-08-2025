<template>
  <div class="min-h-[calc(100vh-0px)] w-full flex items-center justify-center p-4">
    <div class="w-full max-w-sm mx-auto">
      <!-- Card principal -->
      <div class="rounded-xl border border-border/50 bg-secondary p-6 shadow-lg backdrop-blur-sm">
        <div class="space-y-1">
          <h2 class="text-lg font-medium text-foreground/85">Recuperar senha</h2>
          <p class="text-sm text-foreground/60">Digite seu email para receber as instruções de recuperação</p>
        </div>

        <form @submit.prevent="handleSubmit" class="mt-6 space-y-3">
          <div>
            <AppInput
              v-model="email"
              type="email"
              placeholder="Digite seu email"
              autocomplete="email"
              required
              :valid="!!email && isEmailValid"
            />
            <div v-if="emailError" class="text-xs text-red-500 mt-1 px-1">
              {{ emailError }}
            </div>
          </div>

          <AppButton 
            type="submit" 
            block 
            :disabled="isLoading || !email || !isEmailValid"
          >
            <span v-if="isLoading">Enviando...</span>
            <span v-else>Enviar instruções</span>
          </AppButton>
        </form>

        <div class="mt-4 text-center">
          <NuxtLink 
            to="/login" 
            class="text-sm text-foreground/60 hover:text-foreground transition-colors"
          >
            Voltar para o login
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

definePageMeta({
  layout: 'auth',
  middleware: 'guest'
})

const email = ref('')
const isLoading = ref(false)

// Validações em tempo real
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const isEmailValid = computed(() => {
  return email.value.length === 0 || emailRegex.test(email.value)
})

const emailError = computed(() => {
  if (email.value.length > 0 && !emailRegex.test(email.value)) {
    return 'Digite um email válido'
  }
  return null
})

const handleSubmit = async () => {
  // Funcionalidade será implementada posteriormente
  console.log('Email para recuperação:', email.value)
}
</script>
