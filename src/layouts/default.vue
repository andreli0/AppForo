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
                <v-btn variant="outlined" prepend-icon="mdi-account">{{user.user_metadata.username}}</v-btn>
                <v-btn type ="button" variant="outlined" prepend-icon="mdi-exit-to-app" class="ml-2" @click.prevent="logout()">Cerrar Sesion</v-btn>
            </template>
            <template v-else>                
                <v-btn  variant="outlined" ref="btnLogin">Iniciar Sesion</v-btn>
                <v-btn variant="outlined" ref="btnRegister" class="ml-2">Registrate</v-btn>
            </template>

        </template>
        <template v-else>
            <v-menu 
            transition="scale-transition"
            >
                <template v-slot:activator="{ props }">
                <v-btn icon="mdi-dots-vertical" variant="text" v-bind="props"></v-btn>
                </template>

                <v-list>
                    <v-list-item ref="btnLogin" title="Iniciar Sesion"></v-list-item>
                    <v-list-item ref="btnRegister" title="Registrate"></v-list-item>
                </v-list>
          </v-menu>
        </template>
        
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