<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '#ui/types'

interface Todo {
  created_at: Date
  content: string
  memo: string
  uid: string
  is_complete: boolean
  id: string
}

interface FetchData {
  todoList: Todo[]
  totalCount: number
}

const isCreateTodoOpen = ref(false)
const todoState = reactive({
  content: undefined,
  memo: undefined,
})
const isCreateTodoLoading = ref(false)
const isCompleteTodoLoading = ref(false)
// const todos = ref<Todo[]>()

const { data: fetchData, refresh: refreshTodo } = await useFetch<FetchData>('/api/v1/todo', {
  method: 'GET',
  // onResponse(result) {
  //   if (result.response.status === 200)
  //     todos.value = result.response._data
  // },
})

function validate(state: any): FormError[] {
  const errors = []
  if (!state.content)
    errors.push({ path: 'content', message: '필수 입력입니다.' })

  return errors
}

async function onSubmit(event: FormSubmitEvent<any>) {
  await createTodo(event)
}

function initTodoState() {
  todoState.content = undefined
  todoState.memo = undefined
}

async function createTodo(event: FormSubmitEvent<any>) {
  isCreateTodoLoading.value = true
  const todoObject = {
    content: event.data.content,
    memo: event.data.memo || '',
    is_complete: false,
  }

  try {
    await $fetch('/api/v1/todo', {
      method: 'POST',
      body: todoObject,
    })

    isCreateTodoOpen.value = false
    initTodoState()
    refreshTodo()
  }
  catch (e) {
    console.error(e)
  }
  finally {
    isCreateTodoLoading.value = false
  }
}

async function toggleTodoComplete(id: string) {
  isCompleteTodoLoading.value = true
  try {
    await $fetch(`/api/v1/todo/complete/${id}`, {
      method: 'PATCH',
    })
  }
  catch (e) {
    console.error(e)
  }
  finally {
    isCompleteTodoLoading.value = false
  }
}
</script>

<template>
  <div class="flex justify-between mb-3">
    <div class="text-2xl font-semibold self-center">
      할 일 관리
    </div>
    <UButton
      icon="i-heroicons-plus"
      size="xl"
      variant="ghost"
      @click="isCreateTodoOpen = true"
    />
  </div>

  <template v-if="fetchData?.todoList">
    <div
      v-for="todo in fetchData.todoList"
      :key="todo.id"
    >
      <div class="flex justify-between text-lg gap-3 p-3 rounded-md hover:bg-gray-100">
        <div class="flex justify-between gap-3">
          <UCheckbox
            v-model="todo.is_complete"
            :disabled="isCompleteTodoLoading"
            class="self-center"
            @change="toggleTodoComplete(todo.id)"
          />
          <div class="mr-1">
            {{ todo.content }}
          </div>
          <div class="self-center text-gray-500">
            #해시태그?
          </div>
        </div>
        <UBadge
          :color="todo.is_complete ? 'green' : 'rose'"
          class="self-center"
        >
          {{ todo.is_complete ? '완료' : '미완료' }}
        </UBadge>
      </div>
      <UDivider class="py-1" />
    </div>
  </template>

  <UModal
    v-model="isCreateTodoOpen"
    prevent-close
  >
    <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100' }">
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="font-semibold leading-6">
            할 일 추가
          </h3>
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            class="-my-1"
            @click="isCreateTodoOpen = false"
          />
        </div>
      </template>

      <section>
        <UForm
          :validate="validate"
          :state="todoState"
          class="space-y-4 flex flex-col"
          @submit="onSubmit"
        >
          <UFormGroup
            label="내용"
            name="content"
            required
            size="lg"
          >
            <UInput
              v-model="todoState.content"
              size="xl"
            />
          </UFormGroup>

          <UFormGroup
            label="메모"
            name="memo"
            size="lg"
          >
            <UTextarea
              v-model="todoState.memo"
              size="xl"
              :rows="7"
            />
          </UFormGroup>

          <UButton
            size="lg"
            label="추가"
            :loading="isCreateTodoLoading"
            class="w-fit self-end"
            type="submit"
          />
        </UForm>
      </section>
    </UCard>
  </UModal>
</template>
