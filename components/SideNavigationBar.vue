<script setup lang="ts">
const links = [
  [{
    label: '메인',
    to: '/',
    icon: 'i-heroicons-home',
  }, {
    label: '할 일 관리',
    to: '/todo',
    icon: 'i-heroicons-rectangle-stack',
  }, {
    label: '글쓰기',
    icon: 'i-heroicons-pencil-square',
  }],
  [{
    label: '설정',
    icon: 'i-heroicons-cog-6-tooth',
  }, {
    label: '도움말',
    icon: 'i-heroicons-question-mark-circle',
  }],
]
</script>

<template>
  <UVerticalNavigation
    :ui="{ size: 'text-lg' }"
    :links="links"
  >
    <template #default="{ link }">
      <span class="group-hover:text-primary relative">{{ link.label }}</span>
    </template>
  </UVerticalNavigation>
</template>
