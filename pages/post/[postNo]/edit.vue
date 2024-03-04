<script setup lang="ts">
import type { Post } from '~/types/common'

definePageMeta({
  layout: false,
  middleware: 'check-edit',
})

const colorMode = useColorMode()
const route = useRoute()

const isEditPostLoading = ref(false)
const post = ref<Post>()

const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  },
})

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

async function editPost() {
  if (!post.value || !post.value.title || !post.value.post_json)
    return

  try {
    isEditPostLoading.value = true
    const postObject = {
      title: post.value.title,
      post_json: post.value.post_json,
    }

    await $fetch(`/api/v1/post/${route.params.postNo}`, {
      // @ts-expect-error: patch method 있는데 왜 자꾸 없다고 함?
      method: 'PATCH',
      body: {
        title: postObject.title,
        post_json: postObject.post_json,
      },
    })
  }
  catch (e) {
    console.error(e)
  }
  finally {
    isEditPostLoading.value = false
    navigateTo(`/post/${route.params.postNo}`)
  }
}

onMounted(() => {
  getPost()
})
</script>

<template>
  <header class="py-2 font-bold flex justify-between">
    <NuxtLink
      to="/"
      class="self-center"
    >
      노트잇!
    </NuxtLink>
    <div class="flex gap-2">
      <ClientOnly>
        <UButton
          :icon="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'"
          color="gray"
          variant="ghost"
          aria-label="테마 변경"
          @click="isDark = !isDark"
        />
        <template #fallback>
          <USkeleton class="w-8 h-8" />
        </template>
      </ClientOnly>
      <UButton
        v-if="post"
        label="출간"
        icon="i-heroicons-document-text-20-solid"
        variant="soft"
        aria-label="출간하기"
        :disabled="!post.title || !post.post_json"
        :loading="isEditPostLoading"
        @click="editPost"
      />
    </div>
  </header>

  <ClientOnly>
    <div
      v-if="post"
      class="border border-gray-200 dark:border-gray-800 rounded-md"
    >
      <UInput
        v-model="post.title"
        padded
        placeholder="제목을 입력하세요"
        variant="none"
        class="w-full px-1.5 py-3"
        size="xl"
        required
      />
      <UDivider
        class="px-5"
      />
      <Tiptap
        v-model="post.post_json"
        class="h-[calc(100dvh-160px)] mb-3 overflow-auto"
      />
    </div>
    <template #fallback>
      <p>에디터 불러오는 중...</p>
    </template>
  </ClientOnly>
</template>
