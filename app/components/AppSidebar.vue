<template>
  <div>
    <!-- Overlay para mobile (só aparece quando menu mobile está aberto) -->
    <div 
      v-if="isMobileOpen"
      @click="$emit('close-mobile')"
      class="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
    ></div>

    <!-- Sidebar Desktop (sempre visível em desktop) -->
    <div 
      class="hidden lg:flex fixed left-0 top-0 h-screen w-64 bg-background text-foreground z-50 shadow-2xl flex-col border-r border-border"
    >
      <!-- Header com nome da empresa -->
      <div class="flex items-center p-4 border-b border-border">
        <div class="flex items-center space-x-3">
          <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 6a3 3 0 11-6 0 3 3 0 616 0zM18 8a2 2 0 11-4 0 2 2 0 414 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
            </svg>
          </div>
          <div class="flex-1 min-w-0">
            <h1 class="text-lg font-bold truncate">
              {{ nomeEmpresa || 'Carregando...' }}
            </h1>
            <p class="text-xs text-muted-foreground">Sistema de Gestão</p>
          </div>
        </div>
      </div>

      <!-- Menu de navegação -->
      <nav class="px-4 py-2 flex-1 overflow-y-auto">
        <ul class="space-y-1">
          <!-- Dashboard -->
          <li>
            <NuxtLink 
              to="/"
              class="flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-muted group relative"
              :class="$route.path === '/' ? 'bg-primary text-primary-foreground' : 'text-foreground/80 hover:text-foreground'"
            >
              <font-awesome-icon 
                icon="home" 
                class="w-5 h-5 mr-3" 
              />
              <span>Dashboard</span>
            </NuxtLink>
          </li>

          <!-- Pedidos -->
          <li>
            <NuxtLink 
              to="/pedidos"
              class="flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-muted group relative"
              :class="$route.path === '/pedidos' ? 'bg-primary text-primary-foreground' : 'text-foreground/80 hover:text-foreground'"
            >
              <font-awesome-icon 
                icon="shopping-cart" 
                class="w-5 h-5 mr-3" 
              />
              <span>Pedidos</span>
            </NuxtLink>
          </li>

          <!-- Cardápio -->
          <li>
            <NuxtLink 
              to="/cardapio"
              class="flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-muted group relative"
              :class="$route.path === '/cardapio' ? 'bg-primary text-primary-foreground' : 'text-foreground/80 hover:text-foreground'"
            >
              <font-awesome-icon 
                icon="utensils" 
                class="w-5 h-5 mr-3" 
              />
              <span>Cardápio</span>
            </NuxtLink>
          </li>

          <!-- Clientes -->
          <li>
            <NuxtLink 
              to="/clientes"
              class="flex items-center w-full px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-muted group relative"
              :class="$route.path === '/clientes' ? 'bg-primary text-primary-foreground' : 'text-foreground/80 hover:text-foreground'"
            >
              <font-awesome-icon 
                icon="users" 
                class="w-5 h-5 mr-3" 
              />
              <span>Clientes</span>
            </NuxtLink>
          </li>

          <!-- Analytics -->
          <li>
            <NuxtLink 
              to="/ajuste-da-ia"
              class="flex items-center w-full px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-muted group relative"
              :class="$route.path === '/ajuste-da-ia' ? 'bg-primary text-primary-foreground' : 'text-foreground/80 hover:text-foreground'"
            >
              <font-awesome-icon 
                icon="robot" 
                class="w-5 h-5 mr-3" 
              />
              <span>Ajuste da IA</span>
            </NuxtLink>
          </li>

          <!-- Relatórios -->
          <li>
            <button 
              class="flex items-center w-full px-3 py-2 rounded-lg text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-muted transition-colors"
            >
              <font-awesome-icon 
                icon="file-alt" 
                class="w-5 h-5 mr-3" 
              />
              <span>Relatórios</span>
            </button>
          </li>

          <!-- Configurações -->
          <li>
            <button 
              class="flex items-center w-full px-3 py-2 rounded-lg text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-muted transition-colors"
            >
              <font-awesome-icon 
                icon="cog" 
                class="w-5 h-5 mr-3" 
              />
              <span>Configurações</span>
            </button>
          </li>

          <!-- Ajuda -->
          <li>
            <button 
              class="flex items-center w-full px-3 py-2 rounded-lg text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-muted transition-colors"
            >
              <font-awesome-icon 
                icon="question-circle" 
                class="w-5 h-5 mr-3" 
              />
              <span>Ajuda</span>
            </button>
          </li>
        </ul>
      </nav>

      <!-- Seção inferior com informações do usuário e botão sair -->
      <div class="mt-auto">
        <!-- Informações do usuário -->
        <div v-if="isLoggedIn" class="p-3 border-t border-border bg-muted/30">
          <div class="flex items-center space-x-3 mb-3">
            <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
              <span class="text-xs font-semibold text-white">
                {{ userEmail ? userEmail.charAt(0).toUpperCase() : 'U' }}
              </span>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-xs font-medium text-foreground truncate">
                {{ userEmail || 'Usuário' }}
              </p>
              <p class="text-xs text-muted-foreground flex items-center">
                <span class="w-1.5 h-1.5 bg-green-500 rounded-full mr-1"></span>
                Online
              </p>
            </div>
          </div>
        </div>
        
        <!-- Loading state quando usuário ainda está carregando -->
        <div v-else class="p-3 border-t border-border bg-muted/30">
          <div class="flex items-center space-x-3 mb-3">
            <div class="w-8 h-8 bg-muted rounded-full flex items-center justify-center animate-pulse">
              <span class="text-xs font-medium text-muted-foreground">...</span>
            </div>
            <div class="flex-1 min-w-0">
              <div class="h-3 bg-muted rounded animate-pulse mb-1"></div>
              <div class="h-2.5 bg-muted/70 rounded animate-pulse w-10"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Sidebar Mobile (só aparece quando isMobileOpen for true) -->
    <div 
      :class="isMobileOpen ? 'translate-x-0' : '-translate-x-full'"
      class="lg:hidden fixed left-0 top-0 h-screen w-64 bg-background text-foreground z-50 shadow-2xl flex-col border-r border-border transition-transform duration-300 ease-in-out flex"
    >
      <!-- Header com nome da empresa e botão fechar -->
      <div class="flex items-center justify-between p-4 border-b border-border">
        <div class="flex items-center space-x-3 flex-1 min-w-0">
          <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 6a3 3 0 11-6 0 3 3 0 616 0zM18 8a2 2 0 11-4 0 2 2 0 414 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
            </svg>
          </div>
          <div class="flex-1 min-w-0">
            <h1 class="text-lg font-bold truncate">
              {{ nomeEmpresa || 'Carregando...' }}
            </h1>
            <p class="text-xs text-muted-foreground">Sistema de Gestão</p>
          </div>
        </div>
        
        <!-- Botão fechar -->
        <button 
          @click="$emit('close-mobile')"
          class="p-2 rounded-lg text-foreground/80 hover:text-foreground hover:bg-muted transition-colors"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <!-- Menu de navegação mobile (mesmo conteúdo do desktop) -->
      <nav class="px-4 py-2 flex-1 overflow-y-auto">
        <ul class="space-y-1">
          <!-- Dashboard -->
          <li>
            <NuxtLink 
              to="/"
              @click="$emit('close-mobile')"
              class="flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-muted group relative"
              :class="$route.path === '/' ? 'bg-primary text-primary-foreground' : 'text-foreground/80 hover:text-foreground'"
            >
              <font-awesome-icon 
                icon="home" 
                class="w-5 h-5 mr-3" 
              />
              <span>Dashboard</span>
            </NuxtLink>
          </li>

          <!-- Pedidos -->
          <li>
            <NuxtLink 
              to="/pedidos"
              @click="$emit('close-mobile')"
              class="flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-muted group relative"
              :class="$route.path === '/pedidos' ? 'bg-primary text-primary-foreground' : 'text-foreground/80 hover:text-foreground'"
            >
              <font-awesome-icon 
                icon="shopping-cart" 
                class="w-5 h-5 mr-3" 
              />
              <span>Pedidos</span>
            </NuxtLink>
          </li>

          <!-- Cardápio -->
          <li>
            <NuxtLink 
              to="/cardapio"
              @click="$emit('close-mobile')"
              class="flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-muted group relative"
              :class="$route.path === '/cardapio' ? 'bg-primary text-primary-foreground' : 'text-foreground/80 hover:text-foreground'"
            >
              <font-awesome-icon 
                icon="utensils" 
                class="w-5 h-5 mr-3" 
              />
              <span>Cardápio</span>
            </NuxtLink>
          </li>

          <!-- Clientes -->
          <li>
            <NuxtLink 
              to="/clientes"
              @click="$emit('close-mobile')"
              class="flex items-center w-full px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-muted group relative"
              :class="$route.path === '/clientes' ? 'bg-primary text-primary-foreground' : 'text-foreground/80 hover:text-foreground'"
            >
              <font-awesome-icon 
                icon="users" 
                class="w-5 h-5 mr-3" 
              />
              <span>Clientes</span>
            </NuxtLink>
          </li>

          <!-- Analytics -->
          <li>
            <NuxtLink 
              to="/ajuste-da-ia"
              @click="$emit('close-mobile')"
              class="flex items-center w-full px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-muted group relative"
              :class="$route.path === '/ajuste-da-ia' ? 'bg-primary text-primary-foreground' : 'text-foreground/80 hover:text-foreground'"
            >
              <font-awesome-icon 
                icon="robot" 
                class="w-5 h-5 mr-3" 
              />
              <span>Ajuste da IA</span>
            </NuxtLink>
          </li>

          <!-- Relatórios -->
          <li>
            <button 
              class="flex items-center w-full px-3 py-2 rounded-lg text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-muted transition-colors"
            >
              <font-awesome-icon 
                icon="file-alt" 
                class="w-5 h-5 mr-3" 
              />
              <span>Relatórios</span>
            </button>
          </li>

          <!-- Configurações -->
          <li>
            <button 
              class="flex items-center w-full px-3 py-2 rounded-lg text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-muted transition-colors"
            >
              <font-awesome-icon 
                icon="cog" 
                class="w-5 h-5 mr-3" 
              />
              <span>Configurações</span>
            </button>
          </li>

          <!-- Ajuda -->
          <li>
            <button 
              class="flex items-center w-full px-3 py-2 rounded-lg text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-muted transition-colors"
            >
              <font-awesome-icon 
                icon="question-circle" 
                class="w-5 h-5 mr-3" 
              />
              <span>Ajuda</span>
            </button>
          </li>
        </ul>
      </nav>

      <!-- Seção inferior com informações do usuário (mobile) -->
      <div class="mt-auto">
        <!-- Informações do usuário -->
        <div v-if="isLoggedIn" class="p-3 border-t border-border bg-muted/30">
          <div class="flex items-center space-x-3">
            <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
              <span class="text-xs font-semibold text-white">
                {{ userEmail ? userEmail.charAt(0).toUpperCase() : 'U' }}
              </span>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-xs font-medium text-foreground truncate">
                {{ userEmail || 'Usuário' }}
              </p>
              <p class="text-xs text-green-600 flex items-center">
                <span class="w-1.5 h-1.5 bg-green-500 rounded-full mr-1"></span>
                Online
              </p>
            </div>
          </div>
        </div>
        
        <!-- Loading state quando usuário ainda está carregando -->
        <div v-else class="p-3 border-t border-border bg-muted/30">
          <div class="flex items-center space-x-3">
            <div class="w-8 h-8 bg-muted rounded-full flex items-center justify-center animate-pulse">
              <span class="text-xs font-medium text-muted-foreground">...</span>
            </div>
            <div class="flex-1 min-w-0">
              <div class="h-3 bg-muted rounded animate-pulse mb-1"></div>
              <div class="h-2.5 bg-muted/70 rounded animate-pulse w-10"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

