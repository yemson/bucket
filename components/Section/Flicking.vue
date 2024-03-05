<script setup lang="ts">
import Flicking from '@egjs/vue3-flicking'
import '@egjs/vue3-flicking/dist/flicking.css'
import { AutoPlay } from '@egjs/flicking-plugins'

interface Post {
  id: number
  title: string
  profiles: {
    email: string
    nickname: string
  }
}

const props = defineProps({
  posts: {
    type: Array as PropType<Post[]>,
    required: true,
  },
  title: {
    type: String,
  },
})

const model = defineModel('loading')
const plugin = ref([new AutoPlay({ duration: 2000, direction: 'NEXT', stopOnHover: true })])
const options = ref({
  // renderOnlyVisible: true,
  circular: true,
})
</script>

<template>
  <h1
    v-if="props.title"
    class="text-xl font-semibold my-4"
  >
    {{ title }}
  </h1>
  <template v-if="!model">
    <ClientOnly>
      <Flicking
        :options="options"
        first-panel-size="256px"
        class="w-full rounded-md"
        :plugins="plugin"
      >
        <div
          v-for="(post, index) in props.posts"
          :key="index"
          class="mx-2"
        >
          <div
            class="flex flex-col justify-between w-64 h-64 bg-gray-100 rounded-md cursor-pointer p-4 dark:bg-gray-800"
            @click="navigateTo(`/post/${post.id}`)"
          >
            <p class="text-lg">
              {{ post.title }}
            </p>
            <div class="flex gap-2">
              <UAvatar
                :src="`https://source.boringavatars.com/beam/120/${post.profiles?.email}?colors=264653,2a9d8f,e9c46a,f4a261,e76f51`"
                alt="Profile Image"
              />
              <p class="text-sm text-gray-500 dark:text-gray-300 self-center">
                {{ post.profiles?.nickname }}
              </p>
            </div>
          </div>
        </div>
      </Flicking>
      <template #fallback>
        <USkeleton class="w-full h-64" />
      </template>
    </ClientOnly>
  </template>
  <USkeleton
    v-else
    class="w-full h-64"
  />
</template>

<style scoped>
.flicking-viewport {
  height: 16rem;
}
</style>
