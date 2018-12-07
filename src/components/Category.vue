<template>
  <div>
    <router-link :to="{name: 'Menu'}">
      Home
    </router-link>
    <h2>{{category.name}}</h2>
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
h2 {
  margin-top: 0;
}
ul {
  list-style-type: none;
  padding: 0;
  text-align: left;
}
li {
  display: inline-block;
  margin: 0 10px;
}
.channel {
  display: inline-block;
  width: 33%;
  margin: 1em 0;
}
.channel img {
  display: block;
  margin: auto;
}

@media (max-width: 400px) {
  .channel {
    width: 50%;
  }
}

@media (max-width: 270px) {
  .channel {
    width: 100%;
  }
}
</style>
