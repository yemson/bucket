import { serverSupabaseClient } from '#supabase/server'
import type { Database } from '~/types/supabase'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<Database>(event)
  const body = await readBody(event)
  const { postNo } = getRouterParams(event)

  const { error } = await client
    .from('posts')
    .update({
      title: body.title,
      post_json: body.post_json,
      updated_at: new Date().toISOString(),
    })
    .eq('id', postNo)

  if (error) {
    throw createError({
      statusCode: 500,
    })
  }

  setResponseStatus(event, 204)
})
