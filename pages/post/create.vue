<script setup lang="ts">
definePageMeta({
  layout: false,
})

const colorMode = useColorMode()

const content = ref('')

const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  },
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
    <ClientOnly>
      <UButton
        :icon="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'"
        color="gray"
        variant="ghost"
        size="xl"
        aria-label="Theme"
        @click="isDark = !isDark"
      />
    </ClientOnly>
  </header>

  <ClientOnly>
    <Tiptap v-model="content" />
    <template #fallback>
      <p>에디터 불러오는 중...</p>
    </template>
  </ClientOnly>

  <div>
    {{ content }}
  </div>
</template>
