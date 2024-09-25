// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/supabase',
    'vuetify-nuxt-module',
    '@nuxtjs/tailwindcss'
  ],
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  srcDir: "src/",
  supabase: {
    redirect: false
  },
  vuetify: {
    moduleOptions: {
      /* module specific options */
    },
    vuetifyOptions: {
      theme: {
        defaultTheme: 'dark',
        themes: {
          dark: {
            dark: false,
            colors:{
              primary: '#3F51B5'
            }
          }
        }
      }
    }
  }
})
