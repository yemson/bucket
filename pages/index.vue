<script setup lang="ts">
import type { Post } from '~/types/common'

const user = useSupabaseUser()
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
  <div
    class="flex flex-wrap justify-between mt-6 mb-10"
  >
    <div
      class="flex flex-col justify-between h-40 md:h-52"
    >
      <div>
        <h1
          v-if="user"
          class="text-2xl md:text-4xl font-semibold"
        >
          안녕하세요! {{ user?.user_metadata.nickname }}님!
        </h1>
        <h1
          v-else
          class="text-2xl md:text-4xl font-semibold"
        >
          안녕하세요! 노트잇에 오신 것을 환영합니다!
        </h1>
        <h2
          v-if="user"
          class="text-lg md:text-2xl mt-2 md:mt-4"
        >
          오늘은 어떤 이야기를 들려주실 건가요?
        </h2>
        <h2
          v-else
          class="text-lg md:text-2xl mt-2 md:mt-4"
        >
          로그인하고 당신의 이야기를 들려주세요!
        </h2>
      </div>
      <UButton
        :label="user ? '글쓰러가기' : '로그인하기'"
        color="primary"
        class="w-fit"
        icon="i-heroicons-arrow-right"
        trailing
        variant="soft"
        @click="user ? navigateTo('/post/create') : navigateTo('/member/login')"
      />
    </div>
  </div>
  <SectionFlicking
    v-model:loading="isGetRecentPostsLoading"
    title="새로운 노트"
    :posts="recentPosts"
  />
</template>
