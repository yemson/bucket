import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'
import type { Database } from '~/types/supabase'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<Database>(event)
  const user = await serverSupabaseUser(event)
  const body = await readBody(event)

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    })
  }

  if (!body.postNo || typeof body.postNo !== 'number') {
    throw createError({
      statusCode: 400,
      statusMessage: 'postNo is required or invalid type',
    })
  }

  if (!body.postUserId || typeof body.postUserId !== 'string') {
    throw createError({
      statusCode: 400,
      statusMessage: 'postUserId is required or invalid type',
    })
  }

  const { data, error } = await client
    .from('likes')
    .select('*')
    .eq('post_id', body.postNo)
    .eq('user_id', user.id)

  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message,
    })
  }

  const likes = data.map(like => like.user_id)

  if (likes.includes(user.id)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Already liked',
    })
  }
  else {
    const { error } = await client
      .from('likes')
      .insert({
        post_id: body.postNo,
        post_user_id: body.postUserId,
      })

    if (error) {
      throw createError({
        statusCode: 500,
      })
    }
    else {
      setResponseStatus(event, 201)
    }
  }
})
