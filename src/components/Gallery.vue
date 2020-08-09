<template>
  <b-container class="cards-list root__section">
    <div class="image-card" v-for="image in images" :key="image.id">
      <b-button-toolbar>
        <b-button-group class="mr-1">
          <b-button title="Edit image">
            <b-icon icon="pencil" aria-hidden="true"></b-icon>
          </b-button>
          <b-button @click="onDelete(image)" title="Delete image">
            <b-icon icon="trash2" aria-hidden="true"></b-icon>
          </b-button>
        </b-button-group>
      </b-button-toolbar>
      <img class="image-card__image" :src="image.url" />
    </div>
  </b-container>
</template>

<script>

export default {
  name: 'Gallery',
  created() {
    this.$store.dispatch('fetchImages');
  },
  computed: {
    images() {
      return this.$store.state.images;
    },
  },
  methods: {
    onDelete(image) {
      this.$store.commit('deleteImage', image);
    },
  },
};
</script>

<style>
.cards-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
  grid-gap: 1.5rem;
  max-width: 85rem;
  margin: 5rem auto;
  padding: 0 2rem;
}
.image-card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
