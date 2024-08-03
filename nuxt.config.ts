// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/supabase'],
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  css: [
    'bootstrap/dist/css/bootstrap.min.css',
    'bootstrap-icons/font/bootstrap-icons.min.css'
  ],
  plugins: [
    { src: '~/plugins/bootstrap.js', mode: 'client' },
  ],
  supabase: {
    redirect: false
  }
})