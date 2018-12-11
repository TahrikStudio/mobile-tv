<template>
  <div>
    <div class="nav">
      <router-link :to="{name: 'Category', params: {categoryId: categoryId}}">
        <span id="back">❮</span>
      </router-link>
      <h2>{{channel.name}}</h2>
    </div>
    <div class="video-wrapper">
      <iframe id="video-frame" class="loader" :src="channel.url + '?enablejsapi=1'" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" width="100%" height="100%" allowfullscreen></iframe>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Channel',
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
  mounted: function () {
    console.log('mounted')

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
      });
      console.log (player)
      function onPlayerReady(event) {
        console.log('inside autoplay')
        event.target.playVideo()
      }
    }

    function loader () {
      if (typeof (YT) === 'undefined' || typeof (YT.Player) == 'undefined') {
        console.log ('not loader')
        initializeYT()
        setTimeout(loader, 500)
      } else {
        console.log('loaded')
        takeControl ()
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
  margin-top: 20vh;
}
a#external {
  background: #35b9ab;
  padding: 1rem;
  color: #173f4f;
  display: block;
  margin-top: 5vh
}
.video-wrapper {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 */
  padding-top: 25px;
  height: 0;
}
.video-wrapper iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