// Props
interface Props {
  isMobileOpen?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isMobileOpen: false
})

// Emits
const emit = defineEmits<{
  'close-mobile': []
}>()

// Composables para empresa - SIMPLES
const { nomeEmpresa, buscarNomeEmpresa } = process.client ? useEmpresa() : { 
  nomeEmpresa: ref('Carregando...'), 
  buscarNomeEmpresa: async () => {} 
}

// Composables - abordagem simplificada
const userEmail = ref<string | null>(null)
const isLoggedIn = ref(false)

// Toast e montagem SIMPLES
const toast = ref<any>(null)
if (process.client) {
  onMounted(async () => {
    toast.value = await useToastSafe()
    checkUserSession()
    
    // BUSCA SIMPLES DA EMPRESA - sem complicação
    setTimeout(async () => {
      await buscarNomeEmpresa()
    }, 1000)
  })
}

// Atualizar nome da empresa quando página ficar visível - SIMPLES
if (process.client) {
  // Escutar mudanças de visibilidade da página para atualizar dados
  const handleVisibilityChange = async () => {
    if (!document.hidden) {
      await buscarNomeEmpresa()
    }
  }
  
  onMounted(() => {
    document.addEventListener('visibilitychange', handleVisibilityChange)
  })
  
  onUnmounted(() => {
    document.removeEventListener('visibilitychange', handleVisibilityChange)
  })
}

