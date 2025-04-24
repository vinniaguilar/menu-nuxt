import { supabase } from '~/utils/supabase'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const { restaurant_id } = query

  try {
    const { data, error } = await supabase
      .from('cardapio_categories')
      .select()
      .eq('restaurant_id', Number(restaurant_id))

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
