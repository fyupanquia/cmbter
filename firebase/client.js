import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyB-Nxfu1_GTqW2boDyAc9j4-SpsCEwxT2s",
  authDomain: "local-vue-ex.firebaseapp.com",
  databaseURL: "https://local-vue-ex.firebaseio.com",
  projectId: "local-vue-ex",
  storageBucket: "local-vue-ex.appspot.com",
  messagingSenderId: "546366388020",
  appId: "1:546366388020:web:a457c908f7f40cbde5d761",
};

!firebase.apps.length && firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

const mapUserFromFirebaseAuthToUser = (user) => {
  if (!user) return null;
  console.log("firebase user", user);
  const { displayName, email, photoURL, uid } = user;

  return {
    avatar: photoURL,
    username: displayName,
    email,
    uid,
  };
};

export const onAuthStateChanged = (onChange) => {
  return firebase.auth().onAuthStateChanged((user) => {
    const normalizedUser = user ? mapUserFromFirebaseAuthToUser(user) : null;
    onChange(normalizedUser);
  });
};

export const loginWithGitHub = () => {
  const githubProvider = new firebase.auth.GithubAuthProvider();
  return firebase.auth().signInWithPopup(githubProvider);
};

export const addDevit = ({ avatar, content, userId, userName }) => {
  return db.collection("devits").add({
    avatar,
    content,
    userId,
    userName,
    createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
    likesCount: 0,
    sharedCount: 0,
  });
};

export const fetchLatestDevits = () => {
  return db
    .collection("devits")
    .get()
    .then(({ docs }) => {
      return docs.map((doc) => {
        const data = doc.data();
        const id = doc.id;
        const { createdAt } = data;
        console.log(createdAt);

        const date = new Date(createdAt.seconds * 1000);
        const normalizedCreatedAt = new Intl.DateTimeFormat("es-ES").format(
          date
        );

        return {
          ...data,
          id,
          createdAt: normalizedCreatedAt,
        };
      });
    });
};
