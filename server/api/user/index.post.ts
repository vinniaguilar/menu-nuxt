import { supabase } from '~/utils/supabase'

export default defineEventHandler(async (event) => {
  console.log('POST USERS')
  const body = await readBody(event)
  const { email } = body

  const { error } = await supabase.from('users').insert([{ email }])
  if (error) {
    console.error('Error inserting user:', error)
    return { error: 'Falha ao inserir usuário' }
  }

  const { data, error: fetchError } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single()

  if (fetchError) {
    console.error('Error fetching user:', fetchError)
    return { error: 'Falha ao buscar usuário' }
  }

  console.log('User inserted:', data)
  return { data }
})
