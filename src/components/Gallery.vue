<template>
  <div class="cards-list root__section">
    <div class="image-card" v-for="image in images" :key="image.id">
      <img class="image-card__image" :src="image.url" />
    </div>
  </div>
</template>

<script>
import db from '../firebase/db';

export default {
  name: 'Gallery',
  data() {
    return {
      images: [],
    };
  },
  created() {
    db.collection('images')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const data = {
            id: doc.id,
            url: doc.data().src,
          };
          this.images.push(data);
        });
      });
  },
};
</script>

<style>
.cards-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
  grid-gap: 1rem;
  max-width: 80rem;
  margin: 5rem auto;
  padding: 0 2rem;
}
.image-card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
