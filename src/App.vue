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
  methods: {
    onDeviceReady: function () {
      console.log('device ready')

      document.removeEventListener('deviceready', this.onDeviceReady)

      // define backbutton functionality
      document.addEventListener('backbutton', this.onBackKeyDown, false)

      // Integrate AdMobAds
      /* global admob */
      /* eslint no-undef: ["error", { "typeof": true }] */
      if (typeof admob !== 'undefined') {
        setTimeout(function () {
          admob.banner.config({
            id: 'ca-app-pub-6380671811722843/7999087406',
            isTesting: false,
            autoShow: true
          })
          admob.banner.prepare()
          admob.banner.show()
        }, 500)
      }
    },
    onBackKeyDown: function (e) {
      e.preventDefault()
      console.log('pressed backbutton')
      let back = document.getElementById('back')
      if (back && back.getAttribute('class') !== 'disabled') {
        back.click()
      } else {
        // Exit app
        if (navigator.app) {
          navigator.app.exitApp()
        } else if (navigator.device) {
          navigator.device.exitApp()
        } else {
          window.close()
        }
      }
    }
  },
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

    document.addEventListener('deviceready', this.onDeviceReady)
  }
}

</script>

<style>
:root {
  --primary-color: #007aff;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
h1, h2 {
  font-weight: normal;
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
  color: var(--primary-color);
  text-decoration: none;
}
body {
  max-width: 720px;
  margin: auto;
}
.nav {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding: 1em;
  background: var(--primary-color);
  color: white;
  text-align: left;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, .5)
}
.nav a {
  color: white;
}
#back {
  padding: 0 .5em;
}
#back.disabled {
  color: rgba(255, 255, 255, .5)
}
</style>
