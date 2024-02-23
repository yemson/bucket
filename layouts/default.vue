<template>
  <div class="flex flex-col min-w-[1024px]">
    <GlobalNavigationBar />

    <div class="flex gap-2 mt-2">
      <SideNavigationBar class="w-64" />
      <div class="w-full px-3 pb-3">
        <slot />
      </div>
    </div>
  </div>
</template>
