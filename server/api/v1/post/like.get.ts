import { serverSupabaseClient } from '#supabase/server'
import type { Database } from '~/types/supabase'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<Database>(event)
  // const body = await readBody(event)

  const { data, error } = await client
    .from('posts')
    .select('*, profiles (email, nickname), likes (user_id)')
    .eq('id', 18)
    .single()

  if (error) {
    throw createError({
      statusCode: 500,
    })
  }
  else {
    return {
      ...data,
      likes: data.likes.map(like => like.user_id),
    }
  }
})
