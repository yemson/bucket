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
      >
        <div
          class="w-64 h-96 bg-gray-100 rounded-md border cursor-pointer p-3"
          @click="navigateTo(`/post/${l.id}`)"
        >
          <div class="text-lg">
            {{ l.title }}
          </div>
        </div>
      </div>
    </Flicking>
    <template #fallback>
      <USkeleton class="w-full h-96" />
    </template>
  </ClientOnly>
</template>
