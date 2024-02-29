<script setup lang="ts">
import Flicking from '@egjs/vue3-flicking'
import '@egjs/vue3-flicking/dist/flicking.css'
import { AutoPlay, Perspective } from '@egjs/flicking-plugins'

const plugin = ref([new Perspective({ rotate: 0.3 }), new AutoPlay({ duration: 2000, direction: 'NEXT', stopOnHover: true })])
const options = ref({
  renderOnlyVisible: true,
})
</script>

<template>
  <Flicking
    :options="options"
    :hide-before-init="true"
    first-panel-size="256px"
    class="w-full"
    :plugins="plugin"
  >
    <div
      v-for="i in 100"
      :key="i"
    >
      <div class="w-64 h-96 bg-gray-100 rounded-md border scale-90 hover:scale-100 transition">
        asdfasd
      </div>
    </div>
  </Flicking>
</template>
