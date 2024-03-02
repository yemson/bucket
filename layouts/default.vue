<script setup lang="ts">
import { SpeedInsights } from '@vercel/speed-insights/nuxt'
</script>

<template>
  <div class="flex flex-col">
    <GlobalNavigationBar />
    <div class="px-3">
      <slot />
    </div>
  </div>
  <SpeedInsights />
</template>
