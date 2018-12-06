<template>
  <div id="app">
    <header>
      <h1>MobileTV</h1>
    </header>
    <router-view/>
  </div>
</template>

<script>
import json from './assets/data.json'

export default {
  name: 'App',
  mounted () {
    this.$store.commit('setData', json)
  }
}

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
}
h1, h2 {
  font-weight: normal;
}
h1 {
  margin-bottom: 0
}
header {
  border-bottom: 1px solid #eee;
  margin-bottom: 2em;
}
body {
  max-width: 720px;
  margin: auto;
}
</style>
