import Firebase from 'firebase'

let config = {
  apiKey: 'AIzaSyDxjrGOtE7GC-jpsgJlBlNrODGEM8-3u34',
  authDomain: 'stocks-recommendation-app.firebaseapp.com',
  databaseURL: 'https://stocks-recommendation-app.firebaseio.com',
  projectId: 'stocks-recommendation-app',
  storageBucket: 'stocks-recommendation-app.appspot.com',
  messagingSenderId: '499023884535'
}

let app = Firebase.initializeApp(config)
let db = app.database()

export default {
  database: db
}
