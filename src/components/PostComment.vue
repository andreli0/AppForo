<template>
  <v-card>
    <v-card-title>{{ name }}</v-card-title>
    <v-card-subtitle>{{ email }}</v-card-subtitle>
    <v-card-text>{{ body }}</v-card-text>
  </v-card>
</template>

<script setup>
const props = defineProps({
  name: String,
  email: String,
  body: String,
})
</script>

<style scoped>

</style>
