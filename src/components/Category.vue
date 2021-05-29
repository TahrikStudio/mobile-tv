<template>
  <div>
    <div class="nav">
      <h2>
        <router-link id="back" :to="{name: 'Menu'}"><img class="icon" src="../assets/meta/back.svg"></router-link>{{category.name}}
      </h2>
    </div>
    <div class="channels">
      <div v-bind:key="index" class="channel" v-if="!channel.hide" v-for="(channel, index) in category.channels">
        <router-link @click="load=true" :to="{name: channel.online ? 'Videos':'Channel', params: {categoryId: categoryId, channelId: index}}">
          <img v-if="channel.logo" :src="channel.logo">
          <img v-else src="../assets/logo/placeholder.png">
          <div class="name">
          {{channel.name}}
          </div>
        </router-link>
      </div>
    </div>
    <router-link @click="load=true" v-if="hasLiveStreaming" class="link" :to="{name: 'Viewership', params: {categoryId: categoryId}}">
    Youtube Live Viewership Rank
    </router-link>
    <router-link @click="load=true" class="link" :to="{name: 'Subscribers', params: {categoryId: categoryId}}">
    Youtube Subscriber Rank
    </router-link>
    <Loader v-if="load"/>
  </div>
</template>

<script>
import Loader from './Loader'

export default {
  name: 'Category',
  components: {
    Loader
  },
  mounted: function () {
    this.$nextTick(() => {
      this.load = false
    })
  },
  data: function () {
    return {
      load: true
    }
  },
  computed: {
    categoryId () {
      return this.$route.params.categoryId
    },
    category () {
      return this.$store.state.data.categories ? this.$store.state.data.categories[this.categoryId] : {channels: []}
    },
    hasLiveStreaming () {
      for (let channel of this.category.channels) {
        if (!channel.online) {
          return true
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.channels {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: .2em;
  margin-top: 2vh
}
.channel {
    background-color: white;
    padding: .5em;
    box-shadow: 1px 1px 1px #ddd;
    position: relative;
    height: 120px;
    word-break: break-all
}
.channel:active {
  background: #eee;
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
  max-height: 84px;
  border-radius: .3rem
}
.channel .name {
  height: 2rem;
  margin-top: .5rem;
}
.link {
  margin: 1rem 1rem;
  display: block;
  background: white;
  padding: 1rem 0;
  box-shadow: 1px 1px 1px #ddd;
  text-decoration: none;
}
.link:active {
  background: #eee;
}
</style>
