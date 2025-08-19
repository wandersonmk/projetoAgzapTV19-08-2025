<template>
  <div class="max-w-7xl mx-auto">
    <!-- Cards de métricas -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <!-- Card Clientes Hoje -->
        <div class="relative bg-gradient-to-br from-card via-blue-950/10 to-card text-card-foreground rounded-lg border border-blue-800/20 shadow-sm hover:shadow-md hover:shadow-blue-500/10 transition-all duration-300 p-6 group overflow-hidden">
          <!-- Efeito de brilho sutil -->
          <div class="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div class="relative z-10 flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-400 mb-1">Clientes Hoje</p>
              <p class="text-2xl font-bold text-foreground">{{ metrics.clientesHoje }}</p>
              <p class="text-xs text-green-600 mt-1">+12% desde ontem</p>
            </div>
            <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/>
              </svg>
            </div>
          </div>
        </div>

        <!-- Card Clientes Novos -->
        <div class="relative bg-gradient-to-br from-card via-emerald-950/10 to-card text-card-foreground rounded-lg border border-emerald-800/20 shadow-sm hover:shadow-md hover:shadow-emerald-500/10 transition-all duration-300 p-6 group overflow-hidden">
          <!-- Efeito de brilho sutil -->
          <div class="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div class="relative z-10 flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-400 mb-1">Clientes Novos</p>
              <p class="text-2xl font-bold text-foreground">{{ metrics.clientesNovos }}</p>
              <p class="text-xs text-green-600 mt-1">+5% esta semana</p>
            </div>
            <div class="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-lg">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/>
              </svg>
            </div>
          </div>
        </div>

        <!-- Card Clientes Vencendo -->
        <div class="relative bg-gradient-to-br from-card via-amber-950/10 to-card text-card-foreground rounded-lg border border-amber-800/20 shadow-sm hover:shadow-md hover:shadow-amber-500/10 transition-all duration-300 p-6 group overflow-hidden">
          <!-- Efeito de brilho sutil -->
          <div class="absolute inset-0 bg-gradient-to-r from-transparent via-amber-500/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div class="relative z-10 flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-400 mb-1">Clientes Vencendo</p>
              <p class="text-2xl font-bold text-foreground">{{ metrics.clientesVencendo }}</p>
              <p class="text-xs text-yellow-600 mt-1">próximos 5 dias</p>
            </div>
            <div class="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center shadow-lg">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
          </div>
        </div>

        <!-- Card Faturamento -->
        <div class="relative bg-gradient-to-br from-card via-purple-950/10 to-card text-card-foreground rounded-lg border border-purple-800/20 shadow-sm hover:shadow-md hover:shadow-purple-500/10 transition-all duration-300 p-6 group overflow-hidden">
          <!-- Efeito de brilho sutil -->
          <div class="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div class="relative z-10 flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-400 mb-1">Faturamento</p>
              <p class="text-2xl font-bold text-foreground">R$ {{ metrics.faturamento.toLocaleString('pt-BR') }}</p>
              <p class="text-xs text-green-600 mt-1">+18% este mês</p>
            </div>
            <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

    <!-- Gráficos -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Gráfico de Performance Circular -->
      <CircularProgress />

      <!-- Gráfico de Vendas Mensais -->
      <div class="bg-card text-card-foreground rounded-lg border border-border shadow-sm p-6">
        <h3 class="text-lg font-semibold text-foreground mb-4">Vendas dos Últimos Meses</h3>
        <div class="relative h-64">
          <canvas ref="lineChartRef"></canvas>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

// Refs para os canvas dos gráficos
const lineChartRef = ref<HTMLCanvasElement | null>(null)

// Dados de exemplo para as métricas
const metrics = ref({
  clientesHoje: 24,
  clientesNovos: 8,
  clientesVencendo: 12,
  faturamento: 3250
})


// Configuração do gráfico de linha
const createLineChart = () => {
  if (!lineChartRef.value) return

  const ctx = lineChartRef.value.getContext('2d')
  if (!ctx) return

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
      datasets: [{
        label: 'Vendas (R$)',
        data: [2100, 2400, 1800, 2800, 3200, 3250],
        borderColor: '#10B981', // Verde vibrante para crescimento
        backgroundColor: 'rgba(16, 185, 129, 0.1)', // Verde com transparência
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#10B981',
        pointBorderColor: '#FFFFFF',
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7,
        pointHoverBackgroundColor: '#059669',
        pointHoverBorderColor: '#FFFFFF'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            color: '#F3F4F6',
            font: {
              size: 12,
              weight: '500'
            }
          }
        },
        tooltip: {
          backgroundColor: '#1F2937',
          titleColor: '#F3F4F6',
          bodyColor: '#F3F4F6',
          borderColor: '#374151',
          borderWidth: 1,
          callbacks: {
            label: function(context) {
              return 'Vendas: R$ ' + context.parsed.y.toLocaleString('pt-BR')
            }
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: '#9CA3AF',
            font: {
              size: 11
            }
          },
          grid: {
            color: '#374151',
            borderColor: '#4B5563'
          }
        },
        y: {
          ticks: {
            color: '#9CA3AF',
            font: {
              size: 11
            },
            callback: function(value) {
              return 'R$ ' + (value / 1000).toFixed(0) + 'k'
            }
          },
          grid: {
            color: '#374151',
            borderColor: '#4B5563'
          }
        }
      }
    }
  })
}

// Inicializar gráficos quando o componente for montado
onMounted(() => {
  nextTick(() => {
    createLineChart()
  })
})
</script>

