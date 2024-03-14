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

  const { error: likesError } = await client
    .from('likes')
    .delete()
    .eq('post_id', query.postNo)

  if (likesError) {
    throw createError({
      statusCode: 500,
      statusMessage: likesError.message,
    })
  }

  const { error: postsError } = await client
    .from('posts')
    .delete()
    .eq('id', query.postNo)

  if (postsError) {
    throw createError({
      statusCode: 500,
      statusMessage: postsError.message,
    })
  }
  else {
    setResponseStatus(event, 204)
  }
})
