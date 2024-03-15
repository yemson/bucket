<script setup lang="ts">
import type { SimplePost } from '~/types/common'

useHead({
  title: '노트잇',
  meta: [
    {
      name: 'description',
      content: '일상의 이야기를 기록하고 공유해보세요!',
    },
  ],
})

const user = useSupabaseUser()

const { data: recentPosts, pending: recentPostsPending } = await useFetch('/api/v1/dashboard/post/recent')
const { data: myPosts, pending: myPostsPending } = await useFetch('/api/v1/dashboard/post/my')
</script>

<template>
  <div
    class="flex justify-between mt-6 mb-10"
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
    v-if="user"
    v-model:loading="myPostsPending"
    visible-public-icon
    title="나의 노트"
    to="/post/list/my"
    :posts="myPosts as SimplePost[]"
  />
  <SectionFlicking
    v-model:loading="recentPostsPending"
    title="새로운 노트"
    to="/post/list/recent"
    class="mt-8"
    :posts="recentPosts as SimplePost[]"
  />
</template>
