<template>
  <div>
    <div class="nav">
      <h2>
        <router-link id="back" :to="{name: 'Category', params: {categoryId: categoryId}}"><img class="icon" src="../assets/meta/back.svg"></router-link>YouTube Viewership</h2>
    </div>
    <table>
      <thead>
        <th>Rank</th>
        <th>Name</th>
        <th>Count</th>
      </thead>
      <tr v-bind:key="index" class="channel" v-for="(channel, index) in this.channels">
          <td>{{index + 1}}</td>
          <td>
            <router-link :to="{name: 'Channel', params: {categoryId: categoryId, channelId: channel.index, fromRank: true}}">
            <img v-if="channel.logo" :src="channel.logo">
            <img v-else src="../assets/logo/placeholder.png">
            {{channel.name}}
            </router-link>
          </td>
          <td>
            {{channel.count ? channel.count : '-'}}
          </td>
      </tr>
    </table>
    <a class="external" :class="{disabled: !refreshEligible}" @click="refresh"><img src="../assets/meta/refresh.svg">Refresh</a>
  </div>
</template>

<script>

import axios from 'axios'
import CONST from '../assets/script/secret.js'

export default {
  name: 'Viewership',
  methods: {
    fetchViewCount: function (channel) {
      if (!channel.videoId) return
      let _self = this
      axios.get('https://www.googleapis.com/youtube/v3/videos', {
        params: {
          part: 'liveStreamingDetails',
          id: channel.videoId,
          key: CONST.AUTH_KEY
        }
      })
        .then(function (response) {
          try {
            channel.count = response.data.items[0].liveStreamingDetails.concurrentViewers
            _self.channels.sort((a, b) => {
              if (a.count && b.count) return b.count - a.count
              if (a.count) return -1
              if (b.count) return 1
              return 0
            })
            _self.$forceUpdate()
          } catch (error) {
            console.error(error)
          }
        })
    },
    getVideoId: function (channel) {
      let _self = this
      axios.get('https://www.googleapis.com/youtube/v3/search',
        {
          params: {
            part: 'snippet',
            channelId: channel.channelId,
            eventType: 'live',
            type: 'video',
            key: CONST.AUTH_KEY
          }
        }
      )
        .then(function (response) {
          let data = response.data
          try {
            channel.videoId = data.items[0].id.videoId
            window.localStorage.setItem(channel.channelId, channel.videoId)
            _self.fetchViewCount(channel)
          } catch (e) {
            channel.videoId = window.localStorage.getItem(channel.channelId)
            _self.fetchViewCount(channel)
          }
        }).catch(function (error) {
          console.log(error)
          channel.videoId = window.localStorage.getItem(channel.channelId)
          _self.fetchViewCount(channel)
        })
    },
    resetEligibility: function () {
      this.refreshEligible = false
      let _self = this
      setTimeout(() => {
        _self.refreshEligible = true
      }, 5000)
    },
    refresh: function () {
      this.resetEligibility()
      let _self = this
      for (let channel of this.channels) {
        _self.fetchViewCount(channel)
      }
    }
  },
  mounted: function () {
    // this.fetchViewCount()
    console.log('mounted')
    /* global admob */
    /* eslint no-undef: ["error", { "typeof": true }] */
    if (window.admob) {
      if (window.adPeriod === 0) {
        admob.interstitial.show()
      }
      window.adPeriod = (window.adPeriod + 1) % 5
    }
    let index = 0
    for (let channel of this.category.channels) {
      if (!channel.online) {
        this.getVideoId(channel)
        this.channels.push(channel)
        channel.index = index
      }
      index += 1
    }
    this.resetEligibility()
  },
  computed: {
    categoryId () {
      return this.$route.params.categoryId
    },
    category () {
      return this.$store.state.data.categories ? this.$store.state.data.categories[this.categoryId] : {channels: []}
    }
  },
  data: function () {
    return {
      channels: [],
      refreshEligible: false
    }
  },
  watch: {
    category: function (category) {
      if (this.channels.length) return
      let index = 0
      for (let channel of this.category.channels) {
        if (!channel.online) {
          channel.index = index
          this.getVideoId(channel)
          this.channels.push(channel)
        }
        index += 1
      }
    }
  }
}

</script>

<style>
  table {
    padding-top: 1rem;
    width: 100%;
    border-bottom: 2px solid #ddd;
  }
  td + td, th + th {
    text-align: left;
  }
  td + td + td, th + th + th {
    text-align: right;
    padding-right: 1rem
  }
  td img {
    height: 20px;
  }
  td, th {
    background: white;
    padding: 1rem auto;
    height: 2rem;
  }
  td a {
    color: var(--primary-color)
  }
  th {
    height: 2rem
  }
  .external.disabled {
    color: #ddd;
    background: #00407f88
  }
</style>
