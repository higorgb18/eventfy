import React, { useState, useEffect } from "react";

import firebase from "firebase/app";
import "firebase/database";
import "firebase/storage";
import "firebase/auth";
import firebaseConfig from '../../Firebase/FirebaseConfig.js';

import { PlusCircle } from "phosphor-react";

import styles from "./styles.module.scss";

export default function UserEvents(props) {

    const [dataUserEvents, setDataUserEvents] = useState([]);
    // const [id, setId] = useState('');

    const handleModalState = props.createModalState;
    const handleEditModalState = props.editModalState;

    function getData(calendarEvent) {
        props.setModalData(calendarEvent)
        handleEditModalState()
    }

    useEffect(() => {
        
        let firebaseRef = firebase.database().ref('events/');
        const userId = localStorage.getItem('uid');
        // setId(userId);

        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }

        firebaseRef.on('value', (snapshot) => {
            if (snapshot.exists()) {
                let data = snapshot.val();
                let eventInfos = Object.keys(data).map((key) => data[key]);

                let temp = []

                eventInfos.forEach((event) => {
                    if (event.creatorId === userId) {
                        temp.push(event)
                    } else if (event.eventMembers) {
                        event.eventMembers.forEach((member) => {
                            if (member.friendInfo.friendId === userId) {
                                temp.push(event)
                            }
                        })
                    }
                })

                setDataUserEvents(temp);

            } else {
                console.log('No data available');
            }
        });
    }, []);

    // function acceptInvitation(eventId, userInfo, index) {

    //     const newData = {
    //         friendInfo: userInfo,
    //         pending: false
    //     }

    //     firebase
    //     .database()
    //     .ref('events/').child(eventId).child('eventMembers/').child(index)
    //     .update(newData)
    //     .then(() => alert('Evento ingressado com sucesso!'));

    // }

    return (

        <section className={styles.sectionUserEvents}>
             <div className={styles.textInformation}>
                <h1>Seus eventos</h1>

                <PlusCircle 
                    size={28}
                    weight="fill" 
                    color="#8942D0"
                    onClick={() => handleModalState()}
                />
            </div>

            <div className={styles.tableWrapper}>
                <table className={styles.tableEvents}>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Data</th>
                            <th>Membros</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    
                    <tbody>
                        {dataUserEvents.map((calendarEvent, index) => (
                            <tr key={index} onClick={() => getData(calendarEvent)}>
                                <td>{calendarEvent.description}</td>

                                {calendarEvent.initialDate.dayAndMonth !== calendarEvent.finalDate.dayAndMonth ? (
                                    <td>{calendarEvent.initialDate.dayAndMonth} - {calendarEvent.initialHour}h | {calendarEvent.finalDate.dayAndMonth} - {calendarEvent.finalHour}h</td>
                                ) : (
                                    <td>{calendarEvent.initialDate.dayAndMonth} | {calendarEvent.initialHour} - {calendarEvent.finalHour}h</td>
                                )}

                                {calendarEvent.eventMembers ? (
                                    <td>{calendarEvent.eventMembers.map((member, index) => (<span key={index}>{(index ? ', ' : '') + member.friendInfo.friendName}</span>))}</td>
                                ) : (
                                    <td>Sem membros convidados</td>
                                )}

                                {/* {calendarEvent.eventMembers ? (
                                    calendarEvent.eventMembers.map((member, index) => (member.friendInfo.friendId === id && member.pending ? (
                                        <td key={index}>
                                            <button onClick={() => acceptInvitation(calendarEvent.eventId, member, index)}>Aceitar</button>
                                            <button>Recusar</button>
                                        </td>
                                    ) : null)
                                )) : (
                                    null
                                )} */}

                                <td>{calendarEvent.status === "" ? 'Não iniciado' : calendarEvent.status}</td>                                

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
        
    )

}