<script setup lang="ts">
import type { Content } from '@tiptap/core'
import type { Tag } from '~/types/common'

const colorMode = useColorMode()
const route = useRoute()
const isEditPostLoading = ref(false)
const isPostSettingOpen = ref(false)
const selectedTagList = ref<Tag[]>([])
const tagList = [
  {
    label: '일상',
    id: 'daily',
  },
  {
    label: '공부',
    id: 'study',
  },
  {
    label: '일',
    id: 'work',
  },
  {
    label: '취미',
    id: 'hobby',
  },
  {
    label: '기타',
    id: 'etc',
  },
]
const { data: post } = await useFetch(`/api/v1/post`, {
  query: {
    postNo: route.params.postNo,
  },
})

definePageMeta({
  layout: false,
  middleware: 'check-edit',
})

const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
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
      description: post.value.description,
      tag: selectedTagList.value.map(tag => tag.id),
    }

    await $fetch(`/api/v1/post`, {
      query: {
        postNo: route.params.postNo,
      },
      method: 'PATCH',
      body: postObject,
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
  if (post.value && post.value.tag) {
    post.value.tag.forEach((tagId) => {
      const tag = tagList.find(t => t.id === tagId)
      if (tag)
        selectedTagList.value?.push(tag)
    })
  }
})
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
      <UButton
        label="출간"
        icon="i-heroicons-document-text-20-solid"
        variant="soft"
        aria-label="출간하기"
        :disabled="!post?.title || !post?.post_json"
        :loading="isEditPostLoading"
        @click="isPostSettingOpen = true"
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
        v-model="content"
        class="h-[calc(100dvh-160px)] mb-3 overflow-auto"
      />
    </div>
    <template #fallback>
      <p>에디터 불러오는 중...</p>
    </template>
  </ClientOnly>

  <USlideover
    v-model="isPostSettingOpen"
    prevent-close
  >
    <UCard
      class="flex flex-col flex-1"
      :ui="{ body: { base: 'flex-1' }, ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }"
    >
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
            노트 출간
          </h3>
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            class="-my-1"
            @click="isPostSettingOpen = false"
          />
        </div>
      </template>
      <div
        v-if="post"
        class="flex flex-col gap-8"
      >
        <div
          class="flex items-center justify-between"
        >
          <p class="text-sm">
            공개 여부
          </p>
          <UToggle
            v-model="post.is_public"
          />
        </div>
        <div class="flex flex-col gap-2">
          <p class="text-sm">
            노트 설명
          </p>
          <UTextarea
            v-model="post.description"
            placeholder="노트에 대한 설명을 입력하세요."
            icon="i-heroicons-envelope"
            size="lg"
            autoresize
          />
        </div>
        <div class="flex flex-col gap-2">
          <p class="text-sm">
            노트 핀
          </p>
          <USelectMenu
            v-model="selectedTagList"
            :options="tagList"
            multiple
          >
            <template #label>
              <span
                v-if="selectedTagList.length"
                class="truncate space-x-1"
              >
                <UBadge
                  v-for="(tag, index) in selectedTagList"
                  :key="index"
                  :ui="{ rounded: 'rounded-full' }"
                >
                  {{ tag.label }}
                </UBadge>
              </span>
              <span v-else>핀을 선택해 주세요</span>
            </template>
          </USelectMenu>
        </div>
      </div>
      <template #footer>
        <div class="flex justify-end gap-2">
          <UButton
            label="출간하기"
            color="primary"
            :loading="isEditPostLoading"
            @click="editPost"
          />
        </div>
      </template>
    </UCard>
  </USlideover>
</template>
