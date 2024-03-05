interface CheckData {
  data: {
    user_id: string
    is_public: boolean
  }
}

export default defineNuxtRouteMiddleware(async (_from) => {
  const user = useSupabaseUser()

  const data = await $fetch<CheckData>(`/api/v1/post/${_from.params.postNo}/check`, {
    method: 'GET',
  })

  if (!data)
    return abortNavigation()

  if (user.value?.id !== data.data.user_id)
    return abortNavigation()
})
