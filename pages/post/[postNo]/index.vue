<script setup lang="ts">
import type { Content } from '@tiptap/core'

definePageMeta({
  middleware: 'check-public',
})

const user = useSupabaseUser()

const dayjs = useDayjs()
const route = useRoute()
const isEditModalOpen = ref(false)
const isDeleteModalOpen = ref(false)
const settingItems = [
  [{
    label: '수정',
    click: () => {
      isEditModalOpen.value = true
    },
    icon: 'i-heroicons-pencil',
  }, {
    label: '삭제',
    click: () => {
      isDeleteModalOpen.value = true
    },
    icon: 'i-heroicons-trash',
  }],
]

const { data: post, pending } = await useFetch(`/api/v1/post`, {
  query: {
    postNo: route.params.postNo,
  },
})

async function deletePost() {
  try {
    await $fetch(`/api/v1/post`, {
      query: {
        postNo: route.params.postNo,
      },
      method: 'DELETE',
    })

    navigateTo('/')
  }
  catch (error) {
    console.error(error)
  }
}

const content: Content = computed(() => {
  return post.value?.post_json
})

async function likePost() {
  try {
    if (post.value?.likes.includes(user.value?.id ?? '')) {
      await $fetch(`/api/v1/post/like`, {
        query: {
          postNo: route.params.postNo,
        },
        method: 'DELETE',
      })

      post.value.likes = post.value.likes.filter((id: string) => id !== user.value?.id ?? '')
    }
    else {
      await $fetch(`/api/v1/post/like`, {
        query: {
          postNo: route.params.postNo,
        },
        method: 'POST',
      })

      post.value?.likes.push(user.value?.id ?? '')
    }
  }
  catch (error) {
    console.error(error)
  }
}

useHead(() => {
  return {
    title: post.value?.title,
  }
})
</script>

<template>
  <template v-if="!pending">
    <div class="flex justify-between mt-3">
      <div class="flex self-center">
        <UAvatar
          class="mr-1.5"
          :src="`https://source.boringavatars.com/beam/120/${post?.profiles?.email}?colors=264653,2a9d8f,e9c46a,f4a261,e76f51`"
          alt="Profile Image"
          size="2xs"
        />
        <p class="text-sm text-gray-500 dark:text-gray-300">
          {{ post?.profiles?.nickname }}
        </p>
        <div class="text-primary-500 mx-1.5 text-sm">
          /
        </div>
        <div
          class="text-gray-400 dark:text-gray-500 text-sm"
        >
          {{ dayjs(post?.created_at).format('YYYY-MM-DD') }}
        </div>
      </div>
      <template v-if="user">
        <div
          v-if="user?.id === post?.user_id"
          class="flex"
        >
          <UTooltip
            :text="`${post?.likes.length}`"
            :popper="{ arrow: true }"
          >
            <UIcon
              class="self-center w-5 h-5 text-gray-500 dark:text-gray-400"
              name="i-heroicons-heart"
            />
          </UTooltip>
          <UTooltip
            :text="post?.is_public ? '공개' : '비공개'"
            :popper="{ arrow: true }"
            class="ml-3"
          >
            <UIcon
              class="self-center w-5 h-5 text-gray-500 dark:text-gray-400"
              :name="post?.is_public ? 'i-heroicons-eye' : 'i-heroicons-eye-slash'"
            />
          </UTooltip>
          <UDivider
            orientation="vertical"
            class="ml-3 mr-1"
          />
          <UDropdown
            :items="settingItems"
            class="self-center"
          >
            <UButton
              variant="ghost"
              icon="i-heroicons-cog-6-tooth"
              aria-label="글 설정"
            />
          </UDropdown>
        </div>
        <div v-else>
          <UTooltip
            :text="`${post?.likes.length}`"
            :popper="{ arrow: true }"
          >
            <UButton
              :icon="post?.likes.includes(user?.id) ? 'i-heroicons-heart-solid' : 'i-heroicons-heart'"
              variant="ghost"
              @click="likePost"
            />
          </UTooltip>
        </div>
      </template>
    </div>
    <div
      class="mt-4"
    >
      <h1 class="text-2xl font-semibold">
        {{ post?.title }}
      </h1>
      <h2
        v-if="post?.description"
        class="text-gray-500 dark:text-gray-300"
      >
        {{ post?.description }}
      </h2>
      <UDivider
        class="my-4"
      />
    </div>

    <CommonModal
      v-model="isEditModalOpen"
      content="해당 노트를 수정하시겠습니까?"
      @confirm="navigateTo(`/post/${post?.id}/edit`)"
    />

    <CommonModal
      v-model="isDeleteModalOpen"
      content="해당 노트를 삭제하시겠습니까?"
      @confirm="deletePost"
    />
  </template>
  <template v-else>
    <USkeleton
      class="w-52 h-6 mt-3"
    />
    <USkeleton
      class="w-80 h-8 mt-4"
    />
    <UDivider
      class="my-4"
    />
  </template>
  <ClientOnly>
    <Tiptap
      v-if="!pending"
      v-model="content"
      :read-only="true"
    />
    <USkeleton
      v-else
      class="w-full h-72"
    />
    <template #fallback>
      <USkeleton
        class="w-full h-72"
      />
    </template>
  </ClientOnly>
  <UDivider class="my-4" />
  <div class="mb-2 space-x-2">
    <UBadge :ui="{ rounded: 'rounded-full' }">
      일상
    </UBadge>
    <UBadge :ui="{ rounded: 'rounded-full' }">
      공부
    </UBadge>
    <UBadge :ui="{ rounded: 'rounded-full' }">
      자기개발
    </UBadge>
  </div>
</template>
