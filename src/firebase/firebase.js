import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

if (!firebase.apps.length) {
    const config = {
        apiKey: "AIzaSyDjX47VF_YdbtSX9v-jHlfHFr0hDeS6nqI",
        authDomain: "kdu-d-news.firebaseapp.com",
        databaseURL: "https://kdu-d-news.firebaseio.com",
        projectId: "kdu-d-news",
        storageBucket: "kdu-d-news.appspot.com",
        messagingSenderId: "94165892722",
        appId: "1:94165892722:web:ad772c6ca33ecf1c280ceb",
        measurementId: "G-Y52SNNWSPW"
    }
    firebase.initializeApp(config)
}
const fireDb = firebase.firestore()
const fireAuth = firebase.auth()
export {fireDb, fireAuth}