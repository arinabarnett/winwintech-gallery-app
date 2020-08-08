<template>
  <div id="app">
    <Header/>
    <ImageUpload/>
    <Gallery/>
  </div>
</template>

<script>
import Header from './components/Header.vue';
import ImageUpload from './components/ImageUpload.vue';
import Gallery from './components/Gallery.vue';

export default {
  name: 'App',
  components: {
    Header, ImageUpload, Gallery,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
