import { ref } from 'vue'
import useSupabase from 'src/boot/supabase'
const user = ref(null)
export default function useAuthUser () {
  const { supabase } = useSupabase()

  const login = async (data) => {
    const { user, error } = await supabase.auth.signInWithPassword({ email: data.email, password: data.password })
    if (error) throw error
    return user
  }

  const loginWithSocialProvider = async (provider) => {
    const { user, error } = await supabase.auth.signInWithIdToken({ provider })
    if (error) throw error
    return user
  }

  const logout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  }

  const isLoggedIn = () => {
    return !!user.value
  }

  const register = async (dataa) => {
    const { user, error } = await supabase.auth.signUp(
      {
        email: dataa.email,
        password: dataa.password,
        options: {
          data: {
            firstNames: dataa.firstNames,
            lastName: dataa.lastName
          },
          emailRedirectTo: `${window.location.origin}/me?fromEmail=registrationConfirmation`
        }
      }
    )
    if (error) throw error
    return user
  }

  const update = async (data) => {
    const { user, error } = await supabase.auth.update(data)
    if (error) throw error
    return user
  }

  const sendPasswordRestEmail = async (email) => { // Rever aula 'Vue 3 Quasar Supabase - 05 Resetando Senha'
    console.log(email)
    const { user, error } = await supabase.auth.resetPasswordForEmail(email)
    if (error) throw error
    return user
  }

  return {
    user,
    login,
    loginWithSocialProvider,
    logout,
    isLoggedIn,
    register,
    update,
    sendPasswordRestEmail
  }
}
