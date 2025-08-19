import type { Session, User } from '@supabase/supabase-js'
import { translateError } from '~/utils/errorTranslations'

export function useAuth() {
  let supabase: ReturnType<typeof useSupabaseClient>
  
  try {
    supabase = useSupabaseClient()
  } catch (error) {
    console.error('Erro ao inicializar Supabase:', error)
    // Return early with empty/error state if Supabase is not available
    const errorMessage = useState<string | null>('auth_error', () => null)
    return {
      user: useState<User | null>('auth_user', () => null),
      session: useState<Session | null>('auth_session', () => null),
      isAuthenticated: computed(() => false),
      isLoading: useState<boolean>('auth_loading', () => false),
      errorMessage,
      signInWithEmailAndPassword: async () => { 
        const translatedError = translateError('Service unavailable')
        errorMessage.value = translatedError
        throw new Error('Supabase não disponível') 
      },
      signUp: async () => {
        const translatedError = translateError('Service unavailable')
        errorMessage.value = translatedError
        throw new Error('Supabase não disponível')
      },
      signOut: async () => { 
        console.error('Tentativa de logout sem Supabase inicializado')
      },
      reloadSession: async () => { 
        console.error('Tentativa de recarregar sessão sem Supabase inicializado')
      },
    }
  }

  // Usar estados globais que são inicializados pelo plugin
  const user = useState<User | null>('auth_user', () => null)
  const session = useState<Session | null>('auth_session', () => null)
  const isLoading = useState<boolean>('auth_loading', () => false)
  const errorMessage = useState<string | null>('auth_error', () => null)

  async function loadSession() {
    try {
      isLoading.value = true
      const { data, error } = await supabase.auth.getSession()
      if (error) {
        errorMessage.value = error.message
        session.value = null
        user.value = null
        return
      }
      session.value = data.session
      user.value = data.session?.user ?? null
    } catch (error) {
      console.error('Erro ao carregar sessão:', error)
      session.value = null
      user.value = null
    } finally {
      isLoading.value = false
    }
  }

  const isAuthenticated = computed(() => {
    // Força reatividade verificando ambos os valores
    const hasUser = Boolean(user.value)
    const hasSession = Boolean(session.value)
    return hasUser && hasSession
  })

  async function signInWithEmailAndPassword(email: string, password: string) {
    errorMessage.value = null
    isLoading.value = true
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      if (error) throw error
      
      // Atualizar estado local imediatamente
      if (data.session && data.user) {
        console.log('useAuth: Atualizando estado local após login')
        user.value = data.user
        session.value = data.session
        console.log('useAuth: Estado local atualizado:', { 
          hasUser: !!user.value, 
          hasSession: !!session.value,
          email: user.value?.email 
        })
      }
      
      return data
    } catch (err: any) {
      const translatedError = translateError(err?.message ?? 'Erro ao autenticar')
      errorMessage.value = translatedError
      throw err
    } finally {
      isLoading.value = false
    }
  }

  async function signUp(userData: {
    name: string
    companyName: string
    email: string
    password: string
  }) {
    errorMessage.value = null
    isLoading.value = true
    try {
      // 1. Criar usuário no Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password
      })

      if (authError) throw authError

      if (!authData.user) {
        throw new Error('Falha ao criar usuário')
      }

      // 2. Inserir na tabela usuarios
      const { data: userRecord, error: userError } = await supabase
        .from('usuarios')
        .insert({
          id: authData.user.id, // Usar o mesmo ID do auth
          nome: userData.name,
          email: userData.email,
          perfil: 'admin' // O primeiro usuário da empresa é admin
        })
        .select()
        .single()

      if (userError) throw userError

      // 3. Inserir na tabela empresas
      const { error: companyError } = await supabase
        .from('empresas')
        .insert({
          usuario_id: authData.user.id,
          nome: userData.companyName,
          hora_abertura: '08:00:00', // Horário padrão
          hora_fechamento: '18:00:00' // Horário padrão
        })

      if (companyError) throw companyError

      return authData
    } catch (err: any) {
      const translatedError = translateError(err?.message ?? 'Erro ao criar conta')
      errorMessage.value = translatedError
      throw err
    } finally {
      isLoading.value = false
    }
  }

  async function signOut() {
    errorMessage.value = null
    isLoading.value = true
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      
      // Limpar estado local
      user.value = null
      session.value = null
    } catch (err: any) {
      errorMessage.value = err?.message ?? 'Erro ao sair'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  return {
    // state
    user,
    session,
    isAuthenticated,
    isLoading,
    errorMessage,

    // actions
    signInWithEmailAndPassword,
    signUp,
    signOut,

    // helpers
    reloadSession: loadSession,
  }
}


