import { serverSupabaseClient } from '#supabase/server'
import type { Database } from '~/types/supabase'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<Database>(event)
  const { todoId } = getRouterParams(event)

  const { error } = await client.rpc('toggle_is_complete', { todo_id: Number.parseInt(todoId, 10) })

  if (error) {
    throw createError({
      statusCode: 500,
    })
  }
  else {
    setResponseStatus(event, 204)
  }
})
