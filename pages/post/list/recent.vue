<script setup lang="ts">
const route = useRoute()

const pageNo = ref(Number(route.query.pageNo) || 1)

const query = computed(() => {
  return {
    pageNo: pageNo.value,
    pageSize: 12,
  }
}, {
  onTrigger: () => {
    navigateTo({
      query: {
        pageNo: pageNo.value,
      },
    })
  },
})

const { data: recentList } = await useFetch(`/api/v1/post/list/recent`, { query })
</script>

<template>
  <section>
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
          class="flex flex-col justify-between h-52 bg-gray-100 rounded-md cursor-pointer p-4 dark:bg-gray-800"
          @click="navigateTo(`/post/${recent.id}`)"
        >
          <div>
            <p class="text-lg">
              {{ recent.title }}
            </p>
            <p class="text-sm text-gray-500 dark:text-gray-300">
              {{ recent.description }}
            </p>
          </div>
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
