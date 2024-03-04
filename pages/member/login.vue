<script setup lang="ts">
import { z } from 'zod'
import type { FormError, FormSubmitEvent } from '#ui/types'

definePageMeta({
  layout: false,
})

type Schema = z.output<typeof schema>

const supabase = useSupabaseClient()
const loginForm = ref()
const state = reactive({
  email: '',
  password: '',
})
const isRememberId = ref(false)
const isLoginLoading = ref(false)

onMounted(() => {
  const rememberId = localStorage.getItem('remember-id')
  if (rememberId) {
    state.email = rememberId
    isRememberId.value = true
  }
})

const schema = z.object({
  email: z.string().email('올바르지 않은 이메일 형식입니다.'),
  password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+}{":;'?/>.<,])(?=.*[a-zA-Z0-9!@#$%^&*()_+}{":;'?/>.<,]).{8,}$/, '비밀번호 형식이 올바르지 않습니다.'),
})

function validate(state: any): FormError[] {
  const errors = []
  if (!state.email)
    errors.push({ path: 'email', message: '필수 입력입니다.' })
  if (!state.password)
    errors.push({ path: 'password', message: '필수 입력입니다.' })
  return errors
}

async function onSubmit(event: FormSubmitEvent<Schema>) {
  signInWithEmail(event)
}

async function signInWithEmail(loginData: FormSubmitEvent<Schema>) {
  isLoginLoading.value = true

  // 이건 일부로 ㅎㅎ..
  await sleep(500)

  const { error } = await supabase.auth.signInWithPassword({
    email: loginData.data.email,
    password: loginData.data.password,
  })

  if (error) {
    if (error.status === 400)
      loginForm.value.errors.push({ path: 'password', message: '이메일 또는 비밀번호가 잘못되었습니다.' })
  }
  else {
    localStorage.setItem('remember-id', loginData.data.email)
    navigateTo('/')
  }

  isLoginLoading.value = false
}
</script>

<template>
  <section class="h-screen flex justify-center items-center pb-24">
    <div class="w-96 p-3 space-y-3">
      <h1 class="text-3xl text-center font-semibold">
        노트잇!
      </h1>
      <UForm
        ref="loginForm"
        :validate="validate"
        :schema="schema"
        :state="state"
        class="space-y-4"
        @submit="onSubmit"
      >
        <UFormGroup
          label="이메일"
          name="email"
          size="xl"
          required
        >
          <UInput
            v-model="state.email"
            placeholder="you@example.com"
            icon="i-heroicons-envelope"
          />
        </UFormGroup>

        <UFormGroup
          label="비밀번호"
          name="password"
          size="xl"
          required
        >
          <UInput
            v-model="state.password"
            type="password"
            placeholder="********"
            icon="i-heroicons-key"
          />
        </UFormGroup>

        <UCheckbox
          v-model="isRememberId"
          name="remember-id"
          label="아이디 기억하기"
        />

        <UButton
          type="submit"
          size="xl"
          block
          :loading="isLoginLoading"
        >
          로그인
        </UButton>

        <div class="flex justify-center">
          <ULink
            to="/member/register"
            class="text-sm"
            active-class="text-gray"
            inactive-class="text-primary-500 hover:text-primary-700"
          >
            처음이신가요?
          </ULink>
        </div>
      </UForm>
    </div>
  </section>
</template>
