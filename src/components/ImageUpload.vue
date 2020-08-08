<template>
  <div>
    <div>
      <p>Please upload your image:</p>
      <input type="file" @change="previewFileName" accept="image/*" />
    </div>
    <div v-if="imageData != null">
      <div>
        <p>
          Progress: {{ uploadValue.toFixed() + "%" }}
          <progress id="progress" :value="uploadValue" max="100"></progress>
        </p>
      </div>
      <button @click="onUpload">Upload</button>
      <div v-if="picture != null">
        <p>You're successfully uploaded your picture</p>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase';
import db from '../firebase/db';

export default {
  name: 'ImageUpload',
  data() {
    return {
      picture: null,
      imageData: null,
      uploadValue: 0,
    };
  },
  methods: {
    previewFileName(event) {
      const index = 0;
      this.imageData = event.target.files[index];
    },
    // Upload image to the Storage
    onUpload() {
      this.picture = null;
      const imagesCollection = db.collection('images');
      const storageRef = firebase
        .storage()
        .ref(`${this.imageData.name}`)
        .put(this.imageData);
      storageRef.on(
        'state_changed',
        (snapshot) => {
          // Get the upload percentage
          this.uploadValue = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          console.log(error.message);
        },
        () => {
          this.uploadValue = 100;
          storageRef.snapshot.ref.getDownloadURL().then((url) => {
            this.picture = url;
            // Add the image to the Firestore database
            imagesCollection.add({
              src: url,
            });
          });
        },
      );
    },
  },
};
</script>

<style>
/* TO-DO: add some proper syling later */
</style>
