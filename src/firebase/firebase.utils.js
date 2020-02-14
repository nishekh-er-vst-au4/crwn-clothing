import firebase from "firebase/app";

import "firebase/firestore";
import "firebase/auth";

const config = {
    apiKey: "AIzaSyAQNKiW2y_xTKLTwwpPcvSA35p_Bbq11PI",
    authDomain: "crwn-db-3d935.firebaseapp.com",
    databaseURL: "https://crwn-db-3d935.firebaseio.com",
    projectId: "crwn-db-3d935",
    storageBucket: "crwn-db-3d935.appspot.com",
    messagingSenderId: "318350144708",
    appId: "1:318350144708:web:6d11c6f82d35a7f9f94591",
    measurementId: "G-HMM8SNBM3Z"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;
  
    const userRef = firestore.doc(`users/${userAuth.uid}`);
  
    const snapShot = await userRef.get();
  
    if (!snapShot.exists) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();
      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        });
      } catch (error) {
        console.log('error creating user', error.message);
      }
    }
  
    return userRef;
  };
  
  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt:'select_account'});
export const signInWithGoogle = ()=> auth.signInWithPopup(provider);

export default firebase;