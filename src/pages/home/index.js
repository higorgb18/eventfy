import React, { useEffect, useState } from 'react';

import WelcomeScreen from "../../components/WelcomeScreen";
import Sidebar from "../../components/Sidebar";

import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/storage';
import 'firebase/auth';
import firebaseConfig from '../../Firebase/FirebaseConfig.js'

export default function Home() {

  const [userIsLogged, setUserIsLogged] = useState(false);

  function onAuthStateChanged() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUserIsLogged(true);
      } 
    });
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
    onAuthStateChanged();
  }, []);

  // function signOut() {
  //   firebase.auth().signOut()
  //   localStorage.setItem('uid', '')

  //   window.location.reload();
  // }

  if (userIsLogged) {

    return(
      <body>
        <Sidebar />
      </body>
    )

  } else {

    return (
      <WelcomeScreen />
    );

  }

}
