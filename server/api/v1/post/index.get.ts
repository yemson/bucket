import { serverSupabaseClient } from '#supabase/server'
import type { Database } from '~/types/supabase'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<Database>(event)
  const query = getQuery(event)

  if (!query.postNo) {
    throw createError({
      statusCode: 400,
      statusMessage: 'postNo is required',
    })
  }

  const { data, error } = await client
    .from('posts')
    .select('*, profiles (email, nickname), likes (user_id)')
    .eq('id', query.postNo)
    .single()

  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message,
    })
  }
  else {
    return {
      ...data,
      likes: data.likes.map(like => like.user_id),
    }
  }
})
