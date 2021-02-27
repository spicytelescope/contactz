<template>
  <v-app class="">
    <navbar></navbar>
    <v-main>
      <v-container fluid>
        <transition name="fade" mode="out-in">
          <keep-alive><router-view> </router-view></keep-alive>
        </transition>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
#app {
  background: linear-gradient(
    90deg,
    rgba(193, 17, 193, 1) 0%,
    rgba(168, 24, 185, 1) 33%,
    rgba(212, 110, 162, 1) 66%,
    rgba(255, 157, 0, 1) 100%
  );
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
<script>
import Navbar from './components/Navbar.vue'
export default {
  components: { Navbar },
  data: () => ({})
}
</script>
