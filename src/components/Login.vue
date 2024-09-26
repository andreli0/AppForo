<template>
    <v-dialog :activator="btnLogin" :max-width="mobile ? 'auto': '550'">
          <template v-slot:default="{ isActive }">
            <v-card>
                <v-card-title class="d-flex align-center">
                    <span class="">Iniciar Sesión</span>
                    <v-spacer></v-spacer>
                    <v-btn variant="text" icon="mdi-close" @click="isActive.value = false; limpiar()"></v-btn>
                </v-card-title>
            <v-card-text>
            <v-form ref="formLogin">
                <v-text-field
                    label="Correo electrónico"
                    prepend-inner-icon="mdi-at"
                    v-model="credentials.email"
                    :rules="[rules.required, rules.email]"
                ></v-text-field>
                <v-text-field
                    label="Contraseña"
                    v-model="credentials.password"
                    prepend-inner-icon="mdi-lock-outline"
                    :append-inner-icon="!show_password ? 'mdi-eye-outline':'mdi-eye-off-outline'"
                    :type="!show_password ? 'password' : 'text'"
                    :rules="[rules.required]"
                    @click:append-inner="show_password = !show_password"
                ></v-text-field>
                <v-btn class="mt-6" color="primary" :loading="loading" type="submit" @click.prevent="submitForm" block>Iniciar Sesión</v-btn>
            </v-form>
            <v-alert 
                closable
                class="mt-3" 
                :text="error_msg" 
                type="error" 
                v-model="show_error" 
                @click:close="show_error = false"
            ></v-alert>
            <v-alert class="mt-3" 
                type="success" 
                v-model="show_success">
                <strong>¡Exito!</strong>: Iniciando sesion
            </v-alert>
            </v-card-text>

            </v-card>
          </template>
        </v-dialog>
</template>

<script setup>
const props = defineProps(['btnLogin'])
const state = reactive({
    modal_login: null
})
const show_success = ref(false)
const show_error = ref(false)
const {auth} = useSupabaseClient()
const error_msg = ref("")
const credentials = reactive({
    email: '',
    password: ''
})
const loading = ref(false)
const show_password = ref(false)
const rules = reactive({
    required: (value) => {
        if (value) return true

        return 'Este campo es requerido'
    },
    email: (value) => {
        if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)) return true

        return 'Correo electronico no válido'
    }
})
const isActive = ref(false)
const {mobile} = useDisplay()

const formLogin = ref()

const submitForm = () => {
    formLogin.value?.validate().then(({valid: isValid}) => {
      if(isValid){
        login()
      }
    })
}

const login = async () => {
    loading.value = true
    const {error} = await auth.signInWithPassword(credentials); 
    if(error){
        loading.value = false
        error_msg.value = error.message
        show_error.value = true
    }else{
        loading.value = false
        error_msg.value = ""
        show_error.value = false
        show_success.value = true
        reloadNuxtApp()
    }
}

const limpiar = () => {
    credentials.email = ""
    credentials.password = ""
    show_success.value = false
    show_error.value = false
    error_msg.value = ""
}





</script>

<style scoped>

</style>