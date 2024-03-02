<script setup lang="ts">
import type { Post } from '~/types/common'

const dayjs = useDayjs()
const route = useRoute()
const post = ref<Post>()

async function getPost() {
  try {
    const result = await $fetch(`/api/v1/post/${route.params.postNo}`, {
      method: 'GET',
    })

    post.value = result.data as Post
  }
  catch (error) {
    console.error(error)
  }
}

const content = computed(() => {
  return post.value?.post_json
})

onMounted(() => {
  getPost()
})
</script>

<template>
  <div v-if="post">
    <div class="flex justify-between mt-2">
      <button
        class=" flex gap-1 text-primary-500 hover:underline hover:underline-offset-4 hover:decoration-1"
        @click="$router.back"
      >
        <UIcon
          class="self-center"
          name="i-heroicons-arrow-left"
        />
        <span>뒤로가기</span>
      </button>
      <div class="flex">
        <UAvatar
          class="self-center mr-1.5"
          :src="`https://source.boringavatars.com/beam/120/${post.profiles.email}?colors=264653,2a9d8f,e9c46a,f4a261,e76f51`"
          alt="Profile Image"
          size="2xs"
        />
        <p class="text-sm text-gray-500 self-center">
          {{ post.profiles.nickname }}
        </p>
        <div class="text-primary-500 mx-1.5">
          /
        </div>
        <div
          class="self-center text-gray-400 text-sm"
        >
          {{ dayjs(post.created_at).format('YYYY-MM-DD') }}
        </div>
      </div>
    </div>
    <div
      class="mt-4"
    >
      <h1 class="text-2xl font-semibold">
        {{ post.title }}
      </h1>
      <UDivider
        class="my-4"
      />
    </div>
  </div>
  <ClientOnly>
    <Tiptap
      v-if="content"
      v-model="content"
      :read-only="true"
    />
  </ClientOnly>
</template>
