<template>
  <div>
    {{channel.name}}
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
    channel () {
      return this.$store.state.data.categories[this.categoryId].channels[this.channelId]
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
