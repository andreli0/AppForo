<template>
  <v-dialog
    :activator="btnRegister"
    :max-width="mobile ? 'auto': '550'"
  >
    <template #default="{ isActive }">
      <v-card>
        <v-card-title class="d-flex align-center">
          <span class="">Regístrate</span>
          <v-spacer />
          <v-btn
            variant="text"
            icon="mdi-close"
            @click="isActive.value = false; limpiar()"
          />
        </v-card-title>
        <v-card-text>
          <v-form ref="formRegister">
            <v-text-field
              v-model="credentials.options.data.username"
              label="Nombre de usuario"
              prepend-inner-icon="mdi-account"
              :rules="[rules.required, rules.username]"
            />
            <v-text-field
              v-model="credentials.email"
              label="Correo electrónico"
              prepend-inner-icon="mdi-at"
              :rules="[rules.required, rules.email]"
            />
            <v-text-field
              v-model="credentials.password"
              label="Contraseña"
              prepend-inner-icon="mdi-lock-outline"
              :append-inner-icon="!show_password ? 'mdi-eye-outline':'mdi-eye-off-outline'"
              :type="!show_password ? 'password' : 'text'"
              :rules="[rules.required]"
              @click:append-inner="show_password = !show_password"
            />
            <v-btn
              class="mt-6"
              color="primary"
              :loading="loading"
              type="submit"
              block
              @click.prevent="submitForm"
            >
              Registrarte
            </v-btn>
          </v-form>
          <v-alert
            v-model="show_error"
            closable
            class="mt-3"
            :text="error_msg"
            type="error"
            @click:close="show_error = false"
          />
          <v-alert
            v-model="show_success"
            class="mt-3"
            type="success"
          >
            <strong>¡Exito!</strong>: Iniciando sesion
          </v-alert>
        </v-card-text>
      </v-card>
    </template>
  </v-dialog>
</template>

<script setup>
const props = defineProps(['btnRegister'])
const { auth } = useSupabaseClient()
const error_msg = ref('')
const show_success = ref(false)
const show_error = ref(false)
const credentials = reactive({
  email: '',
  password: '',
  options: {
    data: {
      username: '',
    },
  },
})
const loading = ref(false)
const { mobile } = useDisplay()
const show_password = ref(false)
const rules = reactive({
  username: (value) => {
    if (value.length <= 20 && value.length >= 6) {
      return true
    }
    else {
      return value.length >= 6 ? 'El nombre de usuario debe tener un máximo de 20 caracteres' : 'El nombre de usuario debe tener un mínimo de 6 caracteres'
    }
  },
  required: (value) => {
    if (value) return true

    return 'Este campo es requerido'
  },
  email: (value) => {
    if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)) return true

    return 'Correo electronico no válido'
  },
})

const formRegister = ref()

const submitForm = () => {
  formRegister.value?.validate().then(({ valid: isValid }) => {
    if (isValid) {
      register()
    }
  })
}
const register = async () => {
  loading.value = true
  const { error } = await auth.signUp(credentials)
  if (error) {
    loading.value = false
    error_msg.value = error.message
    show_error.value = true
  }
  else {
    loading.value = false
    error_msg.value = ''
    show_error.value = false
    show_success.value = true
    reloadNuxtApp()
  }
}
const limpiar = () => {
  credentials.email = ''
  credentials.password = ''
  credentials.options.data.username = ''
  show_success.value = false
  show_error.value = false
  error_msg.value = ''
}
</script>

<style scoped>

</style>