// Função para verificar sessão do usuário
const checkUserSession = () => {
  if (process.client) {
    try {
      // Método mais simples - verificar email salvo
      const savedEmail = localStorage.getItem('user_email')
      if (savedEmail) {
        userEmail.value = savedEmail
        isLoggedIn.value = true
        console.log('[AppSidebar] Email encontrado:', savedEmail)
        return
      }
      
      // Tentar pegar do localStorage do Supabase
      const authData = localStorage.getItem('agzap-auth-token')
      if (authData) {
        const parsed = JSON.parse(authData)
        if (parsed.user && parsed.user.email) {
          userEmail.value = parsed.user.email
          isLoggedIn.value = true
          console.log('[AppSidebar] Usuário encontrado no Supabase:', userEmail.value)
          return
        }
      }
      
      // Tentar pegar do estado global se disponível
      const globalUser = useState('auth_user') as any
      if (globalUser.value && globalUser.value.email) {
        userEmail.value = globalUser.value.email
        isLoggedIn.value = true
        console.log('[AppSidebar] Usuário do estado global:', userEmail.value)
        return
      }
      
      console.log('[AppSidebar] Nenhum usuário encontrado')
    } catch (error) {
      console.error('[AppSidebar] Erro ao verificar sessão:', error)
    }
  }
}
</script>