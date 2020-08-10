<template>
  <div class="background">
    <div class="popup">
      <h1>{{notification.title}}</h1>
      <p>{{notification.content}}</p>
      <div v-if="notification.critical === 'true'" class="external" @click="$emit('closeApp')">Close</div>
      <div v-else class="external" @click="$emit('proceed')">Proceed</div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Notification',
  props: [
    'notification'
  ]
}

</script>

<style scoped>
.background {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  background: #ffffffdd
}
.popup {
  margin-top: 40%;
  padding: .5em;
  background: white;
  border: 1px solid #ddd;
  z-index: 100;
  opacity: 1;
}
</style>
