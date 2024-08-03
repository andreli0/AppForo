<template>
    <div class="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" id="loginmodal">
        <div class="modal-dialog modal-md modal-dialog-centered">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title text-center" id="modalStaticBackdropLabel">Inicia Sesión</h5>
                <button type="button" class="btn-close" aria-label="Close" v-on:click.prevent="cerrar()"></button>
            </div>
            <div class="modal-body">
                <form v-on:submit.prevent="login()">
                    <div class="row">
                        <div class="col-md-12">
                            <label for="loginusuario" class="form-label"><i class="bi bi-at"></i> Correo Electrónico</label>
                            <input type="mail" class="form-control" id="loginusuario" v-model="credentials.email" required>
                        </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-md-12">
                                <label for="logicontrasena" class="form-label"><i class="bi bi-key"></i> Contraseña</label>
                                <input type="password" class="form-control" id="logicontrasena" v-model="credentials.password" required>
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-md-12">
                                <button type="submit" class="btn btn-success w-100">
                                    <i class="bi bi-box-arrow-right"></i> Iniciar Sesión
                                </button>
                        </div>
                        <div class="row mt-3">
                            <div class="col-md-12">
                                <div class="alert alert-success fade show" role="alert" v-show="show_success">
                                    <strong>¡Exito!</strong>: Iniciando sesion
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
                    </div>
                </form>
            </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const {$bs} = useNuxtApp()
const props = defineProps(["hash_login"])
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


onMounted(() => {
    state.modal_login = new $bs.Modal(document.getElementById("loginmodal"));
})



watch(() => props.hash_login, () => {
    state.modal_login.show()
})

const cerrar = () => {
    state.modal_login.hide()
}

const login = async () => {
    const {error} = await auth.signInWithPassword(credentials); 
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



</script>

<style scoped>

</style>