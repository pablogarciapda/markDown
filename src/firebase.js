import firebase from 'firebase/app';

// Add the Firebase services that you want to use
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.VUE_APP_FB_API_KEY,
  authDomain: 'markdown-91d6b.firebaseapp.com',
  databaseURL: 'https://markdown-91d6b-default-rtdb.firebaseio.com',
  projectId: 'markdown-91d6b',
  storageBucket: 'markdown-91d6b.appspot.com',
  messagingSenderId: '180163344885',
  appId: '1:180163344885:web:e9d747115d3a842e3108bc'
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

export { firebase, auth };
