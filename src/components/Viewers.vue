<template>
    <div class="info">
        <span v-if="count">{{count}} Viewers watching now</span>
    </div>
</template>

<script>

import axios from 'axios'
import CONST from '../assets/script/secret.js'

export default {
  name: 'Viewers',
  props: ['videoId'],
  methods: {
    fetchViewCount: function () {
      let _self = this
      axios.get('https://www.googleapis.com/youtube/v3/videos?part=liveStreamingDetails&key=AIzaSyBovDLYYp8II9LN1JTS_osdSyaR98FRHHA&id=bSWocTFWKPE', {
        params: {
          part: 'liveStreamingDetails',
          id: this.videoId,
          key: CONST.AUTH_KEY
        }
      })
        .then(function (response) {
          try {
            _self.count = response.data.items[0].liveStreamingDetails.concurrentViewers
          } catch (error) {
            console.error(error)
          }
          setTimeout(_self.fetchViewCount, 10000)
        })
    }
  },
  mounted: function () {
    this.fetchViewCount()
  },
  data () {
    return {
      count: false
    }
  }
}

</script>

<style>
  .info {
    padding: 1.5em;
    color: #ddd;
    padding-right: 0
  }
</style>
