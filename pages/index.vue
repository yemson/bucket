<script setup lang="ts">
import type { Post } from '~/types/common'

const recentPosts = ref<Post[]>([])
const isGetRecentPostsLoading = ref(false)

async function getRecentPosts() {
  try {
    isGetRecentPostsLoading.value = true
    const result = await $fetch(`/api/v1/post/recent`, {
      method: 'GET',
    })

    recentPosts.value = result.data as Post[]
  }
  catch (error) {
    console.error(error)
  }
  finally {
    isGetRecentPostsLoading.value = false
  }
}

onMounted(() => {
  getRecentPosts()
})
</script>

<template>
  <SectionFlicking
    v-model:loading="isGetRecentPostsLoading"
    title="새로운 노트"
    :posts="recentPosts"
  />
</template>
