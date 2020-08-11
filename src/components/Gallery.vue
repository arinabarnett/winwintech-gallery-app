<template>
    <draggable
      v-model="images"
      v-bind="dragOptions"
      @start="drag = true"
      @end="drag = false"
      class="cards-list root__section"
    >
      <div
      :key="image.order"
      class="image-card"
      :id="image.id"
      v-for="image in images"
        >
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
    </draggable>
</template>

<script>
import draggable from 'vuedraggable';

export default {
  name: 'Gallery',
  components: { draggable },
  created() {
    this.$store.dispatch('fetchImages');
  },
  computed: {
    images: {
      get() {
        return this.$store.state.images;
      },
      set(value) {
        this.$store.dispatch('changeImageOrder', value);
      },
    },
    dragOptions() {
      return {
        animation: 0,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost',
      };
    },
  },
  methods: {
    onDelete(image) {
      this.$store.dispatch('deleteImage', image);
    },
  },
};
</script>

<style>
.cards-list {
  margin: 5rem auto;
  max-width: 85rem;
  /* display: grid;
  grid-template-columns: auto auto;
  grid-gap: 1.5rem;
  max-width: 85rem;
  margin: 5rem auto;
  padding: 0 2rem; */
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
}
.image-card__image {
  object-fit: cover;
}
.btn-toolbar {
    justify-content: flex-end;
}
</style>
