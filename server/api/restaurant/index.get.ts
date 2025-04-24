import { supabase } from '~/utils/supabase'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const { id } = query

  try {
    const { data, error } = await supabase
      .from('cardapio_restaurants')
      .select()
      .eq('id', Number(id))
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
