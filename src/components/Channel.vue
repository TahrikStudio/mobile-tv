<template>
  <div>
    <div class="nav">
      <router-link :to="{name: 'Category', params: {categoryId: categoryId}}">
        <span id="back">❮</span>
      </router-link>
      <h2>{{channel.name}}</h2>
    </div>
    <div class="video-responsive">
      <iframe id="video-frame" class="loader" :src="channel.url + '?enablejsapi=1&rel=0'" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
    <a id="external" @click="fullscreen" v-show="loaded">Play Fullscreen</a>
  </div>
</template>

<script>
import CONST from '../assets/script/secret.js'
import axios from 'axios'

export default {
  name: 'Channel',
  data: function () {
    return {
      loaded: false
    }
  },
  computed: {
    categoryId () {
      return this.$route.params.categoryId
    },
    channelId () {
      return this.$route.params.channelId
    },
    category () {
      return this.$store.state.data.categories ? this.$store.state.data.categories[this.categoryId] : {name: ''}
    },
    channel () {
      return this.$store.state.data.categories ? this.$store.state.data.categories[this.categoryId].channels[this.channelId] : {name: ''}
    }
  },
  methods: {
    fullscreen: function () {
      var iframe = document.getElementById('video-frame')
      var requestFullScreen = iframe.requestFullScreen || iframe.mozRequestFullScreen || iframe.webkitRequestFullScreen
      if (requestFullScreen) {
        requestFullScreen.bind(iframe)()
      }
    },
    removeEventListeners: function () {
      // Why keep multiple listeners a time for same action.
      document.removeEventListener('webkitfullscreenchange', this.toggleFullScreen)
      document.removeEventListener('mozfullscreenchange', this.toggleFullScreen)
      document.removeEventListener('fullscreenchange', this.toggleFullScreen)
      document.removeEventListener('MSFullscreenChange', this.toggleFullScreen)
      document.removeEventListener('pause', this.stopVideo)
    },
    toggleFullScreen: function (event) {
      var fullscreenElement = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement

      if (fullscreenElement != null) {
        screen.orientation.lock('landscape')
        if (window.plugins) window.plugins.insomnia.keepAwake()
        /* global admob */
        /* eslint no-undef: ["error", { "typeof": true }] */
        if (window.admob) admob.banner.hide()
      } else {
        screen.orientation.lock('portrait')
        if (window.plugins) window.plugins.insomnia.allowSleepAgain()
        /* global admob */
        /* eslint no-undef: ["error", { "typeof": true }] */
        if (window.admob) admob.banner.show()
      }
    },
    stopVideo: function () {
      if (this.player) this.player.stopVideo()
    },
    getLiveStream: function () {
      axios.get('https://www.googleapis.com/youtube/v3/search',
        {
          params: {
            part: 'snippet',
            channelId: this.channel.channelId,
            eventType: 'live',
            type: 'video',
            key: CONST.AUTH_KEY
          }
        }).then(function (response) {
        console.log(response.data)
      }).catch(function (error) {
        console.log(error)
      })
    }
  },
  mounted: function () {
    this.removeEventListeners()

    let _self = this

    document.addEventListener('webkitfullscreenchange', this.toggleFullScreen)
    document.addEventListener('mozfullscreenchange', this.toggleFullScreen)
    document.addEventListener('fullscreenchange', this.toggleFullScreen)
    document.addEventListener('MSFullscreenChange', this.toggleFullScreen)
    document.addEventListener('pause', this.stopVideo)

    this.getLiveStream()

    function initializeYT () {
      var tag = document.createElement('script')
      tag.id = 'iframe-demo'
      tag.src = 'https://www.youtube.com/iframe_api'
      var firstScriptTag = document.getElementsByTagName('script')[0]
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
    }

    function takeControl () {
      _self.player = new YT.Player('video-frame', {
        events: {
          'onReady': onPlayerReady
        }
      })
      console.log(_self.player)
      function onPlayerReady (event) {
        event.target.playVideo()
        _self.loaded = true
      }
    }

    function loader () {
      /* global YT */
      /* eslint no-undef: ["error", { "typeof": true }] */
      if (typeof (YT) === 'undefined' || typeof (YT.Player) === 'undefined') {
        initializeYT()
        setTimeout(loader, 500)
      } else {
        takeControl()
      }
    }
    loader()
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h2 {
  margin-top: 0;
}
.loader {
  background: url('../assets/meta/loading.gif');
  background-size: 40px;
  background-repeat: no-repeat;
  background-position: center;
}
.video-responsive{
  overflow:hidden;
  padding-bottom:56.25%;
  position:relative;
  height:0;
  margin-top: 10vh;
}
.video-responsive iframe{
  left:0;
  top:0;
  height:100%;
  width:100%;
  position:absolute;
}
a#external {
  background: #35b9ab;
  padding: 1rem;
  color: #173f4f;
  display: block;
  margin-top: 5vh
}
</style>
