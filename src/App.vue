<template>
  <div id="app">
    <HeaderPage />
    <router-view />
    <FooterPage />
  </div>
</template>

<script>
import HeaderPage from './components/HeaderPage.vue';
import FooterPage from './components/FooterPage.vue';

export default {
  components: {
    HeaderPage,
    FooterPage,
  },
};
</script>

<style>
#app {
  text-align: center;
}
</style>
