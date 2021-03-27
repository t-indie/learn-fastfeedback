import React, {useState, useEffect, useContext, createContext} from 'react';
import {createUser} from './db';
import firebase from './firebase';
const authContext = createContext();

export function AuthProvider({children}) {
  const auth = useAuthProvider();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useAuthProvider() {
  const [user, setUser] = useState(null);

  const handleUser = (rawUser) => {
    if (rawUser) {
      const user = formatUser(rawUser);
      createUser(user.uid, user);
      setUser(user);
      return user;
    } else {
      setUser(false);
      return false;
    }
  };
  const formatUser = (rawUser) => {
    console.log(rawUser);
    return {
      uid: rawUser.uid,
      email: rawUser.email,
      name: rawUser.displayName ? rawUser.displayName : rawUser.uid,
      photoUrl: rawUser.photoURL,
      provider: rawUser.providerData[0].providerId ? rawUser.providerData[0].providerId : 'github'
    };
  };

  const signinWithGithub = () => {
    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.GithubAuthProvider())
      .then((response) => handleUser(response));
  };

  const signout = () => {
    return firebase
      .auth()
      .signOut()
      .then((response) => handleUser(response));
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => handleUser(user));

    return () => unsubscribe();
  }, []);

  return {
    user: user,
    signinWithGithub,
    signout
  };
}
