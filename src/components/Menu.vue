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
      <hr>
      <div class="category">
        <router-link :to="{name: 'Update'}">
          Check for Update
        </router-link>
      </div>
      <div class="category">
        <a @click="openRateDialog">Rate Us</a>
      </div>
      <div class="category">
        <a @click="exitApp">Exit</a>
      </div>
    </div>
  </div>
</template>

<script>
import {openRateDialog} from '../assets/script/rating.js'
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
    },
    openRateDialog: function () {
      openRateDialog()
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
.categories {
  margin-top: 10vh;
}
.category a{
  padding: 1em 1em;
  display: block;
  text-decoration: none;
  margin: .5em 0em;
  background: var(--primary-color);
  color: white;
  cursor: pointer;
  text-align: left;
  text-transform: uppercase;
}
.category a:before {
  content: '⇨';
  padding-right: .5em;
  margin-right: .5em;
  border-right: 1px solid rgba(0, 0, 0, .2)
}
hr {
  border: none;
  margin-bottom: 2em;
}
</style>
