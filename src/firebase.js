import firebase from 'firebase/app';

// Add the Firebase services that you want to use
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDSNEarBPEL8PG4ILE4BZcL2J67taOeWRw',
  authDomain: 'markdown-91d6b.firebaseapp.com',
  databaseURL: 'https://markdown-91d6b-default-rtdb.firebaseio.com',
  projectId: 'markdown-91d6b',
  storageBucket: 'markdown-91d6b.appspot.com',
  messagingSenderId: '180163344885',
  appId: '1:180163344885:web:e9d747115d3a842e3108bc'
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

export { firebase, auth, db };
