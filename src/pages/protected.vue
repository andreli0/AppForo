<template>
  <div>
    <div>
      <div
        class="d-flex justify-content-center align-items-center"
        style="height: 90vh;"
      >
        <div class="card bg-secondary">
          <div class="card-body mt-2 g-3 p-4">
            <div class="row">
              <div class="col-md-12">
                <button
                  type="button"
                  class="btn btn-outline-primary"
                  @click.prevent="logout()"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'auth',
})

const { auth } = useSupabaseClient()

const logout = async () => {
  const { error } = await auth.signOut()
  if (error) {
    console.log(error.message)
  }
  else {
    navigateTo('/')
  }
}
</script>

<style lang="scss" scoped>

</style>
