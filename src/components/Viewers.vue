<template>
    <div class="info">
        <span v-if="count">{{count}} people watching now</span>
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
      axios.get('https://www.googleapis.com/youtube/v3/videos', {
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
          _self.timeout = setTimeout(_self.fetchViewCount, 10000)
        })
    }
  },
  mounted: function () {
    this.fetchViewCount()
  },
  destroyed: function () {
    if (this.timeout) {
      clearTimeout(this.timeout)
      this.timeout = false
    }
    console.log('closed count')
  },
  data () {
    return {
      count: false,
      timeout: false
    }
  }
}

</script>

<style>
  .info {
    padding: 1.5em;
    color: var(--primary-color);
    padding-right: 0
  }
</style>
