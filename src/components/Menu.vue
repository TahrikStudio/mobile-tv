<template>
  <div>
    <div class="nav">
      <h2>
      <a id="back" class="disabled">❮</a>
      Menu
      </h2>
    </div>
    <div class="categories">
      <div class="category" v-bind:key="index" v-for="(category, index) in categories">
        <router-link :to="{name: 'Category', params: {categoryId: index}}">
          {{category.name}}
        </router-link>
      </div>
      <div class="category">
        <a @click="exitApp">Leave App</a>
      </div>
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
  methods: {
    exitApp: function () {
      if (navigator.app) {
        navigator.app.exitApp()
      } else if (navigator.device) {
        navigator.device.exitApp()
      } else {
        window.close()
      }
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
.categories {
  margin-top: 20vh;
}
.category a{
  padding: .5em 1em;
  display: block;
  text-decoration: none;
  margin: .5em 1em;
  background: var(--primary-color);
  color: white;
  border-radius: 10px 10px;
  cursor: pointer;
}
</style>
