<script setup>
const { data, error } = useFetch('/api/v1/post')
</script>

<template>
  <div class="flex justify-end">
    <UButton
      to="/post/create"
      variant="soft"
      label="글쓰기"
      icon="i-heroicons-plus"
    />
  </div>
  <SectionFlicking
    v-if="!error"
    :list="data"
  />
</template>
