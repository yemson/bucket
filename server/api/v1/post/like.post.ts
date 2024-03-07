import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'
import type { Database } from '~/types/supabase'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<Database>(event)
  const user = await serverSupabaseUser(event)
  const query = getQuery(event)

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    })
  }

  if (!query.postNo) {
    throw createError({
      statusCode: 400,
      statusMessage: 'postNo is required',
    })
  }

  const { data, error } = await client
    .from('likes')
    .select('*')
    .eq('post_id', +query.postNo)
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
        post_id: +query.postNo,
      })

    if (error) {
      throw createError({
        statusCode: 500,
      })
    }
    setResponseStatus(event, 201)
  }
})
