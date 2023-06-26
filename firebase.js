// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDPOks_BF_bqEGDhtbUc0cvCPpZhyw8Sko',
  authDomain: 'test-task-c12c4.firebaseapp.com',
  projectId: 'test-task-c12c4',
  storageBucket: 'test-task-c12c4.appspot.com',
  messagingSenderId: '1087317805441',
  appId: '1:1087317805441:web:80893a22cbf1a5c25e8080',
  measurementId: 'G-KF8H3MQ16V',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
