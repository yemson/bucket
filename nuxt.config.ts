// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
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
    redirectOptions: {
      login: '/member/login',
      callback: '/confirm',
      exclude: [],
      cookieRedirect: false,
    },
  },
})
