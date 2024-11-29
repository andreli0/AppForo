<template>
  <v-container v-if="post_status === 'success'">
    <v-row :align="'stretch'">
      <v-col cols="1">
        <v-btn
          icon="mdi-arrow-left"
          class="mr-3"
          @click.prevent="$router.back()"
        />
      </v-col>
      <v-col>
        <v-row :align="'stretch'">
          <v-col class="text-xl font-bold">
            {{ post_data.title }}
          </v-col>
        </v-row>
        <v-spacer />
        <v-row :align="'stretch'">
          <v-col class="mr-3">
            {{ post_data.body }}
          </v-col>
        </v-row>
        <v-row :align="'start'">
          <v-col class="space-x-3">
            <v-btn-group
              density="compact"
              rounded="pill"
              variant="tonal"
            >
              <v-btn
                icon="mdi-arrow-up-bold-outline"
                size="medium"
                class="pl-2"
              />
              <v-btn
                readonly
                size="small"
              >
                500
              </v-btn>
              <v-btn
                icon="mdi-arrow-down-bold-outline"
                size="medium"
                class="pr-2"
              />
            </v-btn-group>
            <v-btn
              variant="tonal"
              rounded="pill"
              prepend-icon="mdi-comment-outline"
            >
              {{ comments ? comments.length : 0 }}
            </v-btn>
            <v-btn
              variant="tonal"
              rounded="pill"
              prepend-icon="mdi-share-outline"
            >
              compartir
            </v-btn>
          </v-col>
        </v-row>
        <v-row
          v-for="items in comments"
          :key="items.id"
          :align="'stretch'"
        >
          <v-col>
            <v-card>
              <v-card-title>{{ items.name }}</v-card-title>
              <v-card-text>{{ items.body }}</v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
  <v-container v-else>
    <post-view-skeleton />
  </v-container>
</template>

<script setup>
const route = useRoute()
const post_id = computed(() => route.params.id)
const { data: post_data, status: post_status } = useLazyFetch(`https://jsonplaceholder.typicode.com/posts/${post_id.value}`)
const { data: comments, status: comments_status, refresh: refresh_comments } = useLazyFetch(`https://jsonplaceholder.typicode.com/posts/${post_id.value}/comments`)
console.log(post_data.value)
</script>

<style scoped>

</style>
