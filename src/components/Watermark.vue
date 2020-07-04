<template>
  <div class="overlay-watermark">
    <div class="banner">Enlighten news</div>
  </div>
</template>

<script>

export default {
  name: 'Watermark'
}

</script>

<style scoped>
.overlay-watermark {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  opacity: 0.9
}
.banner {
  margin-top: 60px;
  text-align: right;
  padding: .5em;
  color: var(--primary-color);
}
</style>
