<template>
  <div>
    <router-link :to="{name: 'Menu'}">
      Home
    </router-link>
    <h2>{{category.name}}</h2>
    <div v-bind:key="index" class="channels" v-for="(channel, index) in category.channels">
      <router-link :to="{name: 'Channel', params: {categoryId: categoryId, channelId: index}}">
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
.channels a{
  padding: .5em 1em;
  display: block;
  font-weight: bold;
  text-decoration: none;
  margin: .5em 1em;
  border: 1px solid white;
  background: rgb(0, 122, 255);
  color: white;
}
</style>
