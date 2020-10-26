import 'firebase/analytics'
import 'firebase/auth'
import 'firebase/firestore'

import * as firebase from 'firebase/app'

const firebaseConfig = {
  apiKey: 'AIzaSyDELaNJknzggmeFY4ysMgCSoDCOmVhzHVM',
  authDomain: 'tu-es-e8652.firebaseapp.com',
  databaseURL: 'https://tu-es-e8652.firebaseio.com',
  projectId: 'tu-es-e8652',
  storageBucket: 'tu-es-e8652.appspot.com',
  messagingSenderId: '121679351396',
  appId: '1:121679351396:web:3aea9928c8d858dba29971',
  measurementId: 'G-TJRF8X6DCG',
}
// Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig)
firebase.analytics()

export default fb
