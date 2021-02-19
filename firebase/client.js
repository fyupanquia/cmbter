import firebase from 'firebase'

const firebaseConfig = {
  apiKey: 'AIzaSyB-Nxfu1_GTqW2boDyAc9j4-SpsCEwxT2s',
  authDomain: 'local-vue-ex.firebaseapp.com',
  databaseURL: 'https://local-vue-ex.firebaseio.com',
  projectId: 'local-vue-ex',
  storageBucket: 'local-vue-ex.appspot.com',
  messagingSenderId: '546366388020',
  appId: '1:546366388020:web:a457c908f7f40cbde5d761'
}

!firebase.apps.length && firebase.initializeApp(firebaseConfig)

const mapUserFromFirebaseAuthToUser = (user) => {
  if (!user) return null
  console.log('firebase user', user)
  const { displayName, email, photoURL } = user

  return {
    avatar: photoURL,
    username: displayName,
    email
  }
}

export const onAuthStateChanged = (onChange) => {
  return firebase.auth().onAuthStateChanged((user) => {
    const normalizedUser = mapUserFromFirebaseAuthToUser(user)
    onChange(normalizedUser)
  })
}

export const loginWithGitHub = () => {
  const githubProvider = new firebase.auth.GithubAuthProvider()
  return firebase.auth().signInWithPopup(githubProvider)
}
