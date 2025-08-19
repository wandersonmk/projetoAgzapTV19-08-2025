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
      title="Carregando Clientes"
      description="Preparando a área de clientes..."
    />
    
    <!-- Página de Clientes quando carregado -->
    <div v-else class="space-y-6">
      <!-- Conteúdo principal -->
      <div class="bg-card border border-border rounded-lg p-6">
        <div class="flex items-center justify-center h-64">
          <div class="text-center">
            <div class="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
              <svg class="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/>
              </svg>
            </div>
            <h3 class="text-lg font-medium text-foreground mb-2">Página em Construção</h3>
            <p class="text-muted-foreground">O gerenciamento de clientes será implementado em breve.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
