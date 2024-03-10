import { serverSupabaseClient } from '#supabase/server'
import type { Database } from '~/types/supabase'

interface Query {
  pageNo: number
  pageSize: number
}

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<Database>(event)
  const query: Query = getQuery(event)

  let startPage, endPage
  if (query.pageNo && query.pageSize) {
    startPage = (query.pageNo - 1) * 12
    endPage = (query.pageSize * query.pageNo) - 1
  }
  else {
    startPage = 0
    endPage = 11
  }

  const { data, error, count } = await client
    .from('posts')
    .select('*', { count: 'exact' })
    .eq('is_public', true)
    .select('id, title, profiles (email, nickname)')
    .order('created_at', { ascending: false })
    .range(startPage, endPage)

  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message,
    })
  }
  else {
    return {
      data,
      total_count: count,
    }
  }
})
