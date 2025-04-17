// server/api/restaurante/index.ts

import { supabase } from '~/utils/supabase'

const get = async (event) => {
  const query = getQuery(event)
  const { category_id, restaurant_id } = query

  try {
    const { data } = await supabase
      .from('cardapio_dishes')
      .select()
      .eq('restaurant_id', Number(restaurant_id))
      .eq('category_id', Number(category_id))

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
  const { name, description, price, category_id, restaurant_id } = body

  try {
    const { data, error } = await supabase
      .from('cardapio_dishes')
      .insert([
        {
          name,
          description,
          price,
          category_id,
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
      .from('cardapio_dishes')
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
