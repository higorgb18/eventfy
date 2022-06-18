import React, { useState, useEffect } from "react";

import firebase from "firebase/app";
import "firebase/database";
import "firebase/storage";
import "firebase/auth";

import { PlusCircle } from "phosphor-react";

import styles from "./styles.module.scss";

export default function UserEvents(props) {

    const [dataUserEvents, setDataUserEvents] = useState([]);

    const handleModalState = props.createModalState;
    const handleEditModalState = props.editModalState;

    function getData(calendarEvent) {
        props.setModalData(calendarEvent)
        handleEditModalState()
    }

    useEffect(() => {

        const userId = localStorage.getItem('uid');
        const dbRef = firebase.database().ref();

        dbRef.child("events").child(userId).get().then((snapshot) => {
            if (snapshot.exists()) {
                let data = snapshot.val()
                let temp = Object.keys(data).map((key) => data[key])
                setDataUserEvents(temp);
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });

    }, []);

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
                                    <td>{calendarEvent.eventMembers.map((member, index) => (<span key={index}>{(index ? ', ' : '') + member}</span>))}</td>
                                ) : (
                                    <td>Sem membros convidados</td>
                                )}

                                <td>Não iniciado</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
        
    )

}