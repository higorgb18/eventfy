import React, { useEffect, useState } from 'react';

import WelcomeScreen from "../../components/WelcomeScreen";
import Sidebar from "../../components/Sidebar";
import WeekEvents from "../../components/WeekEvents";
import UserEvents from '../../components/UserEvents';
import NewEventModal from '../../components/NewEventModal';

import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/storage';
import 'firebase/auth';
import firebaseConfig from '../../Firebase/FirebaseConfig.js';


import styles from "./styles.module.scss";

export default function Home() {

  const [userIsLogged, setUserIsLogged] = useState(false);
  const [openModal, setOpenModal] = useState(false);

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

  function handleModalState() {
    setOpenModal(!openModal)
  }

  // function signOut() {
  //   firebase.auth().signOut()
  //   localStorage.setItem('uid', '')

  //   window.location.reload();
  // }

  if (userIsLogged) {

    return(
      <main className={styles.bodyHome}>
        <Sidebar />

        <NewEventModal isOpen={openModal} state={handleModalState}/>

          <article>
            <WeekEvents />

            <UserEvents state={handleModalState}/>
          </article>
      </main>
    )

  } else {

    return (
      <WelcomeScreen />
    );

  }

}
