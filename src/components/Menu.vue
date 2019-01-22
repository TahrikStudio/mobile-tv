<template>
  <div>
    <div class="nav">
      <h2><a><img class="icon" src="../assets/meta/back-disabled.svg"></a>Menu</h2>
    </div>
    <div class="categories">
      <div class="category" v-bind:key="index" v-for="(category, index) in categories">
        <router-link :to="{name: 'Category', params: {categoryId: index}}">
          <img class="icon" src="../assets/meta/tv.svg">{{category.name}}
        </router-link>
      </div>
      <hr>
      <div class="category">
        <router-link :to="{name: 'Update'}">
          <img class="icon" src="../assets/meta/cloud.svg">Check for Update
        </router-link>
      </div>
      <div class="category">
        <a @click="openRateDialog"><img class="icon" src="../assets/meta/star.svg">Rate Us</a>
      </div>
      <div class="category">
        <a @click="exitApp"><img class="icon" src="../assets/meta/exit.svg">Exit</a>
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
  margin-top: 5vh;
}
.category a{
  padding: 1em 1em;
  display: block;
  margin: .2em 1em;
  background: white;
  color: black;
  cursor: pointer;
  text-align: left;
  text-transform: uppercase;
  box-shadow: 1px 1px 1px 1px #eee;
}
hr {
  border: none;
  margin-bottom: 2em;
}
</style>
