<template>
    <div>
        <nav class="navbar navbar-expand-xl">
            <div class="container-fluid g-3 p-3">
                <a class="navbar-brand" href="#">AppForo</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarBasic" aria-controls="navbarBasic" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse show" id="navbarBasic">
                <ul class="navbar-nav me-auto mb-2 mb-xl-0">
                    <!-- <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="#">Home</a>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link" href="#">Link</a>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
                    </li> -->
                </ul>
                <div class="d-flex" v-if="user"> 
                    <div class="row g-3 align-items-center">
                        <div class="col-auto">
                            <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" role="switch" v-model="dark_mode">
                                <span v-show="dark_mode"> <i class="bi bi-moon-fill"></i></span>
                                <span v-show="!dark_mode"><i class="bi bi-brightness-high"></i></span>
                            </div>
                        </div>
                        <div class="col-auto">
                            <div class="dropdown">
                                <button class="btn btn-outline-success dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i class="bi bi-person-fill"></i> {{ user.user_metadata.username }}
                                </button>
                                <ul class="dropdown-menu  dropdown-menu-md-start dropdown-menu-xl-end" aria-labelledby="dropdownMenuButton">
                                    <!--<li><hr class="dropdown-divider"></li>-->
                                    <li><button type="button" class="dropdown-item" v-on:click.prevent="logout()"><i class="bi bi-box-arrow-left"></i> Cerrar Sesión</button></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div class="d-flex" v-else>
                    <div class="row g-3 align-items-center">
                        <div class="col-auto">
                            <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" role="switch" v-model="dark_mode">
                                <span v-show="dark_mode"> <i class="bi bi-moon-fill"></i></span>
                                <span v-show="!dark_mode"><i class="bi bi-brightness-high"></i></span>
                            </div>
                        </div>
                        <div class="col-md-auto">
                            <button class="btn btn-outline-success" type="button" v-on:click.prevent="login()">Iniciar Sesion</button>
                        </div>
                        <div class="col-md-auto">
                            <button class="btn btn-success" type="button" v-on:click.prevent="register()">Registrarte</button>
                        </div>
                    </div>
                </div>

                </div>
            </div>
        </nav>
        <Login :hash_login="hash_login" />
        <Register :hash_register="hash_register" /> 
        <slot />
    </div>
</template>

<script setup>
    const {auth} = useSupabaseClient()
    const hash_login = ref(0)
    const hash_register = ref(0)
    const dark_mode = ref(true)

    onMounted(() => {
        document.documentElement.setAttribute('data-bs-theme', 'dark')
    })

    watch(dark_mode, () => {
        if(dark_mode.value){
            dark_mode.value = true
            document.documentElement.setAttribute('data-bs-theme', 'dark')
        }else{
            dark_mode.value = false
            document.documentElement.setAttribute('data-bs-theme', 'light')
        }
    })

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