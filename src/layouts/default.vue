
    <!-- <div>
        <nav class="navbar bg-body-tertiary">
        <div class="container-fluid">
            <button class="btn d-lg-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasResponsive" aria-controls="offcanvasResponsive"><span class="navbar-toggler-icon"></span></button>
            <a class="navbar-brand" href="#">AppForo</a>


            <ul class="navbar-nav me-auto mb-2 mb-lg-0">

            </ul>
                <div class="d-flex" role="search" v-if="user"> 
                    <div class="row g-3 align-items-center">
                        <div class="col-sm-auto">
                            <div class="dropdown">
                                <button class="btn btn-outline-success dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i class="bi bi-person-fill"></i> {{ user.user_metadata.username }}
                                </button>
                                <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
                                    <li class="dropdown-item">
                                        <div class="form-check form-switch">
                                            <input class="form-check-input" type="checkbox" role="switch" v-model="dark_mode">
                                            <span v-show="dark_mode"> <i class="bi bi-moon-fill"></i></span>
                                            <span v-show="!dark_mode"><i class="bi bi-brightness-high"></i></span>
                                        </div>
                                    </li>
                                    <li><button type="button" class="dropdown-item" v-on:click.prevent="logout()"><i class="bi bi-box-arrow-left"></i> Cerrar Sesión</button></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div class="d-flex" role="search" v-else>
                    <div class="row g-3 align-items-center">
                        <div class="col-auto">
                            <button class="btn btn-outline-success" type="button" v-on:click.prevent="login()">Iniciar Sesion</button>
                        </div>
                        <div class="col-auto">
                            <div class="dropdown">
                                <button class="btn " type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i class="bi bi-three-dots-vertical"></i>
                                </button>
                                <ul class="dropdown-menu  dropdown-menu-end" aria-labelledby="dropdownMenuButton">
                                    <li class="dropdown-item">
                                        <div class="form-check form-switch">
                                            <input class="form-check-input" type="checkbox" role="switch" v-model="dark_mode">
                                            <span v-show="dark_mode"> <i class="bi bi-moon-fill"></i></span>
                                            <span v-show="!dark_mode"><i class="bi bi-brightness-high"></i></span>
                                        </div>
                                    </li>
                                    <li>
                                        <button class="dropdown-item" type="button" v-on:click.prevent="register()"><i class="bi bi-box-arrow-in-right"></i> Registrarte</button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

        </div>
        </nav>
        <Login :hash_login="hash_login" />
        <Register :hash_register="hash_register" /> 
        <slot />
    </div> -->
<template>
    <v-app>
        <v-app-bar color="primary" :elevation="1">
        <template v-slot:prepend>
            <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        </template>

        <v-app-bar-title>AppForo</v-app-bar-title>
        <v-spacer></v-spacer>
        <template v-if="mdAndUp">
            <template v-if="user">
                <v-btn color="success">{{user.user_metadata.username}}</v-btn>
                <v-btn variant="outline" color="secondary" @click.prevent="logout()">Cerrar Sesion</v-btn>
            </template>
            <template v-else>                
                <v-btn  variant="outlined" ref="btnLogin">Iniciar Sesion</v-btn>
                <v-btn variant="outlined" class="ml-2">Registrate</v-btn>
            </template>

        </template>
        <v-btn icon="mdi-dots-vertical" variant="text"></v-btn>
        </v-app-bar>
        <v-navigation-drawer        
        v-model="drawer"
        :location="mobile ? 'left' : undefined"
        >
            <v-list-item title="My Application" subtitle="Vuetify"></v-list-item>
            <v-divider></v-divider>
            <v-list-item link title="List Item 1"></v-list-item>
            <v-list-item link title="List Item 2"></v-list-item>
            <v-list-item link title="List Item 3"></v-list-item>
        </v-navigation-drawer>
        <v-main>
            <slot />
        </v-main>
    </v-app>
    <Login :btnLogin="btnLogin" />
</template>

<script setup>
import { computed } from 'vue';
const {auth} = useSupabaseClient()
const hash_login = ref(0)
const hash_register = ref(0)
const drawer = ref(false)
const isMounted = ref(false)
const btnLogin = ref(null)
const items = ref([
    {
        title: 'Foo',
        value: 'foo',
    },
    {
        title: 'Bar',
        value: 'bar',
    },
    {
        title: 'Fizz',
        value: 'fizz',
    },
    {
        title: 'Buzz',
        value: 'buzz',
    },
])

const { mobile, mdAndUp, mobileBreakpoint, thresholds } = useDisplay()

onMounted(() => {
    isMounted.value = true
})

watch(() => drawer, () => (drawer.value = false))


const login = () => {
    hash_login.value = Math.random(1,9999999)
}
const register = () => {
    hash_register.value = Math.random(1,9999999)
}

const user = useSupabaseUser()

const logout = async () => {
    const {error} = await auth.signOut()
    if(error){
        console.log(error.message);
    }else{
        reloadNuxtApp()
}
}

</script>

<style lang="scss" scoped>

</style>