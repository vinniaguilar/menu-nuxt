import { supabase } from '~/utils/supabase'

export default defineEventHandler(async (event) => {
  console.log('GET USERS')

  const { data, error } = await supabase.from('users').select('*')
  if (error) {
    console.error('Error fetching users:', error)
    return { error: 'Falha ao buscar usuários' }
  }
  return { data }
})
