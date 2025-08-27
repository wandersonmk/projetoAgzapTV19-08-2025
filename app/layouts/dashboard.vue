<template>
  <div class="min-h-screen bg-background">
    <!-- Sidebar -->
    <AppSidebar :is-mobile-open="isMobileMenuOpen" @close-mobile="isMobileMenuOpen = false" />
    
    <!-- Conteúdo principal -->
    <div class="lg:ml-64 min-h-screen flex flex-col">
      <!-- Header principal com título e botões de ação -->
      <header class="bg-card border-b border-border px-6 py-4">
        <div class="flex items-center justify-between">
          <!-- Área esquerda com menu hambúrguer (mobile) e título -->
          <div class="flex items-center space-x-4">
            <!-- Menu Hambúrguer (só aparece no mobile) -->
            <button 
              @click="isMobileMenuOpen = true"
              class="lg:hidden p-2 rounded-lg text-foreground/80 hover:text-foreground hover:bg-muted transition-colors"
              title="Abrir menu"
            >
              <font-awesome-icon 
                icon="bars" 
                class="w-5 h-5" 
              />
            </button>
            
            <!-- Título -->
            <div>
              <h1 class="text-2xl font-bold text-foreground">{{ pageTitle }}</h1>
              <p class="text-sm text-muted-foreground">{{ pageDescription }}</p>
            </div>
          </div>
          
          <!-- Área de notificações e sair -->
          <div class="flex items-center space-x-3 relative">
            <!-- Botão de notificações -->
            <div class="relative">
              <button 
                @click="isNotificationOpen = !isNotificationOpen"
                class="relative p-2 rounded-lg text-foreground/80 hover:text-foreground hover:bg-muted transition-colors"
                title="Notificações"
              >
                <font-awesome-icon 
                  icon="bell" 
                  class="w-5 h-5" 
                />
                <!-- Badge de notificação -->
                <span 
                  v-if="unreadNotifications > 0"
                  class="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-red-500 text-white text-xs rounded-full flex items-center justify-center px-1"
                >
                  {{ unreadNotifications > 99 ? '99+' : unreadNotifications }}
                </span>
              </button>
              
              <!-- Painel de notificações -->
              <NotificationPanel 
                ref="notificationPanel"
                :is-open="isNotificationOpen"
                @close="isNotificationOpen = false"
              />
            </div>
            
            <!-- Botão Sair -->
            <button 
              @click="handleLogout"
              class="p-2 rounded-lg text-foreground/70 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 transition-all duration-200 group"
              title="Sair"
            >
              <font-awesome-icon 
                icon="sign-out-alt" 
                class="w-5 h-5 group-hover:scale-110 transition-transform duration-200" 
              />
            </button>
          </div>
        </div>
      </header>

      <!-- Conteúdo da página -->
      <main class="p-6 flex-1">
        <slot />
      </main>
      
      <!-- Footer global -->
      <AppFooter />
    </div>
  </div>
</template>

<script setup lang="ts">
// Estado do menu mobile
const isMobileMenuOpen = ref(false)

// Estado das notificações
const isNotificationOpen = ref(false)
const notificationPanel = ref()
const unreadNotifications = ref(3) // Valor inicial fictício

// Composables para autenticação
const { signOut } = useAuth()

// Título dinâmico baseado na rota
const route = useRoute()
const pageTitle = computed(() => {
  switch (route.path) {
    case '/':
      return 'Dashboard'
    case '/pedidos':
      return 'Pedidos'
    case '/cardapio':
      return 'Cardápio'
    case '/clientes':
      return 'Clientes'
    case '/ajuste-da-ia':
      return 'Ajuste da IA'
    default:
      return 'Dashboard'
  }
})

const pageDescription = computed(() => {
  switch (route.path) {
    case '/':
      return 'Visão geral do sistema'
    case '/pedidos':
      return 'Gerencie todos os pedidos e vendas'
    case '/cardapio':
      return 'Gerencie itens e categorias do cardápio'
    case '/clientes':
      return 'Gerencie todos os seus clientes'
    case '/ajuste-da-ia':
      return 'Configure as configurações de inteligência artificial'
    default:
      return 'Visão geral do sistema'
  }
})

// Toast
const toast = ref<any>(null)
if (process.client) {
  onMounted(async () => {
    toast.value = await useToastSafe()
  })
}

// Função de logout completa
const handleLogout = async () => {
  try {
    console.log('[Dashboard] Iniciando logout...')
    
    // Limpar localStorage completamente
    if (process.client) {
      localStorage.removeItem('user_email')
      localStorage.removeItem('agzap-auth-token')
      localStorage.removeItem('sb-wynjuzsrydsvkmyhjfhu-auth-token')
      // Limpar todos os itens relacionados ao auth
      Object.keys(localStorage).forEach(key => {
        if (key.includes('auth') || key.includes('supabase') || key.includes('sb-')) {
          localStorage.removeItem(key)
        }
      })
    }
    
    // Limpar estado global
    const globalUser = useState('auth_user')
    const globalSession = useState('auth_session')
    const globalLoading = useState('auth_loading')
    
    globalUser.value = null
    globalSession.value = null
    globalLoading.value = false
    
    console.log('[Dashboard] Estados limpos')
    
    // Mostrar toast de sucesso
    if (toast.value && toast.value.success) {
      toast.value.success('Deslogado com sucesso!', {
        position: 'top-right',
        timeout: 3000,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.6,
        showCloseButtonOnHover: false,
        hideProgressBar: false,
        closeButton: "button",
        icon: true,
        rtl: false
      })
    }
    
    // Pequeno delay para garantir que tudo foi limpo
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // Redirecionar para login com force reload
    console.log('[Dashboard] Redirecionando para login...')
    await navigateTo('/login', { replace: true })
    
    // Force reload para garantir que a página seja totalmente recarregada
    if (process.client) {
      setTimeout(() => {
        window.location.href = '/login'
      }, 100)
    }
    
  } catch (error) {
    console.error('Erro ao fazer logout:', error)
    
    // Mostrar toast de erro
    if (toast.value && toast.value.error) {
      toast.value.error('Erro ao fazer logout. Tente novamente.', {
        position: 'top-right',
        timeout: 5000
      })
    }
    
    // Em caso de erro, force a navegação mesmo assim
    if (process.client) {
      window.location.href = '/login'
    }
  }
}
</script>
