<template>
    <v-container fluid>
        <v-row v-for="n in 10" :key="n">
            <v-col align-self="center"  class="d-flex justify-center align-center">
                <PostCard community_name="nombre_comunidad" time="hace 50min." title="titulo" content="contenido" /> 
            </v-col>
        </v-row>
    </v-container>
        

</template>

<script setup>


</script>

<style scoped>

</style>