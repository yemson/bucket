<script setup lang="ts">
import type { Content } from '@tiptap/core'

definePageMeta({
  layout: false,
  middleware: 'check-edit',
})

const colorMode = useColorMode()
const route = useRoute()

const isEditPostLoading = ref(false)

const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  },
})

const { data: post } = useFetch(`/api/v1/post`, {
  query: {
    postNo: route.params.postNo,
  },
})

const content: Content = computed({
  get() {
    return post.value?.post_json
  },
  set(value) {
    if (post.value)
      post.value.post_json = value as Content
  },
})

async function editPost() {
  if (!post.value || !post.value.title || !post.value.post_json)
    return

  try {
    isEditPostLoading.value = true
    const postObject = {
      title: post.value.title,
      post_json: post.value.post_json,
      is_public: post.value.is_public,
    }

    await $fetch(`/api/v1/post/${route.params.postNo}`, {
      // @ts-expect-error: patch method 있는데 왜 자꾸 없다고 함?
      method: 'PATCH',
      body: {
        title: postObject.title,
        post_json: postObject.post_json,
        is_public: postObject.is_public,
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
</script>

<template>
  <header class="py-2 flex justify-between">
    <NuxtLink
      to="/"
      class="self-center font-bold"
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

      <UButtonGroup
        orientation="horizontal"
      >
        <UButton
          label="출간"
          icon="i-heroicons-document-text-20-solid"
          variant="soft"
          aria-label="출간하기"
          :disabled="!post?.title || !post?.post_json"
          :loading="isEditPostLoading"
          @click="editPost"
        />
        <ClientOnly>
          <UPopover>
            <UButton
              icon="i-heroicons-chevron-down-20-solid"
              variant="soft"
              aria-label="더보기"
            />
            <template #panel>
              <div
                v-if="post"
                class="flex gap-4 p-4"
              >
                <p>공개 여부</p>
                <UToggle
                  v-model="post.is_public"
                  class="self-center"
                />
              </div>
            </template>
          </UPopover>
          <template #fallback>
            <UButton
              icon="i-heroicons-chevron-down-20-solid"
              variant="soft"
              aria-label="더보기"
              disabled
            />
          </template>
        </ClientOnly>
      </UButtonGroup>
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
        v-model="content"
        class="h-[calc(100dvh-160px)] mb-3 overflow-auto"
      />
    </div>
    <template #fallback>
      <p>에디터 불러오는 중...</p>
    </template>
  </ClientOnly>
</template>
