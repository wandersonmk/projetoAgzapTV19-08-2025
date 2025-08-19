<template>
  <div class="bg-card text-card-foreground rounded-lg border border-border shadow-sm p-6">
    <h3 class="text-lg font-semibold text-foreground mb-6">Limite de Clientes</h3>
    
    <!-- Gráfico Circular Principal -->
    <div class="flex flex-col items-center mb-8">
      <div class="relative w-48 h-48 mb-6">
        <!-- Background circle -->
        <svg class="w-full h-full transform -rotate-90" viewBox="0 0 120 120" style="overflow: visible;">
          <!-- Círculo de fundo -->
          <circle
            cx="60"
            cy="60"
            r="40"
            stroke="currentColor"
            stroke-width="8"
            fill="none"
            class="text-muted/20"
          />
          
          <!-- Círculo de progresso com gradiente -->
          <circle
            cx="60"
            cy="60"
            r="40"
            stroke="url(#gradient)"
            stroke-width="8"
            fill="none"
            stroke-linecap="round"
            :stroke-dasharray="circumference"
            :stroke-dashoffset="strokeDashoffset"
            class="transition-all duration-1000 ease-out"
            style="filter: drop-shadow(0 0 12px rgba(59, 130, 246, 0.4))"
          />
          
          <!-- Definindo o gradiente -->
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#06B6D4;stop-opacity:1" />
              <stop offset="50%" style="stop-color:#3B82F6;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#8B5CF6;stop-opacity:1" />
            </linearGradient>
          </defs>
        </svg>
        
        <!-- Texto central -->
        <div class="absolute inset-0 flex flex-col items-center justify-center">
          <div class="text-4xl font-bold text-foreground">{{ displayTotal }}</div>
          <div class="text-[10px] text-gray-400 uppercase tracking-wide font-medium">CLIENTES TOTAIS</div>
        </div>
      </div>
    </div>

    <!-- Barra de Progresso Mensal -->
    <div>
      <div class="flex justify-between text-sm mb-2">
        <span class="text-gray-400 uppercase tracking-wide">LIMITE</span>
        <span class="text-foreground font-medium">{{ monthlyUsed }}/{{ monthlyLimit }}</span>
      </div>
      <div class="relative h-3 bg-muted rounded-full overflow-hidden">
        <div 
          class="absolute left-0 top-0 h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full transition-all duration-2000 ease-out"
          :style="{ width: `${monthlyPercentage}%` }"
        ></div>
        <!-- Indicador pontinho -->
        <div 
          class="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white rounded-full border-2 border-purple-500 shadow-lg transition-all duration-2000 ease-out"
          :style="{ left: `calc(${monthlyPercentage}% - 8px)` }"
        ></div>
      </div>
      <div class="flex justify-center text-xs text-gray-400 mt-2">
        <span>O seu plano permite {{ monthlyLimit }} clientes</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Dados do gráfico de clientes
const totalClientes = 687
const monthlyLimit = 1000
const monthlyUsed = 687

// Estados reativos para animação
const currentPercentage = ref(0)
const displayTotal = ref(0)
const monthlyPercentage = ref(0)

// Calcular percentual baseado na meta mensal
const targetPercentage = Math.round((monthlyUsed / monthlyLimit) * 100)

// Cálculos do círculo
const radius = 40
const circumference = 2 * Math.PI * radius

// Computed para o stroke-dashoffset
const strokeDashoffset = computed(() => {
  const progress = currentPercentage.value / 100
  return circumference - (progress * circumference)
})

// Função para animar os valores
const animateProgress = () => {
  // Animar círculo principal e total de clientes
  const duration1 = 2000
  const startTime1 = Date.now()
  
  const animate1 = () => {
    const elapsed = Date.now() - startTime1
    const progress = Math.min(elapsed / duration1, 1)
    const easeOut = 1 - Math.pow(1 - progress, 3)
    
    currentPercentage.value = easeOut * targetPercentage
    displayTotal.value = Math.round(easeOut * totalClientes)
    
    if (progress < 1) {
      requestAnimationFrame(animate1)
    }
  }
  
  // Animar barra mensal (com delay)
  setTimeout(() => {
    const duration2 = 2000
    const startTime2 = Date.now()
    const targetMonthly = (monthlyUsed / monthlyLimit) * 100
    
    const animate2 = () => {
      const elapsed = Date.now() - startTime2
      const progress = Math.min(elapsed / duration2, 1)
      const easeOut = 1 - Math.pow(1 - progress, 3)
      
      monthlyPercentage.value = easeOut * targetMonthly
      
      if (progress < 1) {
        requestAnimationFrame(animate2)
      }
    }
    
    animate2()
  }, 800)
  
  animate1()
}

// Iniciar animação quando o componente for montado
onMounted(() => {
  setTimeout(() => {
    animateProgress()
  }, 300)
})
</script>
