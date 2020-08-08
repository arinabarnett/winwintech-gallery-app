import Firebase from 'firebase/app';
import credentials from './credentials';

const app = Firebase.initializeApp(credentials.config);

export default app;
