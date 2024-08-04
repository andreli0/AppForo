<template>
    <div class="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" id="registermodal">
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
    </div>
</template>

<script setup>
const {$bs} = useNuxtApp()
const props = defineProps(["hash_register"])
const state = reactive({
    modal_register: null
})
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

onMounted(() => {
    state.modal_register = new $bs.Modal(document.getElementById("registermodal"))
})

watch(() => props.hash_register, () => {
    state.modal_register.show()
})

const cerrar = () => {
    state.modal_register.hide()
    limpiar()
}

const register = async () => {
    const {error} = await auth.signUp(credentials); 
    if(error){
        error_msg.value = error.message
        show_error.value = true
    }else{
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