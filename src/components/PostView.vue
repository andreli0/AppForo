<template>
  <v-container>
    <v-row>
      <v-col-12>
        <v-btn icon="mdi-arrow-left" />
        <span class="ml-2 size-9">{{ post_data.title }}</span>
      </v-col-12>
    </v-row>
  </v-container>
</template>

<script setup>
const route = useRoute()
const post_id = computed(() => route.params.id)
const { data: post_data } = useLazyFetch(`https://jsonplaceholder.typicode.com/posts/${post_id.value}`)
</script>

<style scoped>

</style>
