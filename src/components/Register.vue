<template>
    <!-- <div class="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" id="registermodal">
        <div class="modal-dialog modal-md modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title text-center" id="modalStaticBackdropLabel">Regístrate</h5>
                    <button type="button" class="btn-close" aria-label="Close" v-on:click.prevent="cerrar()"></button>
                </div>
                <div class="modal-body">
                    <form v-on:submit.prevent="register()">
                        <div class="row">
                            <div class="col-md-12">
                                <label for="regusuario" class="form-label"><i class="bi bi-person-fill"></i> Nombre de usuario</label>
                                <input type="text" class="form-control" id="regusuario" v-model="credentials.options.data.username" required>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <label for="regmail" class="form-label"><i class="bi bi-at"></i> Correo Electrónico</label>
                                <input type="mail" class="form-control" id="regmail" v-model="credentials.email" required>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <label for="regpass" class="form-label"><i class="bi bi-key"></i> Contraseña</label>
                                <input type="password" class="form-control" id="regpass" v-model="credentials.password" required>
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-md-12">
                                <button type="submit" class="btn btn-success w-100">
                                    <i class="bi bi-box-arrow-right"></i> Registrarte
                                </button>
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-md-12">
                                <div class="alert alert-success fade show" role="alert" v-show="show_success">
                                    <strong>¡Registro exitoso!</strong>: Iniciando sesion
                                </div>
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-md-12">
                                <div class="alert alert-danger alert-dismissible" role="alert" v-show="show_error">
                                    <strong>Error: </strong> {{ error_msg }}
                                    <button type="button" class="btn-close" v-on:click.prevent="show_error = false"></button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div> -->
    <v-dialog :activator="btnRegister" :max-width="mobile ? 'auto': '550'">
          <template v-slot:default="{ isActive }">
            <v-card>
                <v-card-title class="d-flex align-center">
                    <span class="">Regístrate</span>
                    <v-spacer></v-spacer>
                    <v-btn variant="text" icon="mdi-close" @click="isActive.value = false; limpiar()"></v-btn>
                </v-card-title>
                <v-card-text>
                    <v-form ref="formRegister">
                        <v-text-field
                            label="Nombre de usuario"
                            prepend-inner-icon="mdi-account"
                            v-model="credentials.options.data.username"
                            :rules="[rules.required]"
                        ></v-text-field>
                        <v-text-field
                            label="Correo electronico"
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
                        <v-btn class="mt-6" color="primary" :loading="loading" type="submit" @click.prevent="submitForm" block>Registrarte</v-btn>
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
const props = defineProps(["btnRegister"])

const {auth} = useSupabaseClient()
const error_msg = ref("")
const show_success = ref(false)
const show_error = ref(false)
const credentials = reactive({
    email: '',
    password: '',
    options: {
        data: {
            username: ''
        }
    }
})
const loading = ref(false)
const {mobile} = useDisplay()
const show_password = ref(false)
const rules = reactive({
    required: (value) => {
        if (value) {
            return true
        }else {
            return 'Este campo es requerido'
        }
    },
    email: (value) => {
        if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)){
            return true
        }else{
            return 'Correo electronico no válido'
        }
    }
})

const formRegister = ref()

const submitForm = () => {
    formRegister.value?.validate().then(({valid: isValid}) => {
      if(isValid){
        register()
      }
    })
}
const register = async () => {
    loading.value = true
    const {error} = await auth.signUp(credentials); 
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
    credentials.options.data.username = ""
    show_success.value = false
    show_error.value = false
    error_msg.value = ""
}



</script>

<style scoped>

</style>