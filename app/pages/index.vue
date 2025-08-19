<script setup lang="ts">
// Aplica middleware de autenticação
definePageMeta({
  middleware: 'auth',
  layout: 'dashboard'
})

// Estado de carregamento
const isLoading = ref(true)
const { isLoading: authLoading } = useAuth()

// Aguarda a autenticação ser carregada e adiciona um delay mínimo para UX
onMounted(async () => {
  // Aguarda o auth loading terminar
  while (authLoading.value) {
    await new Promise(resolve => setTimeout(resolve, 50))
  }
  
  // Delay reduzido para carregamento mais rápido
  await new Promise(resolve => setTimeout(resolve, 300))
  
  isLoading.value = false
})
</script>

<template>
  <div>
    <!-- Loading enquanto carrega -->
    <AppLoading 
      v-if="isLoading"
      title="Carregando Dashboard" 
      description="Preparando visão geral do sistema..."
    />
    
    <!-- Dashboard quando carregado -->
    <DashboardOverview v-else />
  </div>
</template>
