import 'firebase/analytics'
import 'firebase/auth'

import * as firebase from 'firebase/app'

const firebaseConfig = {
  apiKey: 'AIzaSyDiBQj2z4Bc9HNTA3Gb0TFRjbmnn6SsuD0',
  authDomain: 'tu-es-eed26.firebaseapp.com',
  databaseURL: 'https://tu-es-eed26.firebaseio.com',
  projectId: 'tu-es-eed26',
  storageBucket: 'tu-es-eed26.appspot.com',
  messagingSenderId: '898977663302',
  appId: '1:898977663302:web:6a8c5a1c5645fe40f07d47',
  measurementId: 'G-YLZKVQ9HGJ',
}
// Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig)
firebase.analytics()

export default fb
