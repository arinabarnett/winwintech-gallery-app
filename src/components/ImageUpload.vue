<template>
  <div>
    <div>
      <p>Please upload your image:</p>
      <input type="file" @change="previewFileName" accept="image/*" />
    </div>
    <div v-if="this.$store.state.imageData != null">
      <div>
        <p>
          Progress: {{ this.$store.state.uploadValue.toFixed() + "%" }}
          <progress id="progress" :value="this.$store.state.uploadValue" max="100"></progress>
        </p>
      </div>
      <button @click="onUpload">Upload</button>
      <div v-if="this.$store.state.image != null">
        <p>You're successfully uploaded your image</p>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'ImageUpload',
  methods: {
    previewFileName(event) {
      this.$store.commit('getFileName', event);
    },
    onUpload() {
      this.$store.commit('uploadImage');
    },
  },
};
</script>

<style>
/* TO-DO: add some proper syling later */
</style>
