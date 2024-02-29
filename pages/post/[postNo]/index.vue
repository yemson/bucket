<script setup lang="ts">
import type { Content } from '@tiptap/core'

const route = useRoute()
const { data } = useFetch(`/api/v1/post/${route.params.postNo}`)

const content: Content = computed(() => {
  return data.value?.data.post_json
})
</script>

<template>
  <ClientOnly>
    <Tiptap
      v-model="content"
      :read-only="true"
    />
  </ClientOnly>
</template>
