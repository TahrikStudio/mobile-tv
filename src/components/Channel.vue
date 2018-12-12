<template>
  <div>
    <div class="nav">
      <router-link :to="{name: 'Category', params: {categoryId: categoryId}}">
        <span id="back">❮</span>
      </router-link>
      <h2>{{channel.name}}</h2>
    </div>
    <iframe id="video-frame" class="loader" :src="channel.url + '?enablejsapi=1&rel=0'" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    <a id="external" @click="fullscreen" v-show="loaded">Play Fullscreen</a>
  </div>
</template>

<script>

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
    }
  },
  mounted: function () {
    let _self = this

    document.addEventListener('webkitfullscreenchange', toggleFullScreen, false)
    document.addEventListener('mozfullscreenchange', toggleFullScreen, false)
    document.addEventListener('fullscreenchange', toggleFullScreen, false)
    document.addEventListener('MSFullscreenChange', toggleFullScreen, false)

    function toggleFullScreen (event) {
      var fullscreenElement = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement

      if (fullscreenElement != null) {
        screen.orientation.lock('landscape')
        if (window.plugins) window.plugins.insomnia.keepAwake()
      } else {
        screen.orientation.lock('portrait')
        if (window.plugins) window.plugins.insomnia.allowSleepAgain()
      }
    }

    function initializeYT () {
      var tag = document.createElement('script')
      tag.id = 'iframe-demo'
      tag.src = 'https://www.youtube.com/iframe_api'
      var firstScriptTag = document.getElementsByTagName('script')[0]
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
    }

    function takeControl () {
      var player = new YT.Player('video-frame', {
        events: {
          'onReady': onPlayerReady
        }
      })
      console.log(player)
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
iframe {
  margin-top: 15vh;
}
a#external {
  background: #35b9ab;
  padding: 1rem;
  color: #173f4f;
  display: block;
  margin-top: 5vh
}
</style>
