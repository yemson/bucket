<script setup lang="ts">
const content = ref('')
</script>

<template>
  <ClientOnly>
    <Tiptap v-model="content" />
  </ClientOnly>
</template>
