import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)

  const body = await readBody(event)

  const { error } = await client
    .from('todos')
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
