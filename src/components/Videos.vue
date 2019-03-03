<template>
  <div>
    <div class="nav">
      <h2>
        <router-link id="back" :to="{name: live ? 'Channel' : 'Category', params: {categoryId: categoryId, channelId: channelId}}"><img class="icon" src="../assets/meta/back.svg"></router-link>{{channel.name}}
      </h2>
    </div>
    <Video :title="title" :videoId="videoId" v-if="play"/>
    <h3>Latest videos from {{channel.name}}</h3>
    <div class="channels">
      <div @click="playVideo(video)" v-bind:key="index" class="channel" v-for="(video, index) in videos">
        <img :src="thumbnail(video)">
        {{video.snippet.title.split('|')[0]}} <br> {{video.snippet.publishedAt.split('T')[0]}}
      </div>
    </div>
    <a class="external" :href="'https://www.youtube.com/channel/' + channel.channelId">
      More Videos from {{channel.name}}
    </a>
  </div>
</template>

<script>
import axios from 'axios'
import CONST from '../assets/script/secret.js'
import Video from './Video'

export default {
  name: 'Category',
  data: function () {
    return {
      play: false,
      videoId: '',
      title: false,
      videos: []
    }
  },
  components: {
    Video
  },
  methods: {
    playVideo: function (video) {
      this.play = true
      this.videoId = video.id.videoId
      this.title = video.snippet.title
    },
    thumbnail: function (video) {
      let thumbnail = '../assets/logo/placeholder.png'
      try {
        thumbnail = video.snippet.thumbnails.medium.url
      } catch (e) {
        console.log(e)
      }
      return thumbnail
    },
    fetchChannels: function () {
      let _this = this
      axios.get('https://www.googleapis.com/youtube/v3/search', {
        params: {
          part: 'snippet',
          channelId: this.channel.channelId,
          key: CONST.AUTH_KEY,
          order: 'date',
          maxResults: 8
        }
      })
        .then(function (response) {
          let data = response.data
          _this.videos = data.items
        })
    }
  },
  mounted: function () {
    if (this.channel.channelId) {
      this.fetchChannels()
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
    },
    live () {
      return this.$route.params.live
    }
  },
  watch: {
    'channel.channelId': function (channelId) {
      if (channelId) {
        this.fetchChannels()
      }
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
