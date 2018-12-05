<template>
  <div>
    <h1>{{category.name}}</h1>
    <div v-bind:key="index" v-for="(channel, index) in category.channels">
      <router-link tag="li" :to="{name: 'Channel', params: {categoryId: categoryId, channelId: index}}">
        <a>{{channel.name}}</a>
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
      return this.$store.state.data.categories[this.categoryId]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
