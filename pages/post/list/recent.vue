<script setup lang="ts">
const route = useRoute()

const { data: recentList, pending } = useFetch(`/api/v1/post/list/recent?pageNo=${route.query.pageNo || 1}&pageSize=12`)

const pageNo = ref(Number(route.query.pageNo) || 1)

async function pageChange(page: number) {
  try {
    const result = await $fetch(`/api/v1/post/list/recent?pageNo=${page}&pageSize=12`)

    if (result)
      recentList.value = result

    window.scrollTo({ top: 0, behavior: 'smooth' })

    navigateTo({ path: '/post/list/recent', query: { pageNo: page }, replace: true })
  }
  catch (error) {
    console.error(error)
  }
}

watch(pageNo, () => {
  pageChange(pageNo.value)
})
</script>

<template>
  <section v-if="!pending">
    <h1
      class="text-xl font-semibold my-4"
    >
      새로운 노트
    </h1>
    <div
      v-if="recentList"
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
    >
      <template
        v-for="recent in recentList.data"
        :key="recent.id"
      >
        <div
          class="flex flex-col justify-between h-72 bg-gray-100 rounded-md cursor-pointer p-4 dark:bg-gray-800"
          @click="navigateTo(`/post/${recent.id}`)"
        >
          <p class="text-lg">
            {{ recent.title }}
          </p>
          <div class="flex justify-between">
            <div class="flex gap-2">
              <UAvatar
                :src="`https://source.boringavatars.com/beam/120/${recent.profiles?.email}?colors=264653,2a9d8f,e9c46a,f4a261,e76f51`"
                alt="Profile Image"
              />
              <p class="text-sm text-gray-500 dark:text-gray-300 self-center">
                {{ recent.profiles?.nickname }}
              </p>
            </div>
          </div>
        </div>
      </template>
    </div>
  </section>
  <div class="flex justify-center mt-8">
    <UPagination
      v-model="pageNo"
      :page-count="12"
      :total="recentList?.total_count"
    />
  </div>
</template>
