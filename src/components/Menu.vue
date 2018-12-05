<template>
  <div>
    <div v-bind:key="index" v-for="(category, index) in categories">
      <router-link tag="li" :to="{name: 'Category', params: {categoryId: index}}">
        <a>{{category.name}}</a>
      </router-link>
    </div>
  </div>
</template>

<script>
import json from '../assets/data.json'
export default {
  name: 'Menu',
  mounted () {
    this.$store.commit('setData', json)
  },
  computed: {
    categories () {
      return this.$store.state.data.categories || []
    }
  },
  data () {
    return {
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
