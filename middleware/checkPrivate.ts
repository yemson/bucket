interface CheckData {
  data: {
    user_id: string
    is_private: boolean
  }
}

export default defineNuxtRouteMiddleware(async (_from) => {
  const data = await $fetch<CheckData>(`/api/v1/post/${_from.params.postNo}/check`, {
    method: 'GET',
  })

  if (!data)
    return abortNavigation()

  if (data.data.is_private)
    return abortNavigation()
})
