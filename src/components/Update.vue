<template>
  <div>
    <div class="nav">
      <h2>
        <router-link id="back" :to="{name: 'Menu'}"><img class="icon" src="../assets/meta/back.svg"></router-link>Check for updates
      </h2>
    </div>
    <div class="content">
      <table>
        <tr>
          <td>Latest App Version</td>
          <td>{{latestVersion}}</td>
        </tr>
        <tr>
          <td>Current Version</td>
          <td>{{buildInfo.version}}</td>
        </tr>
        <tr>
          <td>Build Date</td>
          <td>{{buildInfo.buildDate}}</td>
        </tr>
        <tr>
          <td>Installed Date</td>
          <td>{{buildInfo.installDate}}</td>
        </tr>
      </table>
      <a id="update" v-if="updateAvailable" @click="update"><img class="icon" src="../assets/meta/cloud-white.svg">Update Now</a>
      <p v-else>No update available</p>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Update',
  methods: {
    update: function () {
      try {
        window.cordova.plugins.market.open('com.libreappfoundation.mobiletv')
      } catch (e) {
        console.log('failed to open market')
      }
    }
  },
  computed: {
    buildInfo: function () {
      return window.BuildInfo ? window.BuildInfo : {}
    },
    latestVersion: function () {
      return this.$store.state.data.meta ? this.$store.state.data.meta.version : 'NA'
    },
    updateAvailable: function () {
      // return true
      return this.latestVersion !== 'NA' && this.latestVersion > this.buildInfo.version
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content {
  margin-top: 3vh
}
table {
  text-align: left;
  width: 100%;
}
td {
  background: white;
  padding: 1em;
}
#update {
  margin: 1em;
  display: inline-block;
  background: var(--primary-color);
  color: white;
  padding: 1em;
}
</style>
