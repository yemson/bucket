<script setup lang="ts">
const supabase = useSupabaseClient()
const colorMode = useColorMode()

const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  },
})

const items = [
  [{
    label: '로그아웃',
    icon: 'i-heroicons-arrow-left-start-on-rectangle',
    click: () => {
      signOut()
    },
  }],
]

async function signOut() {
  const { error } = await supabase.auth.signOut()

  if (error)
    console.error(error)
  else
    navigateTo('/login')
}
</script>

<template>
  <header class="flex justify-between p-3">
    <NuxtLink
      to="/"
      class="text-xl font-bold self-center"
    >
      노트잇!
    </NuxtLink>
    <div>
      <ClientOnly>
        <UButton
          :icon="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'"
          color="gray"
          variant="ghost"
          size="xl"
          aria-label="Theme"
          @click="isDark = !isDark"
        />
        <template #fallback>
          <USkeleton class="w-[44px] h-[44px]" />
        </template>
      </ClientOnly>
      <UDropdown
        :items="items"
        :popper="{ placement: 'bottom-start' }"
      >
        <UButton
          icon="i-heroicons-bars-3"
          size="xl"
          color="gray"
          square
          variant="ghost"
        />
      </UDropdown>
    </div>
  </header>
</template>
