import { serverSupabaseClient } from '#supabase/server'
import type { Database } from '~/types/supabase'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<Database>(event)

  const { postNo } = getRouterParams(event)

  const { data, error } = await client
    .from('posts')
    .select('*, profiles (email, nickname)')
    .eq('id', postNo)
    .single()

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
