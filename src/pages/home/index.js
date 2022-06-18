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
import EditEventModal from '../../components/EditEventModal';

export default function Home() {

  const [userIsLogged, setUserIsLogged] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  const [modalData, setModalData] = useState({
    creatorId: '',
    description: '',
    eventId: '',
    eventMembers: [],
    finalDate: [],
    finalHour: '',
    initialDate: [],
    initialHour: '',
    timestamp: ''
  })

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

  function handleCreateModalState() {
    setOpenCreateModal(!openCreateModal)
  }

  function handleEditModalState() {
    setOpenEditModal(!openEditModal)
  }

  if (userIsLogged) {

    return(
      <main className={styles.bodyHome}>
        <Sidebar />

        <NewEventModal isOpen={openCreateModal} createModalState={handleCreateModalState}/>
        <EditEventModal isOpen={openEditModal} editModalState={handleEditModalState} modalData={modalData}/>

          <article>
            <WeekEvents />

            <UserEvents createModalState={handleCreateModalState} editModalState={handleEditModalState} setModalData={setModalData}/>
          </article>
      </main>
    )

  } else {

    return (
      <WelcomeScreen />
    );

  }

}
