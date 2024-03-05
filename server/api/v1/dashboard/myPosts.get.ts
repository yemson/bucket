import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'
import type { Database } from '~/types/supabase'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<Database>(event)
  const user = await serverSupabaseUser(event)

  if (!user)
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })

  const { data, error } = await client
    .from('posts')
    .select('*')
    .eq('user_id', user.id)
    .select('id, title, is_public, profiles (email, nickname)')
    .order('created_at', { ascending: false })
    .limit(10)

  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message,
    })
  }
  else { return data }
})
