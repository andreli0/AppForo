<template>
  <div>
    <div class="offcanvas-lg offcanvas-start" tabindex="-1" id="offcanvasResponsive"  data-bs-scroll="true" aria-labelledby="offcanvasResponsiveLabel">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasResponsiveLabel">AppForo</h5>
          <button type="button" class="btn-close" data-bs-dismiss="offcanvas" data-bs-target="#offcanvasResponsive" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        <div class="d-grid gap-2" id="sidebar">
          <button class="btn btn-outline-success" type="button"><i class="bi bi-house-door-fill"></i> Principal</button>
          <button class="btn btn-outline-success" type="button"><i class="bi bi-house-door-fill"></i> Principal</button>
          <button class="btn btn-outline-success" type="button"><i class="bi bi-house-door-fill"></i> Principal</button>
          <button class="btn btn-outline-success" type="button"><i class="bi bi-house-door-fill"></i> Principal</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>


</script>

<style scoped>

#sidebar{
  min-width: 250px;
}

</style>