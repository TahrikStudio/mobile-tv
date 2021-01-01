<template>
  <div id='app'>
    <router-view/>
    <Notification v-if='notifications.length' :notification='notifications[0]' @closeApp='closeApp' @proceed='notifications = []'/>
  </div>
</template>

<script>
import axios from 'axios'
import json from './assets/data/data.json'
import {initializeRating} from './assets/script/rating.js'
import CommonUtils from './common/CommonUtils'
import Constants from './common/Constants'
import Notification from './components/Notification'
const STORAGE_KEY = 'mobile-tv-json'
window.log = ''
if (!console._log_old) {
  console._log_old = console.log
  console.log = function (...msgs) {
    let msg = msgs.reduce((previous, current) => {
      return previous + ' ' + current
    })
    console._log_old(msg)
    window.log += Date() + ' ' + msg + '<br>'
  }
  console.error = console.log
}

export default {
  name: 'App',
  data: function () {
    return {
      notifications: []
    }
  },
  components: {
    Notification
  },
  methods: {
    onDeviceReady: function () {
      console.log('device ready')

      document.removeEventListener('deviceready', this.onDeviceReady)

      // define backbutton functionality
      document.addEventListener('backbutton', this.onBackKeyDown, false)

      CommonUtils.showBannerAd()

      initializeRating()

      console.log('plugins loaded')

      console.log(JSON.stringify(window.plugins))

      console.log(JSON.stringify(window.cordova.plugins))

      let _self = this
      if (window.universalLinks) {
        console.log('universal links initing')
        window.universalLinks.subscribe('preview', function (eventData) {
          console.log('Did launch application from the link: ' + eventData.url)
          let paths = eventData.url.split('/')
          let videoId = paths[paths.length - 1]
          console.log('Video Id', videoId)
          console.log(this)
          console.log(_self)
          _self.$router.push({name: 'Preview', params: {videoId: videoId}})
        })
        window.universalLinks.subscribe(null, function (eventData) {
          console.log('event called without any event')
        })
      } else {
        console.log('univeral links not initing')
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
        this.closeApp()
      }
    },
    closeApp: function () {
      if (navigator.app) {
        navigator.app.exitApp()
      } else if (navigator.device) {
        navigator.device.exitApp()
      } else {
        window.close()
      }
    },
    checkNotifications: function () {
      let _self = this
      axios.get(`${Constants.REMOTE}notifications`).then(function (response) {
        _self.notifications = response.data
      }).catch(function (err) {
        console.log(err)
      })
    },
    getMetaInfo: function () {
      if (localStorage.getItem('meta') != null) {
        console.log('compliance is cached, skipping service call')
        window.meta = JSON.parse(localStorage.getItem('meta'))
        return
      }
      console.log('proceeding with compliance service call')
      axios.get(`${Constants.REMOTE}metainfo`).then(function (response) {
        window.meta = response.data
        if (window.meta.compliance === false) {
          console.log('compliance -> false: caching')
          localStorage.setItem('meta', JSON.stringify(window.meta))
        }
      }).catch(function (err) {
        console.log(err)
      })
      console.log('gracefull error log')
    }
  },
  mounted () {
    let localStorage = window.localStorage
    let data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || json

    this.$store.commit('setData', data)

    let _self = this
    // Try to load remote data, save it on local
    axios.get(`${Constants.REMOTE}getData`).then(function (response) {
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

    this.checkNotifications()

    this.getMetaInfo()
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
