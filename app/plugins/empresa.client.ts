export default defineNuxtPlugin(async () => {
  // Só executa no cliente
  if (process.client) {
    console.log('[Empresa Plugin] Inicializando...')
    
    // Aguarda o plugin de auth terminar
    await new Promise(resolve => setTimeout(resolve, 500))
    
    try {
      const { buscarNomeEmpresa } = useEmpresa()
      
      // Busca nome da empresa quando o plugin carrega
      await buscarNomeEmpresa()
      
      // Listener para recarregar dados quando a página ganha foco
      const handleFocus = async () => {
        console.log('[Empresa Plugin] Página ganhou foco - atualizando dados da empresa')
        await buscarNomeEmpresa()
      }
      
      // Listener para recarregar dados quando a página fica visível
      const handleVisibilityChange = async () => {
        if (!document.hidden) {
          console.log('[Empresa Plugin] Página visível - atualizando dados da empresa')
          await buscarNomeEmpresa()
        }
      }
      
      // Adicionar listeners
      window.addEventListener('focus', handleFocus)
      document.addEventListener('visibilitychange', handleVisibilityChange)
      
      // Cleanup quando a página for fechada
      const cleanup = () => {
        window.removeEventListener('focus', handleFocus)
        document.removeEventListener('visibilitychange', handleVisibilityChange)
      }
      
      // Registrar cleanup
      if (typeof window !== 'undefined') {
        window.addEventListener('beforeunload', cleanup)
      }
      
      console.log('[Empresa Plugin] Configurado com sucesso')
      
    } catch (error) {
      console.error('[Empresa Plugin] Erro ao inicializar:', error)
    }
  }
})
