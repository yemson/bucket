import { serverSupabaseClient } from '#supabase/server'
import type { Database } from '~/types/supabase'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<Database>(event)

  const { data, error } = await client
    .from('posts')
    .select('id, title')
    .order('created_at', { ascending: false })
    .limit(10)

  if (error) {
    throw createError({
      statusCode: 500,
    })
  }
  else {
    return {
      data,
    }
  }
})
