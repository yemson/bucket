<script setup lang="ts">
const postList = ref([])

async function getPostList() {
  try {
    postList.value = await $fetch(`/api/v1/post/recent`, {
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
  <h1 class="text-xl font-semibold my-4">
    새로운 노트
  </h1>
  <SectionFlicking
    :list="postList"
  />
  <div>asdf</div>
</template>
