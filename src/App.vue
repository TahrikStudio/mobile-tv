<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import axios from 'axios'
import json from './assets/data/data.json'

const STORAGE_KEY = 'mobile-tv-json'

export default {
  name: 'App',
  mounted () {
    let localStorage = window.localStorage
    let data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || json

    this.$store.commit('setData', data)

    let _self = this
    // Try to load remote data, save it on local
    axios.get('https://raw.githubusercontent.com/LibreAppFoundation/mobile-tv/master/src/assets/data/remote.json').then(function (response) {
      _self.$store.commit('setData', response.data)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(response.data))
    }).catch(function (err) {
      console.log(err)
    })

    // load scripts
    let script = document.createElement('script')
    script.setAttribute('src', 'cordova.js')
    document.head.appendChild(script)
  }
}

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
h1, h2 {
  font-weight: normal;
  display: inline;
}
h1 {
  margin-bottom: 0
}
h2 {
  margin-bottom: 0;
  margin-top: 0;
  font-size: 1.2rem;
  text-transform: uppercase;
}
a {
  color: white;
  text-decoration: none;
}
body {
  max-width: 720px;
  margin: auto;
  background: #173f4f;
  color: #35b9ab;
}
.nav {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding: 1em;
}
#back {
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 0 .5em;
  margin-right: 1em;
  float: left;
}
</style>
