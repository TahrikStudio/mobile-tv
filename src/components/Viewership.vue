<template>
  <div>
    <div class="nav">
      <h2>
        <router-link id="back" :to="{name: 'Category', params: {categoryId: categoryId}}"><img class="icon" src="../assets/meta/back.svg"></router-link>YouTube Viewership</h2>
    </div>
    <GChart v-if="chartData.length"
    type="BarChart"
    :data="chartData"
    :options="chartOptions"
    @ready="storeChart"
    />
    <Loader v-else />
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
    <div class="external" @click="share">
      <img src="../assets/meta/share.svg">
      Share
    </div>
  </div>
</template>

<script>

import axios from 'axios'
import CommonUtils from '../common/CommonUtils'
import Constants from '../common/Constants.js'
import { GChart } from 'vue-google-charts'
import Loader from './Loader'

export default {
  name: 'Viewership',
  components: {
    GChart,
    Loader
  },
  methods: {
    fetchViewCount: function (channelIds) {
      let _self = this
      axios.post(`${Constants.REMOTE}liveViewers`, channelIds)
        .then(function (response) {
          try {
            for (let channel of _self.channels) {
              channel.count = response.data[channel.channelId]
            }
            _self.channels.sort((a, b) => {
              if (a.count && b.count) return b.count - a.count
              if (a.count) return -1
              if (b.count) return 1
              return 0
            })
            _self.updateGraph()
            _self.$forceUpdate()
          } catch (error) {
            console.error(error)
          }
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
      if (!this.refreshEligible) return
      this.resetEligibility()
      this.chartData = []
      let _self = this
      let channelIds = []
      for (let channel of this.channels) {
        if (!channel.online) {
          channelIds.push(channel.channelId)
        }
      }
      _self.fetchViewCount(channelIds)
    },
    updateGraph: function () {
      let graphData = [['Channel', 'Viewers', { role: 'annotation' }, {role: 'style'}]]
      let colors = []
      for (let channel of this.channels) {
        let count = channel.count ? channel.count : 0
        let color = channel.color ? channel.color : CommonUtils.randomColor()
        graphData.push([channel.name, Number(count), count, color])
        colors.push(color)
      }
      this.chartOptions.colors = colors
      this.chartData = graphData
    },
    share: function () {
      console.log(this.chartObj.getImageURI())
      if (!window.plugins || !window.plugins.socialsharing) return
      window.plugins.socialsharing.share(this.chartOptions.title.split('\n')[0] + Constants.APP_LINK, null, this.chartObj.getImageURI(), null)
    },
    storeChart: function (chart, google) {
      this.chartObj = chart
    }
  },
  mounted: function () {
    this.chartOptions.title = 'YouTube Live Viewers\n' + (new Date()).toLocaleString()
    // this.fetchViewCount()
    console.log('mounted')

    if (CommonUtils.canShowAd()) {
      CommonUtils.showInterstitialAd()
    }

    let index = 0
    let channelIds = []
    for (let channel of this.category.channels) {
      if (!channel.online) {
        this.channels.push(channel)
        channel.index = index
        channelIds.push(channel.channelId)
      }
      index += 1
    }
    this.fetchViewCount(channelIds)
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
      refreshEligible: false,
      chartData: [],
      chartOptions: Constants.chartOptions
    }
  },
  watch: {
    category: function (category) {
      if (this.channels.length) return
      let index = 0
      let channelIds = []
      for (let channel of this.category.channels) {
        if (!channel.online) {
          this.channels.push(channel)
          channel.index = index
          channelIds.push(channel.channelId)
        }
        index += 1
      }
      this.fetchViewCount(channelIds)
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
