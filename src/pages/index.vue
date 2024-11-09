<template>
    <v-container fluid>
        <v-row v-for="item in posts" :key="item.id">
            <v-col align-self="center"  class="d-flex justify-center align-center">
                <PostCard community_name="nombre_comunidad" time="hace 50min." :title="item.title" :content="item.body" /> 
            </v-col>
        </v-row>
    </v-container>
        

</template>

<script setup>


const { auth } = useSupabaseClient()

const {error, data: posts, execute} = useFetch("https://jsonplaceholder.typicode.com/posts")

</script>

<style scoped>

</style>