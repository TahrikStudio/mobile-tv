<template>
    <div class="info">
        <span v-if="count">{{count}} people watching now</span>
    </div>
</template>

<script>

import axios from 'axios'
import Constants from '../common/Constants.js'

export default {
  name: 'Viewers',
  props: ['channelId'],
  methods: {
    fetchViewCount: function () {
      let _self = this
      axios.get(`${Constants.REMOTE}liveCount/${this.channelId}`)
        .then(function (response) {
          try {
            _self.count = response.data
          } catch (error) {
            console.error(error)
          }
          _self.timeout = setTimeout(_self.fetchViewCount, 20000)
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
