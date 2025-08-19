export default defineNuxtPlugin(async () => {
  if (process.client) {
    console.log('🏢 Plugin Empresa: Iniciando busca simples...')
    
    // Aguarda 2 segundos para garantir que tudo carregou
    setTimeout(async () => {
      const { buscarNomeEmpresa } = useEmpresa()
      await buscarNomeEmpresa()
      console.log('🏢 Plugin Empresa: Busca concluída')
    }, 2000)
  }
})
