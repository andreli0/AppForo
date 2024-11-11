// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  // Your custom configs here
  {
    rules: {
      'vue/prop-name-casing': 'off',
      'vue/require-default-prop': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'vue/no-template-shadow': 'off',
      'vue/multi-word-component-names': 'off',
      'vue/require-prop-types': 'off',
      'vue/no-use-v-if-with-v-for': 'off',
    },
  },

)
