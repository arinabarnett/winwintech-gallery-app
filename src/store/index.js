import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';
import db from '../firebase/db';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    images: [],
    image: null,
    imageData: null,
    uploadValue: 0,
  },
  getters: {
  },
  mutations: {
    addImage(state, data) {
      state.images.push(data);
      console.log(data);
    },
    getFileName(state, payload) {
      const index = 0;
      state.imageData = payload.target.files[index];
    },
    updateList(state, value) {
      state.images = value;
    },
    uploadImage(state) {
      const imagesCollection = db.collection('images');
      // Add the image to the storage
      const storageRef = firebase
        .storage()
        .ref(`${state.imageData.name}`)
        .put(state.imageData);
      storageRef.on(
        'state_changed',
        (snapshot) => {
          // Get the upload percentage
          state.uploadValue = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          console.log(error.message);
        },
        () => {
          state.uploadValue = 100;
          const order = state.images.map((index) => index + 1);
          storageRef.snapshot.ref.getDownloadURL().then((url) => {
            state.image = url;
            const data = {
              name: state.imageData.name,
              url,
              order: order.length,
            };
            // Add the object with an image url to the Firestore database
            imagesCollection.add(data);
            imagesCollection
              .get()
              .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                  if (doc.data().name === state.imageData.name) {
                    state.images.push(data);
                    console.log(state.images);
                  }
                });
              });
          });
        },
      );
    },
    removeImage(state, image) {
      const imageIndex = state.images.indexOf(image);
      state.images.splice(imageIndex, 1);
    },
  },
  actions: {
    fetchImages(context) {
      db.collection('images')
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const data = {
              id: doc.id,
              name: doc.data().name,
              url: doc.data().url,
              order: doc.data().order,
            };
            context.commit('addImage', data);
          });
        });
    },
    deleteImage(context, image) {
      const imagesCollection = db.collection('images');
      const storage = firebase.storage();
      const storageRef = storage.ref();
      const imageRef = storageRef.child(`${image.name}`);

      // Delete the image from the Firestore
      imagesCollection.doc(image.id).delete().then(() => {
        // Delete the image from the Storage
        imageRef.delete().then(() => {
          // Remove image element from the page
          context.commit('removeImage', image);
        }).catch((error) => {
          console.log(error);
        });
      })
        .catch((error) => {
          console.log(error);
        });
    },
    changeImageOrder(context, images) {
      const updatedPromises = [];
      db.collection('images')
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            images.forEach((item) => {
              if (doc.id === item.id) {
                const updatePromise = doc.ref.update({
                  order: item.order,
                });
                console.log(item);
                updatedPromises.push(updatePromise);
              }
            });
            if (updatedPromises.length === images.length) {
              Promise.all(updatedPromises).then((values) => {
                console.log(values);
                context.commit('updateList', images);
              });
            }
          });
        });
    },
  },
});
