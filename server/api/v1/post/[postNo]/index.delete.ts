import { serverSupabaseClient } from '#supabase/server'
import type { Database } from '~/types/supabase'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<Database>(event)
  const { postNo } = getRouterParams(event)

  const { error } = await client
    .from('posts')
    .delete()
    .eq('id', postNo)

  if (error) {
    throw createError({
      statusCode: 500,
    })
  }

  setResponseStatus(event, 204)
})
