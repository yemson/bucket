export default defineNuxtRouteMiddleware(async (_from) => {
  const user = useSupabaseUser()
  const result = await $fetch('/api/v1/post/check', {
    query: {
      postNo: _from.params.postNo,
    },
  })

  if (!result)
    return abortNavigation()

  if (user.value?.id !== result.user_id)
    return abortNavigation()
})
