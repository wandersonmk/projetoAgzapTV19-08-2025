<script setup lang="ts">
import { ref, computed } from 'vue'

const name = ref('')
const companyName = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
let toast: any
onMounted(async () => {
  toast = await useToastSafe()
})
const showEmailModal = ref(false)

const { signUp, isLoading, errorMessage } = useAuth()

// Validações em tempo real
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const isEmailValid = computed(() => {
  if (!email.value) return true // Não mostra erro se estiver vazio
  return emailRegex.test(email.value)
})

const emailError = computed(() => {
  if (!email.value || isEmailValid.value) return ''
  return 'Email inválido'
})

const passwordsMatch = computed(() => {
  if (!password.value || !confirmPassword.value) return true // Não mostra erro se estiver vazio
  return password.value === confirmPassword.value
})

const passwordError = computed(() => {
  if (!confirmPassword.value || passwordsMatch.value) return ''
  return 'As senhas não coincidem'
})

const isPasswordStrong = computed(() => {
  if (!password.value) return true // Não mostra erro se estiver vazio
  return password.value.length >= 6
})

const passwordStrengthError = computed(() => {
  if (!password.value || isPasswordStrong.value) return ''
  return 'A senha deve ter pelo menos 6 caracteres'
})

async function handleRegister() {
  if (!name.value || !companyName.value || !email.value || !password.value || !confirmPassword.value) {
    toast?.warning('Preencha todos os campos')
    return
  }
  
  // Validação de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email.value)) {
    toast?.error('Digite um email válido')
    return
  }
  
  // Validação de confirmação de senha
  if (password.value !== confirmPassword.value) {
    toast?.error('As senhas não coincidem')
    return
  }
  
  if (password.value.length < 6) {
    toast?.error('A senha deve ter pelo menos 6 caracteres')
    return
  }
  
  try {
    await signUp({
      name: name.value,
      companyName: companyName.value,
      email: email.value,
      password: password.value
    })
    
    // Sucesso: mostrar modal de confirmação de email
    showEmailModal.value = true
    toast?.success('Conta criada com sucesso!')
    
  } catch (error) {
    // Erro já é tratado no composable e mostrado via errorMessage
    if (errorMessage.value) {
      toast?.error(errorMessage.value)
    }
    console.error('Erro no cadastro:', error)
  }
}

async function handleEmailModalConfirm() {
  showEmailModal.value = false
  // Redirecionar para página de obrigado
  console.log('Redirecionando para /obrigado')
  await navigateTo('/obrigado')
}

function handleEmailModalClose() {
  showEmailModal.value = false
}
</script>

<template>
  <div class="w-full max-w-sm rounded-xl border border-border bg-secondary p-6 shadow">
    <div class="space-y-1">
      <h2 class="text-lg font-semibold">Criar nova conta</h2>
      <p class="text-sm text-muted-foreground">Preencha os dados para se cadastrar</p>
    </div>

    <form @submit.prevent="handleRegister" class="mt-6 space-y-3">
      <AppInput
        v-model="name"
        type="text"
        placeholder="Nome completo"
        autocomplete="name"
        required
        :valid="!!name"
      />
      
      <AppInput
        v-model="companyName"
        type="text"
        placeholder="Nome da empresa"
        autocomplete="organization"
        required
        :valid="!!companyName"
      />
      
      <div>
        <AppInput
          v-model="email"
          type="email"
          placeholder="Email"
          autocomplete="email"
          required
          :invalid="!!emailError"
          :valid="!!email && isEmailValid"
        />
        <div v-if="emailError" class="text-xs text-red-500 mt-1 px-1">
          {{ emailError }}
        </div>
      </div>
      
      <div>
        <AppInput
          v-model="password"
          type="password"
          placeholder="Senha"
          autocomplete="new-password"
          required
          :invalid="!!passwordStrengthError"
          :valid="!!password && isPasswordStrong"
        />
        <div v-if="passwordStrengthError" class="text-xs text-red-500 mt-1 px-1">
          {{ passwordStrengthError }}
        </div>
      </div>
      
      <div>
        <AppInput
          v-model="confirmPassword"
          type="password"
          placeholder="Confirmar senha"
          autocomplete="new-password"
          required
          :invalid="!!passwordError"
          :valid="!!confirmPassword && passwordsMatch && !!password"
        />
        <div v-if="passwordError" class="text-xs text-red-500 mt-1 px-1">
          {{ passwordError }}
        </div>
      </div>
      
      <!-- Placeholder para mensagens de erro - será implementado futuramente -->
      <!-- <div v-if="errorMessage" class="text-sm text-red-500 bg-red-50 p-2 rounded">
        {{ errorMessage }}
      </div> -->
      
      <AppButton 
        type="submit" 
        block 
        :disabled="isLoading || !name || !companyName || !email || !password || !confirmPassword || !isEmailValid || !passwordsMatch || !isPasswordStrong"
      >
        <span v-if="isLoading">Criando conta...</span>
        <span v-else>Criar conta</span>
      </AppButton>
    </form>

    <!-- Modal de confirmação de email -->
    <EmailConfirmationModal
      v-if="showEmailModal"
      :email="email"
      @confirm="handleEmailModalConfirm"
      @close="handleEmailModalClose"
    />
  </div>
</template>
