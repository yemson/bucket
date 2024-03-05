export default defineNuxtRouteMiddleware(async (_from) => {
  const user = useSupabaseUser()
  const { data } = await useFetch('/api/v1/post/check', {
    query: {
      postNo: _from.params.postNo,
    },
  })

  if (!data.value)
    return abortNavigation()

  if (user.value?.id !== data.value.user_id)
    return abortNavigation()
})
