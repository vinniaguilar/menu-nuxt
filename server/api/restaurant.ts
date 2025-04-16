// server/api/restaurante/index.ts

import { supabase } from '~/utils/supabase'

const get = async (event) => {
  const query = getQuery(event)
  const { id } = query

  try {
    const { data } = await supabase
      .from('cardapio_restaurants')
      .select()
      .eq('id', Number(id))
      .single()

    console.log('RESTAURANT GET DATA', data)

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
  const { name, description } = body

  console.log('RESTAURANT POST', body)

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
  const { id, name, description } = body

  console.log('RESTAURANT PUT', body)

  try {
    const { data, error } = await supabase
      .from('cardapio_restaurants')
      .update({
        name,
        description
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
