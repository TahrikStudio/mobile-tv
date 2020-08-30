<template>
  <div>
    <div class="nav">
      <h2>
        <router-link id="back" :to="{name: fromRank ? 'Viewership' : 'Category', params: {categoryId: categoryId}}"><img class="icon" src="../assets/meta/back.svg"></router-link>{{channel.name}}
      </h2>
    </div>
    <div class="video-responsive">
      <div v-if="error">
        {{error.message}}<br/><br/>
        {{error.technical}}
      </div>
      <div id="video-frame"></div>
      <Loader v-if="!loaded && !error" />
    </div>
    <a class="external" @click="fullscreen" v-if="loaded"><img src="../assets/meta/fullscreen.svg">Play Fullscreen</a>
    <a class="external" @click="share" v-if="loaded">
      <img src="../assets/meta/share.svg">Share
    </a>
    <Viewers v-if="videoId && !isFullscreen && playing" :videoId="videoId"></Viewers>
    <div v-else><br/><br/></div>
    <router-link class="link" :to="{name: 'Videos', params: {categoryId: categoryId, channelId: channelId, live: true}}">
      Latest videos from {{channel.name}}
    </router-link>

  </div>
</template>

<script>
import Constants from '../common/Constants.js'
import axios from 'axios'
import Viewers from './Viewers'
import Loader from './Loader'

export default {
  name: 'Channel',
  data: function () {
    return {
      loaded: false,
      error: false,
      videoId: false,
      isFullscreen: false,
      self: {},
      playing: false
    }
  },
  components: {
    Viewers,
    Loader
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
    },
    fromRank () {
      return this.$route.params.fromRank ? this.$route.params.fromRank : false
    }
  },
  methods: {
    share: function () {
      let shareMessage = `Watch ${this.channel.name} Live: ${Constants.PREVIEW_LINK}${this.videoId}${Constants.APP_LINK}`
      console.log(shareMessage)
      if (window.plugins && window.plugins.socialsharing) {
        window.plugins.socialsharing.share(shareMessage)
      }
    },
    fullscreenSuccess: function () {
      console.log('fullscreen success')
    },
    fullscreenError: function (error) {
      console.log('fullscreen error' + error)
    },
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
      document.removeEventListener('pause', this.pauseVideo)
    },
    toggleFullScreen: function (event) {
      var fullscreenElement = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement

      if (fullscreenElement != null) {
        this.isFullscreen = true
        screen.orientation.lock('landscape')
        /* global admob */
        /* eslint no-undef: ["error", { "typeof": true }] */
        if (window.admob) admob.banner.hide()
        /* global AndroidFullScreen */
        /* eslint no-undef: ["error", { "typeof": true }] */
        if (window.AndroidFullScreen) {
          AndroidFullScreen.immersiveMode(this.fullscreenSuccess, this.fullscreenError)
        }
      } else {
        this.isFullscreen = false
        screen.orientation.lock('portrait')
        /* global admob */
        /* eslint no-undef: ["error", { "typeof": true }] */
        if (window.admob) admob.banner.show()
        /* global AndroidFullScreen */
        /* eslint no-undef: ["error", { "typeof": true }] */
        if (window.AndroidFullScreen) {
          AndroidFullScreen.showSystemUI(this.fullscreenSuccess, this.fullscreenError)
        }
      }
    },
    stopVideo: function () {
      if (this.player) this.player.stopVideo()
    },
    pauseVideo: function () {
      if (this.player) this.player.pauseVideo()
    },
    getLiveStream: function () {
      let _self = this

      function initializeYT () {
        var tag = document.createElement('script')
        tag.id = 'iframe-demo'
        tag.src = 'https://www.youtube.com/iframe_api'
        var firstScriptTag = document.getElementsByTagName('script')[0]
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
      }

      function onPlayerReady (event) {
        event.target.playVideo()
        _self.loaded = true
        // trick to show scoped css
        document.getElementsByTagName('iframe')[0].setAttribute(_self.$options._scopeId, '')
      }

      function onPlayerStateChange (event) {
        if (event.data === YT.PlayerState.PLAYING) {
          console.log('playing video')
          if (window.plugins) window.plugins.insomnia.keepAwake()
          _self.playing = true
          if (window.meta.compliance && window.admob) admob.banner.hide()
        } else if (event.data === YT.PlayerState.PAUSED || event.data === YT.PlayerState.ENDED) {
          console.log('video paused or ended')
          if (window.plugins) window.plugins.insomnia.allowSleepAgain()
          _self.playing = false
          if (!self.isFullScreen && window.meta.compliance && window.admob) admob.banner.show()
        }
      }

      function takeControl () {
        if (_self.videoId) {
          _self.player = new YT.Player('video-frame', {
            videoId: _self.videoId,
            width: '100%',
            height: '100%',
            events: {
              'onReady': onPlayerReady,
              'onStateChange': onPlayerStateChange
            }
          })
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

      function getFromSession () {
        try {
          if (window.localStorage.getItem(_self.channel.channelId)) {
            // Could not retrieve live stream id. Try with previously retrieved id.
            _self.videoId = window.localStorage.getItem(_self.channel.channelId)
            _self.$nextTick(function () {
              loader()
            })
          }
        } catch (e) {
          _self.error = {
            'message': 'Failed to retrieve live stream id from session',
            'technical': e
          }
        }
      }

      axios.get(`${Constants.REMOTE}liveStream/${this.channel.channelId}`)
        .then(function (response) {
          let data = response.data
          try {
            console.log(data)
            if (data === '') {
              throw new Error('No live streaming found for ' + _self.channel.name)
            }
            _self.videoId = data
            console.log('retrieved')
            window.localStorage.setItem(_self.channel.channelId, _self.videoId)
            _self.$nextTick(function () {
              loader()
            })
          } catch (e) {
            console.error(e)
            getFromSession()
            _self.error = {
              'message': 'No live streaming available at the moment. Please try after some time',
              'technical': e
            }
          }
        }).catch(function (error) {
          console.error(error)
          getFromSession()
          _self.error = {
            'message': 'No live streaming available at the moment. Please try after some time',
            'technical': error
          }
        })
    }
  },
  mounted: function () {
    this.removeEventListeners()
    document.addEventListener('webkitfullscreenchange', this.toggleFullScreen)
    document.addEventListener('mozfullscreenchange', this.toggleFullScreen)
    document.addEventListener('fullscreenchange', this.toggleFullScreen)
    document.addEventListener('MSFullscreenChange', this.toggleFullScreen)
    document.addEventListener('pause', this.pauseVideo)

    if (this.channel.channelId) {
      this.getLiveStream()
    }
  },
  beforeDestroy: function () {
    if (window.plugins) window.plugins.insomnia.allowSleepAgain()
    if (window.meta.compliance && window.admob) admob.banner.show()
  },
  watch: {
    'channel.channelId': function (channelId) {
      if (channelId) {
        this.getLiveStream()
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h2 {
  margin-top: 0;
}
.video-responsive{
  margin-top: 5vh;
  overflow:hidden;
  padding-bottom:56.25%;
  position:relative;
  height:0;
}
.video-responsive iframe{
  left:0;
  top:0;
  height:100%;
  width:100%;
  position:absolute;
}
</style>
