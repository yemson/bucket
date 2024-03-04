<script setup lang="ts">
const props = defineProps<{
  content: string
}>()
const emits = defineEmits(['confirm', 'cancel'])
const model = defineModel()
</script>

<template>
  <UModal
    v-model="model"
    prevent-close
  >
    <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
            알림
          </h3>
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            class="-my-1"
            @click="model = false"
          />
        </div>
      </template>

      {{ props.content }}

      <template #footer>
        <div class="flex justify-end gap-2">
          <UButton
            label="취소"
            color="gray"
            variant="ghost"
            @click="model = false; emits('cancel')"
          />
          <UButton
            label="확인"
            @click="emits('confirm')"
          />
        </div>
      </template>
    </UCard>
  </UModal>
</template>
