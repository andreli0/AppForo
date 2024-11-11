<template>
  <div>
    <v-skeleton-loader
      type="card"
      :width="width"
      max-width="700"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  width: String,
})
</script>
