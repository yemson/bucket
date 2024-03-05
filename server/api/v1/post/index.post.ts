import { serverSupabaseClient } from '#supabase/server'
import type { Database } from '~/types/supabase'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<Database>(event)
  const body = await readBody(event)

  const { error } = await client
    .from('posts')
    .insert(body)

  if (error) {
    throw createError({
      statusCode: 500,
    })
  }
  else {
    setResponseStatus(event, 201)
  }
})
