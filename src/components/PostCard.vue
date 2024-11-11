<template>
  <v-card
    max-width="700"
    width="full"
    variant="elevated"
    hover
    @click.prevent="redirect()"
  >
    <v-card-title class="d-flex align-center">
      <span class="truncate">{{ title }}</span>
      <v-spacer />
      <v-menu>
        <template #activator="{ props }">
          <v-btn
            icon="mdi-dots-vertical"
            variant="text"
            v-bind="props"
          />
        </template>

        <v-list>
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
          >
            <template #prepend>
              <v-icon :icon="item.icon" />
            </template>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-card-title>
    <v-card-text>{{ content }}</v-card-text>
    <v-card-actions>
      <v-btn-group
        density="compact"
        rounded="pill"
        variant="tonal"
      >
        <v-btn
          icon="mdi-arrow-up-bold-outline"
          size="medium"
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
        />
      </v-btn-group>
      <v-btn
        variant="tonal"
        rounded="pill"
        prepend-icon="mdi-comment-outline"
      >
        35
      </v-btn>
      <v-btn
        variant="tonal"
        rounded="pill"
        prepend-icon="mdi-share-outline"
      >
        compartir
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
const props = defineProps({
  post_id: String,
  community_name: String,
  time: String,
  title: String,
  content: String,
})

const items = ref([
  { title: 'Guardar',
    icon: 'mdi-bookmark-outline',
  },
  { title: 'Ocultar',
    icon: 'mdi-eye-off',
  },
  { title: 'Reportar',
    icon: 'mdi-flag-variant-outline',
  },
])

const redirect = async () => await navigateTo(`posts/${props.post_id}`)
</script>

<style lang="scss" scoped>

</style>
