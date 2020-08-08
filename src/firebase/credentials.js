export default {
  config: {
    apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
    authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
    storageBucket: 'winwintech-gallery-app.appspot.com',
    databaseURL: process.env.VUE_APP_FIREBASE_DB_URL,
    projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
    messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
  },
};
