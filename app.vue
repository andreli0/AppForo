<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>

//const user = useSupabaseUser()

onMounted(() => {
  document.documentElement.setAttribute('data-bs-theme', 'dark')
})
</script>
