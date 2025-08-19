<template>
  <div 
    v-if="isOpen"
    class="absolute top-14 right-0 w-80 bg-card border border-border rounded-lg shadow-lg z-50"
  >
    <!-- Header do painel -->
    <div class="flex items-center justify-between p-4 border-b border-border">
      <h3 class="text-lg font-semibold text-foreground">Notificações</h3>
      <button 
        @click="$emit('close')"
        class="p-1 rounded text-muted-foreground hover:text-foreground transition-colors"
      >
        <font-awesome-icon icon="times" class="w-4 h-4" />
      </button>
    </div>

    <!-- Lista de notificações -->
    <div class="max-h-96 overflow-y-auto">
      <div v-if="notifications.length === 0" class="p-4 text-center text-muted-foreground">
        Nenhuma notificação
      </div>
      
      <div v-else class="divide-y divide-border">
        <div 
          v-for="notification in notifications" 
          :key="notification.id"
          class="p-4 hover:bg-muted/50 transition-colors"
        >
          <div class="flex items-start space-x-3">
            <!-- Ícone da notificação -->
            <div 
              :class="notification.type === 'warning' ? 'text-amber-500' : 
                      notification.type === 'error' ? 'text-red-500' : 
                      notification.type === 'info' ? 'text-blue-500' : 'text-green-500'"
              class="mt-1"
            >
              <font-awesome-icon 
                :icon="notification.type === 'warning' ? 'exclamation-triangle' : 
                      notification.type === 'error' ? 'times-circle' : 
                      notification.type === 'info' ? 'info-circle' : 'check-circle'"
                class="w-5 h-5" 
              />
            </div>
            
            <!-- Conteúdo da notificação -->
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-foreground">
                {{ notification.title }}
              </p>
              <p class="text-xs text-muted-foreground mt-1">
                {{ notification.message }}
              </p>
              <p class="text-xs text-muted-foreground mt-2">
                {{ formatDate(notification.date) }}
              </p>
            </div>
            
            <!-- Badge não lida -->
            <div 
              v-if="!notification.read"
              class="w-2 h-2 bg-red-500 rounded-full mt-2"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer do painel -->
    <div class="p-3 border-t border-border bg-muted/30">
      <button 
        @click="markAllAsRead"
        class="w-full text-sm text-primary hover:text-primary/80 transition-colors"
      >
        Marcar todas como lidas
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Notification {
  id: string
  title: string
  message: string
  type: 'warning' | 'error' | 'info' | 'success'
  date: Date
  read: boolean
}

interface Props {
  isOpen: boolean
}

defineProps<Props>()

const emit = defineEmits<{
  'close': []
}>()

// Notificações fictícias
const notifications = ref<Notification[]>([
  {
    id: '1',
    title: 'Cliente com vencimento próximo',
    message: 'O cliente João Silva tem contrato vencendo em 3 dias',
    type: 'warning',
    date: new Date(2025, 7, 15),
    read: false
  },
  {
    id: '2',
    title: 'Pagamento em atraso',
    message: 'Maria Oliveira está com pagamento atrasado há 5 dias',
    type: 'error',
    date: new Date(2025, 7, 14),
    read: false
  },
  {
    id: '3',
    title: 'Novo cliente cadastrado',
    message: 'Pedro Santos foi cadastrado com sucesso',
    type: 'success',
    date: new Date(2025, 7, 13),
    read: true
  },
  {
    id: '4',
    title: 'Renovação automática',
    message: 'Ana Costa renovou automaticamente seu plano',
    type: 'info',
    date: new Date(2025, 7, 12),
    read: true
  },
  {
    id: '5',
    title: 'Contrato expirado',
    message: 'O contrato de Carlos Ferreira expirou ontem',
    type: 'error',
    date: new Date(2025, 7, 11),
    read: false
  }
])

// Função para formatar data
const formatDate = (date: Date) => {
  const now = new Date()
  const diffInMs = now.getTime() - date.getTime()
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))
  
  if (diffInDays === 0) {
    return 'Hoje'
  } else if (diffInDays === 1) {
    return 'Ontem'
  } else if (diffInDays < 7) {
    return `${diffInDays} dias atrás`
  } else {
    return date.toLocaleDateString('pt-BR')
  }
}

// Função para marcar todas como lidas
const markAllAsRead = () => {
  notifications.value.forEach(notification => {
    notification.read = true
  })
}

// Computed para contar notificações não lidas
const unreadCount = computed(() => {
  return notifications.value.filter(n => !n.read).length
})

// Expor o contador para o componente pai
defineExpose({
  unreadCount
})
</script>
