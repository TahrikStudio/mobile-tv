<template>
  <div>
    <div class="nav">
      <h2>
        <router-link id="back" :to="{name: 'Menu'}"><img class="icon" src="../assets/meta/back.svg"></router-link>Shared Video
      </h2>
    </div>
    <Video :title="title" :videoId="videoId" v-if="play"/>
  </div>
</template>

<script>
import Video from './Video'
import Loader from './Loader'

export default {
  name: 'Preview',
  data: function () {
    return {
      play: false,
      title: '',
      videos: [],
      error: false
    }
  },
  components: {
    Video,
    Loader
  },
  mounted: function () {
    this.play = true
  },
  computed: {
    videoId () {
      return this.$route.params.videoId
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.channels {
  display: grid;
  grid-template-columns: repeat(2, auto);
  grid-gap: .2em;
  margin-top: 2vh
}
.channel {
    background-color: white;
    padding: .5em;
    box-shadow: 1px 1px 1px #ddd;
    position: relative;
    word-break: break-all;
}
.channel a {
  position: absolute;
  left: 0;
  right: 0;
  bottom: .5em;
}
.channel img {
  display: block;
  margin: auto;
  max-width: 80%;
}
</style>
