<template>
  <div id="app">
    <header>
      <h1>MobileTV</h1>
    </header>
    <router-view/>
  </div>
</template>

<script>
import axios from 'axios'
import json from './assets/data.json'

const STORAGE_KEY = 'mobile-tv-json'

export default {
  name: 'App',
  mounted () {
    let localStorage = window.localStorage
    let data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || json

    this.$store.commit('setData', data)

    let _self = this
    // Try to load remote data, save it on local
    axios.get('https://raw.githubusercontent.com/LibreAppFoundation/mobile-tv/master/src/assets/remote.json').then(function (response) {
      _self.$store.commit('setData', response.data)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(response.data))
    }).catch(function (err) {
      console.log(err)
    })
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
