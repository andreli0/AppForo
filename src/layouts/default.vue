<template>
    <v-app>
        <v-app-bar color="primary" :elevation="1">
            <template v-slot:prepend>
                <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            </template>

            <v-app-bar-title>AppForo</v-app-bar-title>
            <v-spacer></v-spacer>
            <v-btn v-if="user" variant="outlined" prepend-icon="mdi-account">{{user.user_metadata.username}}</v-btn>
            <template v-if="mdAndUp">
                <template v-if="user">
                    <v-btn type ="button" variant="outlined" prepend-icon="mdi-exit-to-app" class="ml-2" @click.prevent="logout()">Cerrar Sesion</v-btn>
                </template>
                <template v-else>                
                    <v-btn  variant="outlined" ref="btnLogin">Iniciar Sesión</v-btn>
                    <v-btn variant="outlined" ref="btnRegister" class="ml-2">Regístrate</v-btn>
                </template>
            </template>
            <template v-else>
                <v-menu
                transition="scale-transition"
                >
                    <template v-slot:activator="{ props }">
                    <v-btn icon="mdi-dots-vertical" variant="text" v-bind="props"></v-btn>
                    </template>
                    <v-list nav v-if="user">
                        <v-list-item prepend-icon="mdi-exit-to-app" title="Cerrar sesión" @click.prevent="logout()"></v-list-item>
                    </v-list>
                    <v-list nav v-else>
                        <v-list-item ref="btnLogin" title="Iniciar Sesión"></v-list-item>
                        <v-list-item ref="btnRegister" title="Registrate"></v-list-item>
                    </v-list>
            </v-menu>
            </template>
        </v-app-bar>
        <v-navigation-drawer        
        v-model="drawer"
        :location="mobile ? 'left' : undefined"
        >
            <v-list v-model:opened="open" nav>
                <v-list-item link v-for="(item, i) in items.items" :key="i" :title="item.title" :prepend-icon="item.icon"></v-list-item>
                <v-divider></v-divider>
                <v-list-group value="Users"  v-if="items.themes.length > 0" nav>
                    <template v-slot:activator="{ props }">
                        <v-list-item v-bind="props" title="TEMAS"></v-list-item>
                    </template>
                    <v-list-item link v-for="(item, i) in items.themes" :prepend-icon="item.icon" :title="item.title"></v-list-item>
                </v-list-group>
            </v-list>
            <template v-slot:append>
                <p class="text-xs p-4 text-slate-300">Andrelio Inc. © 2024.Todos los derechos reservados.</p>
            </template>
        </v-navigation-drawer>
        <v-main>
            <slot />
        </v-main>
    </v-app>
    <Login :btnLogin="btnLogin" />
    <Register :btnRegister="btnRegister" />
</template>

<script setup>
import { computed } from 'vue';
const {auth} = useSupabaseClient()
const hash_login = ref(0)
const hash_register = ref(0)
const drawer = ref(false)
const isMounted = ref(false)
const btnLogin = ref(null)
const btnRegister = ref(null)
const open = ref(['Users'])
const items = reactive({
    items: [    {
        title: 'Principal',
        value: 'foo',
        icon: 'mdi-home-outline'

    },
    {
        title: 'Popular',
        value: 'foo',
        icon: 'mdi-trending-up'
    },
    ],
    themes: [
        {
            title: 'Juegos',
            value: 'foo',
            icon: 'mdi-controller-classic-outline'
        },
        {
            title: 'Tecnología',
            value: 'foo',
            icon: 'mdi-chip'
        },
        {
            title: 'Películas y TV',
            value: 'foo',
            icon: 'mdi-movie-open-outline'
        },
        {
            title: '',
            value: 'foo',
            icon: ''
        },
    ]
})

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