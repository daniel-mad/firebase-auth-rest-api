// Import the functions you need from the SDKs you need
import * as admin from 'firebase-admin';

admin.initializeApp();
const db = admin.firestore();

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
const firebaseConfig = {
  apiKey: 'AIzaSyC7wOyQ8OY8sfly12gZCWuhMAT6k76ADLU',
  authDomain: 'fir-function-7a3f4.firebaseapp.com',
  projectId: 'fir-function-7a3f4',
  storageBucket: 'fir-function-7a3f4.appspot.com',
  messagingSenderId: '884034545691',
  appId: '1:884034545691:web:a70b5449cfc48df0c2b0be',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;
export { admin, db };
