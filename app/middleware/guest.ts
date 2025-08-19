export default defineNuxtRouteMiddleware(async (to, from) => {
  // No servidor, não precisa verificar autenticação detalhada
  if (process.server) {
    return
  }
  
  try {
    // Verificar primeiro se há email salvo no localStorage
    const savedEmail = localStorage.getItem('user_email')
    
    console.log('Guest middleware - Verificação localStorage:', { 
      hasSavedEmail: !!savedEmail,
      savedEmail 
    })
    
    // Se não há email salvo, permite acesso à página de login
    if (!savedEmail) {
      console.log('Guest middleware: Sem email salvo, permitindo acesso ao login')
      return
    }
    
    const { isAuthenticated, user, isLoading } = useAuth()
    
    console.log('Guest middleware - Estado auth:', { 
      isAuthenticated: isAuthenticated.value, 
      hasUser: !!user.value,
      isLoading: isLoading.value,
      email: user.value?.email 
    })
    
    // Aguarda apenas um curto período se ainda estiver carregando
    if (isLoading.value) {
      await new Promise(resolve => setTimeout(resolve, 500))
    }
    
    console.log('Guest middleware - Após loading:', { 
      isAuthenticated: isAuthenticated.value, 
      hasUser: !!user.value,
      isLoading: isLoading.value,
      email: user.value?.email 
    })
    
    // Se já está autenticado OU tem email salvo, redireciona para a página principal
    if ((isAuthenticated.value && user.value) || savedEmail) {
      console.log('Guest middleware: Redirecionando para /')
      return navigateTo('/')
    }
  } catch (error) {
    // Se houver erro na inicialização, permite acesso à página de login
    console.error('Erro no middleware guest:', error)
    // Não redireciona, permite que o usuário veja a página de login
  }
})
