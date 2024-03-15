<script setup lang="ts">
import Flicking from '@egjs/vue3-flicking'
import '@egjs/vue3-flicking/dist/flicking.css'
import { AutoPlay } from '@egjs/flicking-plugins'
import type { SimplePost } from '~/types/common'

const props = defineProps({
  posts: {
    type: Array as PropType<SimplePost[]>,
    required: true,
  },
  title: {
    type: String,
  },
  visiblePublicIcon: {
    type: Boolean,
    default: false,
  },
  to: {
    type: String,
  },
})

const user = useSupabaseUser()
const model = defineModel('loading')
const plugin = ref([new AutoPlay({ duration: 2000, direction: 'NEXT', stopOnHover: true })])
const options = ref({
  renderOnlyVisible: true,
  circular: true,
  align: 'prev',
})
</script>

<template>
  <section>
    <div class="flex justify-between">
      <h1
        v-if="props.title"
        class="text-xl font-semibold my-4"
      >
        {{ title }}
      </h1>
      <UButton
        v-if="props.to"
        variant="ghost"
        :to="props.to"
        icon="i-heroicons-arrow-right"
        class="my-4"
        aria-label="더보기"
      />
    </div>
    <template v-if="!model">
      <ClientOnly>
        <Flicking
          v-if="props.posts.length > 0"
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
              class="flex flex-col justify-between w-64 h-56 bg-gray-100 rounded-md cursor-pointer p-4 dark:bg-gray-800"
              @click="navigateTo(`/post/${post.id}`)"
            >
              <div>
                <p class="text-lg">
                  {{ post.title }}
                </p>
                <p class="text-sm text-gray-500 dark:text-gray-300">
                  {{ post.description }}
                </p>
              </div>
              <div class="flex justify-between">
                <div class="flex gap-2">
                  <UAvatar
                    :src="`https://source.boringavatars.com/beam/120/${post.profiles?.email}?colors=264653,2a9d8f,e9c46a,f4a261,e76f51`"
                    alt="Profile Image"
                  />
                  <p class="text-sm text-gray-500 dark:text-gray-300 self-center">
                    {{ post.profiles?.nickname }}
                  </p>
                </div>
                <UIcon
                  v-if="props.visiblePublicIcon"
                  class="self-center w-5 h-5 text-gray-500 dark:text-gray-400"
                  :name="post.is_public ? 'i-heroicons-eye' : 'i-heroicons-eye-slash'"
                />
              </div>
            </div>
          </div>
        </Flicking>
        <div v-else-if="user">
          <div
            class="flex flex-col justify-center w-64 h-56 bg-gray-100 rounded-md cursor-pointer p-4 dark:bg-gray-800"
            @click="navigateTo(`/post/create`)"
          >
            <UIcon
              name="i-heroicons-plus"
              class="w-24 h-24 text-gray-400 dark:text-gray-500 self-center"
            />
          </div>
        </div>
        <div
          v-else
          class="text-gray-500 dark:text-gray-400"
        >
          노트가 없습니다.
        </div>
        <template #fallback>
          <USkeleton class="w-full h-56" />
        </template>
      </ClientOnly>
    </template>
    <USkeleton
      v-else
      class="w-full h-56"
    />
  </section>
</template>

<style scoped>
.flicking-viewport {
  height: 14rem;
}
</style>
