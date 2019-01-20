<template>
  <div>
    <div class="nav">
      <h2>
        <router-link id="back" :to="{name: 'Menu'}">
          ❮
        </router-link>
        Check for updates
      </h2>
    </div>
    <div class="content">
      <p>Latest app version: {{latestVersion}}</p>
      <p>Current app version: {{currentVersion}}</p>
      <hr>
      <a v-if="updateAvailable" @click="update">Update Now</a>
      <p v-else>No update available</p>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Update',
  methods: {
    update: function () {
      window.open('market://details?id=com.libreappfoundation.mobiletv')
    }
  },
  computed: {
    latestVersion: function () {
      return this.$store.state.data.meta ? this.$store.state.data.meta.version : 'NA'
    },
    currentVersion: function () {
      return '1.1.3'
    },
    updateAvailable: function () {
      return this.latestVersion !== 'NA' && this.latestVersion > this.currentVersion
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content {
  margin-top: 10vh
}
</style>
