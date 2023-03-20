<template>
  <!-- TODO: Inserire il logo -->
  <nav class="navbar navbar-expand-lg bg-dark navbar-dark px-3">
    <div class="container-fluid">
      <a class="navbar-brand cursor-pointer" @click="toggleHomePage"
        >Luxory Rental Car Perugia</a
      >
    </div>
  </nav>
</template>

<script>
export default {
  inject: ["toggleHomePage"],
};
</script>

<style lang="scss" scoped>
.cursor-pointer {
  &:hover,
  &:active {
    cursor: pointer;
  }
}
</style>
