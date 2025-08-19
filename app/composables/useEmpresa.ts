export function useEmpresa() {
  // Estado global para o nome da empresa
  const nomeEmpresa = useState<string | null>('empresa_nome', () => null)
  const isLoadingEmpresa = useState<boolean>('empresa_loading', () => false)

  // Busca o nome da empresa do usuário logado
  async function buscarNomeEmpresa() {
    // Só executa no cliente
    if (!process.client) {
      return
    }

    const supabase = useSupabaseClient()
    const { user } = useAuth()

    if (!user.value?.id) {
      console.log('[useEmpresa] Usuário não logado')
      nomeEmpresa.value = null
      return
    }

    try {
      isLoadingEmpresa.value = true
      console.log('[useEmpresa] Buscando empresa para usuário:', user.value.id)
      
      const { data, error } = await supabase
        .from('empresas')
        .select('nome')
        .eq('usuario_id', user.value.id)
        .single()

      if (error) {
        console.error('[useEmpresa] Erro ao buscar empresa:', error)
        nomeEmpresa.value = null
        return
      }

      console.log('[useEmpresa] Empresa encontrada:', data?.nome)
      nomeEmpresa.value = data?.nome || null
    } catch (err) {
      console.error('[useEmpresa] Erro ao buscar empresa:', err)
      nomeEmpresa.value = null
    } finally {
      isLoadingEmpresa.value = false
    }
  }

  // Força atualização do nome da empresa
  async function atualizarNomeEmpresa() {
    console.log('[useEmpresa] Forçando atualização do nome da empresa')
    await buscarNomeEmpresa()
  }

  return {
    nomeEmpresa: readonly(nomeEmpresa),
    isLoadingEmpresa: readonly(isLoadingEmpresa),
    buscarNomeEmpresa,
    atualizarNomeEmpresa
  }
}
