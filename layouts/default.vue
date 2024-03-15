<script setup lang="ts">
import { SpeedInsights } from '@vercel/speed-insights/nuxt'
</script>

<template>
  <main class="min-h-screen flex flex-col justify-between">
    <section class="flex-grow">
      <div class="flex flex-col">
        <GlobalNavigationBar />
        <div class="px-3">
          <slot />
        </div>
      </div>
    </section>
    <footer class="flex justify-center items-center h-16">
      <p class="text-[10px] dark:text-gray-300 text-gray-500">
        © 2023 노트잇!. All rights reserved.
      </p>
    </footer>
  </main>
  <SpeedInsights />
</template>
