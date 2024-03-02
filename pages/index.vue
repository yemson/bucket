<script setup lang="ts">
import type { Post } from '~/types/common'

const recentPosts = ref<Post[]>([])
async function getRecentPosts() {
  try {
    const result = await $fetch(`/api/v1/post/recent`, {
      method: 'GET',
    })

    recentPosts.value = result.data as Post[]
  }
  catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  getRecentPosts()
})
</script>

<template>
  <h1 class="text-xl font-semibold my-4">
    새로운 노트
  </h1>
  <SectionFlicking
    :posts="recentPosts"
  />
</template>
