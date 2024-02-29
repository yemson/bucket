<script setup lang="ts">
const postList = ref([])

async function getPostList() {
  try {
    postList.value = await $fetch(`/api/v1/post`, {
      method: 'GET',
    })
  }
  catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  getPostList()
})
</script>

<template>
  <div class="flex justify-end mb-3">
    <UButton
      to="/post/create"
      variant="soft"
      label="글쓰기"
      icon="i-heroicons-plus"
    />
  </div>
  <SectionFlicking
    :list="postList"
  />
</template>
