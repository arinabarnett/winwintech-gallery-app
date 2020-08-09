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
  getters: {},
  mutations: {
    addImage(state, data) {
      state.images.push(data);
    },
    getFileName(state, payload) {
      const index = 0;
      state.imageData = payload.target.files[index];
    },
    // TO-DO: Transfer all of the asynchronous code to actions
    uploadImage(state) {
      const imagesCollection = db.collection('images');
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
          storageRef.snapshot.ref.getDownloadURL().then((url) => {
            state.image = url;
            const data = {
              name: state.imageData.name,
              src: url,
            };
            // Add the object with an image url to the Firestore database
            imagesCollection.add(data);
            const imageData = {
              name: state.imageData.name,
              url,
            };
            // Add the same object to the images array in state
            state.images.push(imageData);
          });
        },
      );
    },
    deleteImage(state, image) {
      const imagesCollection = db.collection('images');
      const storage = firebase.storage();
      const storageRef = storage.ref();
      const imageRef = storageRef.child(`${image.name}`);

      // Delete the image from the Firestore
      imagesCollection.doc(image.id).delete().then(() => {
        // Delete the image from the Storage
        imageRef.delete().then(() => {
          const imageIndex = state.images.indexOf(image);
          // Remove the image element from the page
          state.images.splice(imageIndex, 1);
        }).catch((error) => {
          console.log(error);
        });
      })
        .catch((error) => {
          console.log(error);
        });
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
              url: doc.data().src,
            };
            context.commit('addImage', data);
          });
        });
    },
  },
});
