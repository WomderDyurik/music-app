import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"
import "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyCLgY22uouQe8ocShkieqc_GVO3aSOaDoo",
  authDomain: "music-109fe.firebaseapp.com",
  projectId: "music-109fe",
  storageBucket: "music-109fe.appspot.com",
  messagingSenderId: "420225359290",
  appId: "1:420225359290:web:fd8f2f278ed84e5a38d183"
};

firebase.initializeApp(firebaseConfig)

const auth = firebase.auth()
const db = firebase.firestore()
const storage = firebase.storage()

db.enablePersistence().catch((error) => {
  console.log(`Firebase persistance error: ${error}`)
})

const usersCollection = db.collection('users')
const songsCollection = db.collection('songs')
const commentsCollection = db.collection('comments')
const likesCollection = db.collection('likes')

export {
  auth,
  db,
  usersCollection,
  storage,
  songsCollection,
  commentsCollection,
  likesCollection
}