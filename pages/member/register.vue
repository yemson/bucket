<script setup lang="ts">
import { z } from 'zod'
import type { FormError, FormSubmitEvent } from '#ui/types'

definePageMeta({
  layout: false,
})

type Schema = z.output<typeof schema>

const supabase = useSupabaseClient()
const registerForm = ref()
const state = reactive({
  email: '',
  password: '',
  passwordConfirm: '',
  nickname: '',
})

const isRegisterLoading = ref(false)

const schema = z.object({
  email: z.string().email('올바르지 않은 이메일 형식입니다.'),
  password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+}{":;'?/>.<,])(?=.*[a-zA-Z0-9!@#$%^&*()_+}{":;'?/>.<,]).{8,}$/, '비밀번호는 최소 8자 이상이어야 하며, 영문 대소문자, 숫자, 특수문자가 모두 포함되어야 합니다.'),
  passwordConfirm: z.string().refine(v => v === state.password, { message: '비밀번호가 일치하지 않습니다.' }),
  nickname: z.string().min(2, '닉네임은 최소 2자 이상이어야 합니다.').max(8, '닉네임은 최대 8자까지 가능합니다.'),
})

function validate(state: any): FormError[] {
  const errors = []
  if (!state.email)
    errors.push({ path: 'email', message: '필수 입력입니다.' })
  if (!state.password)
    errors.push({ path: 'password', message: '필수 입력입니다.' })
  if (!state.passwordConfirm)
    errors.push({ path: 'passwordConfirm', message: '필수 입력입니다.' })
  if (!state.nickname)
    errors.push({ path: 'nickname', message: '필수 입력입니다.' })
  return errors
}

async function onSubmit(event: FormSubmitEvent<Schema>) {
  signUpWithEmail(event)
}

async function signUpWithEmail(loginData: FormSubmitEvent<Schema>) {
  isRegisterLoading.value = true

  // 이건 일부로 ㅎㅎ..
  await sleep(500)

  const { error } = await supabase.auth.signUp({
    email: loginData.data.email,
    password: loginData.data.password,
    options: {
      data: {
        nickname: loginData.data.nickname,
      },
    },
  })

  if (error) {
    if (error.status === 400)
      registerForm.value.errors.push({ path: 'email', message: '이미 가입된 이메일입니다.' })
    else if (error.status === 500 && error.message.includes('unique constraint'))
      registerForm.value.errors.push({ path: 'nickname', message: '이미 사용중인 닉네임입니다.' })
  }
  else {
    navigateTo('/member/login')
  }

  isRegisterLoading.value = false
}
</script>

<template>
  <section class="h-screen flex justify-center items-center">
    <div class="w-96 p-3 space-y-3">
      <h1 class="text-3xl text-center font-semibold">
        노트잇!
      </h1>
      <UForm
        ref="registerForm"
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

        <UFormGroup
          label="비밀번호 확인"
          name="passwordConfirm"
          size="xl"
          required
        >
          <UInput
            v-model="state.passwordConfirm"
            type="password"
            placeholder="********"
            icon="i-heroicons-key"
          />
        </UFormGroup>

        <UFormGroup
          label="닉네임"
          name="nickname"
          size="xl"
          required
        >
          <UInput
            v-model="state.nickname"
            placeholder="닉네임"
            icon="i-heroicons-user"
          />
        </UFormGroup>

        <UButton
          type="submit"
          size="xl"
          block
          :loading="isRegisterLoading"
        >
          회원가입
        </UButton>

        <div class="flex justify-center">
          <ULink
            to="/member/login"
            class="text-sm"
            active-class="text-gray"
            inactive-class="text-primary-500 hover:text-primary-700"
          >
            이미 회원이신가요?
          </ULink>
        </div>
      </UForm>
    </div>
  </section>
</template>
