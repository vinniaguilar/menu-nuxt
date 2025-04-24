import { supabase } from '~/utils/supabase'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { name, description } = body

  try {
    const { data, error } = await supabase
      .from('cardapio_restaurants')
      .insert([
        {
          name,
          description
        }
      ])
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
