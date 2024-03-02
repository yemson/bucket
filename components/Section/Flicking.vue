<script setup lang="ts">
import Flicking from '@egjs/vue3-flicking'
import '@egjs/vue3-flicking/dist/flicking.css'
import { AutoPlay } from '@egjs/flicking-plugins'

const props = defineProps({
  list: {
    type: Object,
    required: true,
  },
})

const plugin = ref([new AutoPlay({ duration: 2000, direction: 'NEXT', stopOnHover: true })])
const options = ref({
  renderOnlyVisible: true,
  circular: true,
})
</script>

<template>
  <ClientOnly>
    <Flicking
      :options="options"
      first-panel-size="256px"
      class="w-full rounded-md"
      :plugins="plugin"
    >
      <div
        v-for="(l, index) in props.list.data"
        :key="index"
        class="mx-2"
      >
        <div
          class="w-64 h-64 bg-gray-100 rounded-md cursor-pointer p-3 dark:bg-gray-800"
          @click="navigateTo(`/post/${l.id}`)"
        >
          <div class="text-lg">
            {{ l.title }}
          </div>
        </div>
      </div>
    </Flicking>
    <template #fallback>
      <USkeleton class="w-full h-64" />
    </template>
  </ClientOnly>
</template>

<style scoped>
.flicking-viewport {
  height: 16rem;
}
</style>
