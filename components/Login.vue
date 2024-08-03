<template>
    <div class="modal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" id="loginmodal">
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
                            <label for="loginusuario" class="form-label">Correo Electrónico</label>
                            <input type="mail" class="form-control" id="loginusuario" v-model="credentials.email" placeholder="user@mail.com" required>
                        </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-md-12">
                                <label for="logicontrasena" class="form-label">Contraseña</label>
                                <input type="password" class="form-control" id="logicontrasena" v-model="credentials.password" required>
                            </div>
                        </div>
                        <div class="row mt-2" v-show="error_msg != ''">
                            <div class="col-md-12">
                                <label for="" class="form-label text-danger">{{ error_msg  }}</label>
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-md-12">
                                <button type="submit" class="btn btn-success w-100">
                                    Iniciar Sesión
                                </button>
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
    }else{
        error_msg.value = ""
        navigateTo('/')
    }
}



</script>

<style scoped>

</style>