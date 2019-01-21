<template>
  <div class="channels">
    <div class="nav">
      <h2>
        <router-link id="back" :to="{name: 'Menu'}">❮</router-link>
        {{category.name}}
      </h2>
    </div>
    <div v-bind:key="index" class="channel" v-for="(channel, index) in category.channels">
      <router-link :to="{name: 'Channel', params: {categoryId: categoryId, channelId: index}}">
        <img v-if="channel.logo" :src="channel.logo">
        <img v-else src="../assets/logo/placeholder.png">
        <br/>
        {{channel.name}}
      </router-link>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Category',
  computed: {
    categoryId () {
      return this.$route.params.categoryId
    },
    category () {
      return this.$store.state.data.categories ? this.$store.state.data.categories[this.categoryId] : {channels: []}
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.channels {
  background: white;
}
.channel {
  display: inline-block;
  width: 25%;
  padding: .1em;
  margin: .5em .5em;
  /*border: 1px solid rgba(255, 255, 255, 0.1)*/
}
.channel img {
  display: block;
  margin: auto;
  max-width: 80%;
  max-height: 84px
}

@media (max-width: 350px) {
  .channel {
    width: 40%;
  }
}

@media (max-width: 270px) {
  .channel {
    width: 100%;
  }
}
</style>
