import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'
import type { Database } from '~/types/supabase'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<Database>(event)
  const user = await serverSupabaseUser(event)
  const body = await readBody(event)
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

  const { error } = await client
    .from('posts')
    .update({
      title: body.title,
      description: body.description,
      post_json: body.post_json,
      is_public: body.is_public,
      updated_at: new Date().toISOString(),
    })
    .eq('id', query.postNo)

  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message,
    })
  }
  else {
    setResponseStatus(event, 204)
  }
})
