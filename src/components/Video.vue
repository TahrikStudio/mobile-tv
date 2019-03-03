<template>
  <div>
    <h3>{{title}}</h3>
    <div class="video-responsive">
      <div v-if="error">
        {{error.message}}<br/><br/>
        technical : {{error.technical}}
      </div>
      <div id="video-frame"></div>
      <div v-if="!loaded" class="loader"></div>
    </div>
    <a class="external" @click="fullscreen" v-if="loaded"><img src="../assets/meta/fullscreen.svg">Play Fullscreen</a>
  </div>
</template>

<script>

export default {
  name: 'Video',
  props: {
    videoId: false,
    title: false
  },
  data: function () {
    return {
      loaded: false,
      error: false
    }
  },
  methods: {
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
        /* global AndroidFullScreen */
        /* eslint no-undef: ["error", { "typeof": true }] */
        if (window.AndroidFullScreen) {
          AndroidFullScreen.immersiveMode(this.fullscreenSuccess, this.fullscreenError)
        }
      } else {
        screen.orientation.lock('portrait')
        if (window.plugins) window.plugins.insomnia.allowSleepAgain()
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
    playVideo: function () {
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
        window.scrollTo(0, 0)
      }

      function takeControl () {
        if (_self.videoId) {
          _self.player = new YT.Player('video-frame', {
            videoId: _self.videoId,
            width: '100%',
            height: '100%',
            events: {
              'onReady': onPlayerReady
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
      loader()
    }
  },
  mounted: function () {
    this.removeEventListeners()
    document.addEventListener('webkitfullscreenchange', this.toggleFullScreen)
    document.addEventListener('mozfullscreenchange', this.toggleFullScreen)
    document.addEventListener('fullscreenchange', this.toggleFullScreen)
    document.addEventListener('MSFullscreenChange', this.toggleFullScreen)
    document.addEventListener('pause', this.stopVideo)
    this.playVideo()
  },
  watch: {
    'videoId': function (videoId) {
      if (this.player) {
        this.player.loadVideoById(videoId)
      } else {
        this.playVideo()
      }
      window.scrollTo(0, 0)
    }
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
  min-height: 100px;
  margin-top: 10vh;
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
