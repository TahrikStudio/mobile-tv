<template>
  <div>
    <div class="categories" v-bind:key="index" v-for="(category, index) in categories">
      <router-link :to="{name: 'Category', params: {categoryId: index}}">
        {{category.name}}
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Menu',
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
.categories a{
  padding: .5em 1em;
  display: block;
  font-weight: bold;
  text-decoration: none;
  margin: .5em 1em;
  border: 1px solid white;
  background: rgb(0, 122, 255);
  color: white;
  border-radius: 10px 10px;
}
</style>
