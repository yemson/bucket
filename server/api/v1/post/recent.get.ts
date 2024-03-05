import { serverSupabaseClient } from '#supabase/server'
import type { Database } from '~/types/supabase'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<Database>(event)

  const { data, error } = await client
    .from('posts')
    .select('*')
    .eq('is_public', true)
    .select('id, title, profiles (email, nickname)')
    .order('created_at', { ascending: false })
    .limit(10)

  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message,
    })
  }
  else {
    return data
  }
})
