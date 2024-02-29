<script setup lang="ts">
const route = useRoute()
const content = ref()

async function getContent() {
  try {
    const data = await $fetch(`/api/v1/post/${route.params.postNo}`, {
      method: 'GET',
    })

    content.value = data?.data.post_json
  }
  catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  getContent()
})
</script>

<template>
  <ClientOnly>
    <Tiptap
      v-if="content"
      v-model="content"
      :read-only="true"
    />
  </ClientOnly>
</template>
