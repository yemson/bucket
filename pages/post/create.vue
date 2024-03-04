<script setup lang="ts">
definePageMeta({
  layout: false,
  middleware: 'auth',
})

const colorMode = useColorMode()

const content = ref('')
const title = ref('')
const isCreatePostLoading = ref(false)

const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  },
})

async function createPost() {
  if (!content.value || !title.value)
    return

  try {
    isCreatePostLoading.value = true
    const postObject = {
      title: title.value,
      post_json: content.value,
    }

    await $fetch('/api/v1/post', {
      method: 'POST',
      body: postObject,
    })
  }
  catch (e) {
    console.error(e)
  }
  finally {
    isCreatePostLoading.value = false
    navigateTo('/')
  }
}
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
        label="출간"
        icon="i-heroicons-document-text-20-solid"
        variant="soft"
        aria-label="출간하기"
        :disabled="!content || !title"
        :loading="isCreatePostLoading"
        @click="createPost"
      />
    </div>
  </header>

  <ClientOnly>
    <div class="border border-gray-200 dark:border-gray-800 rounded-md">
      <UInput
        v-model="title"
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
