import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'
import type { Database } from '~/types/supabase'

interface Query {
  pageNo: number
  pageSize: number
}

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<Database>(event)
  const user = await serverSupabaseUser(event)

  const query: Query = getQuery(event)

  let startPage, endPage
  if (query.pageNo && query.pageSize) {
    startPage = (query.pageNo - 1) * 10
    endPage = (query.pageSize * query.pageNo) - 1
  }
  else {
    startPage = 0
    endPage = 9
  }

  const { data, count, error } = await client
    .from('todos')
    .select('*', { count: 'exact' })
    .eq('uid', user!.id)
    .order('created_at', { ascending: false })
    .range(startPage, endPage)

  if (error) {
    throw createError({
      statusCode: 500,
    })
  }
  else {
    return {
      todoList: data,
      totalCount: count,
    }
  }
})
