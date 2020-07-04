<template>
  <div>
    <div class="nav">
      <h2>
        <router-link id="back" :to="{name: 'Category', params: {categoryId: categoryId}}"><img class="icon" src="../assets/meta/back.svg"></router-link>YouTube Subscribers</h2>
    </div>
    <GChart v-if="chartData.length"
    type="BarChart"
    :data="chartData"
    :options="chartOptions"
    @ready="storeChart"
    />
    <Loader v-else />
    <div class="external" @click="share">
      <img src="../assets/meta/share.svg">
      Share
    </div>
  </div>
</template>

<script>

import axios from 'axios'
import CONST from '../assets/script/secret.js'
import CommonUtils from '../common/CommonUtils'
import Constants from '../common/Constants.js'
import { GChart } from 'vue-google-charts'
import Loader from './Loader'

export default {
  name: 'Subscribers',
  components: {
    GChart,
    Loader
  },
  methods: {
    getSubscribers: function (channel) {
      let _self = this
      axios.get('https://www.googleapis.com/youtube/v3/channels',
        {
          params: {
            part: 'statistics',
            id: channel.channelId,
            key: CONST.AUTH_KEY
          }
        }
      )
        .then(function (response) {
          let data = response.data
          channel.subscribers = data.items[0].statistics.subscriberCount
          _self.channels.sort((a, b) => {
            if (a.subscribers && b.subscribers) return b.subscribers - a.subscribers
            if (a.subscribers) return -1
            if (b.subscribers) return 1
            return 0
          })
          _self.updateGraph()
        }).catch(function (error) {
          console.log(error)
        })
    },
    updateGraph: function () {
      let graphData = [['Channel', 'Subscribers', { role: 'annotation' }, {role: 'style'}]]
      for (let channel of this.channels) {
        let color = channel.color ? channel.color : CommonUtils.randomColor()
        let subs = channel.subscribers ? channel.subscribers : 0
        graphData.push([channel.name, Number(subs), subs, color])
      }
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
    this.chartOptions.title = 'YouTube Subscribers\n' + (new Date()).toLocaleString()
    // this.fetchViewCount()
    console.log('mounted')
    /* global admob */
    /* eslint no-undef: ["error", { "typeof": true }] */
    if (window.admob) {
      if (CommonUtils.canShowAd()) {
        admob.interstitial.show()
      }
    }
    let index = 0
    for (let channel of this.category.channels) {
      this.getSubscribers(channel)
      this.channels.push(channel)
      channel.index = index
      index += 1
    }
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
      chartData: [],
      chartOptions: Constants.chartOptions
    }
  },
  watch: {
    category: function (category) {
      if (this.channels.length) return
      let index = 0
      for (let channel of this.category.channels) {
        if (!channel.online) {
          channel.index = index
          if (!channel.subscribers) {
            this.getSubscribers(channel)
          }
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
