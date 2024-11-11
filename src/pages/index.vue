<template>
  <v-container fluid>
    <v-btn @click.prevent="refresh">
      recargar
    </v-btn>
    <v-row v-if="error">
      <v-alert
        :text="error"
        type="error"
      />
    </v-row>
    <v-row
      v-for="i in 5"
      v-if="status === 'pending'"
      :key="i"
    >
      <v-col
        align-self="center"
        class="d-flex justify-center align-center"
      >
        <PostCardSkeleton width="700" />
      </v-col>
    </v-row>
    <v-row
      v-for="item in posts"
      v-else
      :key="item.id"
    >
      <v-col
        align-self="center"
        class="d-flex justify-center align-center"
      >
        <PostCard
          :post_id="item.id"
          community_name="nombre_comunidad"
          time="hace 50min."
          :title="item.title"
          :content="item.body"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
const { auth } = useSupabaseClient()

const { error, data: posts, status, refresh } = useLazyFetch('https://jsonplaceholder.typicode.com/posts')
</script>

<style scoped>

</style>
