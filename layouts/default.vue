<script setup>
import { SpeedInsights } from '@vercel/speed-insights/nuxt'
</script>

<template>
  <div class="flex flex-col min-w-[1024px]">
    <GlobalNavigationBar />
    <div class="px-3">
      <slot />
    </div>
  </div>
  <SpeedInsights />
</template>
