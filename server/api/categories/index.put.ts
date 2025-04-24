import { supabase } from '~/utils/supabase'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { id, name } = body

  try {
    const { data, error } = await supabase
      .from('cardapio_categories')
      .update({
        name
      })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Bad Request',
        data: error
      })
    }

    return { data }
  } catch (err) {
    console.error(err)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      data: err
    })
  }
})
