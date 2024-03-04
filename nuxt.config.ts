// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        lang: 'ko',
      },
      title: '노트잇!',
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      meta: [
        { name: 'description', content: '일상의 이야기를 기록하고 공유해보세요!' },
      ],
    },
  },
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@nuxtjs/supabase', 'dayjs-nuxt'],
  tailwindcss: {
    viewer: false,
    config: {
      theme: {
        fontFamily: {
          sans: ['"IBM Plex Sans KR"', 'sans-serif'],
        },
      },
    },
  },
  css: [
    '@/assets/css/main.css',
  ],
  supabase: {
    redirect: false,
  },
})
