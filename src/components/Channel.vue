<template>
  <div>
    <router-link :to="{name: 'Menu'}">
      Home
    </router-link>
    ❯
    <router-link :to="{name: 'Category', params: {categoryId: categoryId}}">
     {{category.name}}
   </router-link>
    <h2>{{channel.name}}</h2>
    <iframe :src="channel.url" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  </div>
</template>

<script>

export default {
  name: 'Channel',
  computed: {
    categoryId () {
      return this.$route.params.categoryId
    },
    channelId () {
      return this.$route.params.channelId
    },
    category () {
      return this.$store.state.data.categories[this.categoryId]
    },
    channel () {
      return this.$store.state.data.categories[this.categoryId].channels[this.channelId]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h2 {
  margin-top: 0;
}
a {
  color: #42b883
}
</style>
