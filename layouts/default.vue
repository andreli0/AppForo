<template>
    <div>
        <nav class="navbar navbar-expand-xl">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">AppForo</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarBasic" aria-controls="navbarBasic" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse show" id="navbarBasic">
                <ul class="navbar-nav me-auto mb-2 mb-xl-0">
                    <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="#">Home</a>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link" href="#">Link</a>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
                    </li>
                </ul>
                <form class="d-flex">
                    <div class="row g-3">
                        <div class="col-md-auto">
                            <button class="btn btn-outline-success" type="button" v-on:click.prevent="login()">Iniciar Sesion</button>
                        </div>
                        <div class="col-md-auto">
                            <button class="btn btn-success" type="button">Registrarte</button>
                        </div>
                    </div>

                </form>
                </div>
            </div>
        </nav>
        <Login :hash_login="hash_login" />
        <slot />
    </div>
</template>

<script setup>
    const hash_login = ref(0)

    const login = () => {
        hash_login.value = Math.random(1,9999999)
    }
</script>

<style lang="scss" scoped>

</style>