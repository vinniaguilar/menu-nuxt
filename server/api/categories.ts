// server/api/restaurante/index.ts

import { supabase } from '~/utils/supabase'

const get = async (event) => {
  const query = getQuery(event)
  const { restaurant_id } = query

  try {
    const { data } = await supabase
      .from('cardapio_categories')
      .select()
      .eq('restaurant_id', Number(restaurant_id))

    return data
  } catch (err) {
    console.error(err)
    return createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      data: err
    })
  }
}

const post = async (event) => {
  const body = await readBody(event)
  const { name, restaurant_id } = body

  try {
    const { data, error } = await supabase
      .from('cardapio_categories')
      .insert([
        {
          name,
          restaurant_id
        }
      ])
      .select()
      .single()

    if (error) {
      return createError({
        statusCode: 400,
        statusMessage: 'Bad Request',
        data: error
      })
    }

    return data
  } catch (err) {
    console.error(err)
    return createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      data: err
    })
  }
}

const put = async (event) => {
  const body = await readBody(event)
  const { id, name } = body

  try {
    const { data, error } = await supabase
      .from('cardapio_categories')
      .update({
        name
      })
      .eq('id', Number(id))
      .select()
      .single()

    if (error) {
      return createError({
        statusCode: 400,
        statusMessage: 'Bad Request',
        data: error
      })
    }

    return data
  } catch (err) {
    console.error(err)
    return createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      data: err
    })
  }
}

export default defineEventHandler(async (event) => {
  const method = getMethod(event)

  if (method === 'GET') {
    return await get(event)
  }

  if (method === 'POST') {
    return await post(event)
  }

  if (method === 'PUT') {
    return await put(event)
  }
})
