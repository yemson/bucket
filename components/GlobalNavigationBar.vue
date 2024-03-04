<script setup lang="ts">
import type { DropdownItem } from '#ui/types'

const supabase = useSupabaseClient()
const user = useSupabaseUser()
const colorMode = useColorMode()
const items = ref<DropdownItem[][]>()

const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  },
})

async function signOut() {
  const { error } = await supabase.auth.signOut()

  if (error)
    console.error(error)
  else
    window.location.reload()
}

onMounted(() => {
  if (user.value) {
    items.value = [
      [{
        label: user.value?.user_metadata.nickname,
        avatar: {
          src: `https://source.boringavatars.com/beam/120/${user.value?.email}?colors=264653,2a9d8f,e9c46a,f4a261,e76f51`,
        },
      }],
      [{
        label: '글쓰기',
        icon: 'i-heroicons-pencil',
        click: () => {
          navigateTo('/post/create')
        },
      }, {
        label: '로그아웃',
        icon: 'i-heroicons-arrow-right-start-on-rectangle',
        click: () => {
          signOut()
        },
      }],
    ]
  }
  else {
    items.value = [
      [{
        label: '로그인',
        icon: 'i-heroicons-arrow-right-start-on-rectangle',
        click: () => {
          navigateTo('/member/login')
        },
      }],
    ]
  }
})
</script>

<template>
  <header class="flex justify-between p-3">
    <NuxtLink
      to="/"
      class="text-xl font-bold self-center"
    >
      노트잇!
    </NuxtLink>
    <div class="flex">
      <ClientOnly>
        <UButton
          :icon="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'"
          color="gray"
          variant="ghost"
          size="xl"
          aria-label="테마 변경"
          @click="isDark = !isDark"
        />
        <template #fallback>
          <USkeleton class="w-11 h-11" />
        </template>
      </ClientOnly>
      <UDropdown
        :items="items"
        :popper="{ placement: 'bottom-start' }"
      >
        <UButton
          icon="i-heroicons-user-circle-20-solid"
          size="xl"
          color="gray"
          square
          variant="ghost"
          aria-label="사용자 메뉴"
        />
      </UDropdown>
    </div>
  </header>
</template>
