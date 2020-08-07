import Firebase from 'firebase/app';
import credentials from './credentials';

const App = Firebase.initializeApp(credentials.config);

export default App;
