<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import axios from 'axios'
import json from './assets/data/data.json'
import {initializeRating} from './assets/script/rating.js'
import CommonUtils from './common/CommonUtils'
const STORAGE_KEY = 'mobile-tv-json'
window.log = ''
if (!console._log_old) {
  console._log_old = console.log
  console.log = function (msg) {
    console._log_old(msg)
    window.log += Date() + ' ' + msg + '<br>'
  }
  console.error = console.log
}

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
            autoShow: false
          })
          admob.banner.prepare()

          admob.interstitial.config({
            id: 'ca-app-pub-6380671811722843/4584986697',
            autoShow: false
          })
          admob.interstitial.prepare()

          document.addEventListener('admob.banner.events.LOAD', function () {
            admob.banner.show()
          })

          document.addEventListener('admob.interstitial.events.CLOSE', function (event) {
            admob.interstitial.prepare()
            CommonUtils.setAdShown()
          })
        }, 500)
      }

      initializeRating()

      console.log('plugins loaded')

      console.log(JSON.stringify(window.plugins))

      console.log(JSON.strigify(window.cordova.plugins))
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
    axios.get('https://raw.githubusercontent.com/LibreAppFoundation/mobile-tv/master/src/assets/data/remote-2.json').then(function (response) {
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
  --primary-color: #00407f;
}
html {
  background: #f5f5f5;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  padding-top: 3.2rem;
}
h1, h2 {
  font-weight: normal;
  margin-bottom: 0;
}
h2 {
  margin-top: 0;
  font-size: 1.2rem;
  text-transform: uppercase;
}
a {
  color: black;
  text-decoration: none;
}
body {
  max-width: 720px;
  margin: auto;
}
.nav {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding: 1em .5em;
  background: var(--primary-color);
  color: white;
  text-align: left;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, .5);
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1
}
.icon {
  vertical-align: middle;
  margin-right: .5em;
  padding-right: .5em;
  border-right: 1px solid rgba(0, 0, 0, .2)
}
.nav a {
  color: white;
}
.external {
  background: var(--primary-color);
  color: white;
  display: inline-block;
  margin-top: 5vh;
  line-height: 3rem;
  padding: 0 1rem;
}
.external img {
  vertical-align: middle;
  padding-right: .2rem
}
.link {
  color: var(--primary-color);
  text-decoration: underline;
}
</style>
