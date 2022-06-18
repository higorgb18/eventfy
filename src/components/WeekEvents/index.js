import React, { useState, useEffect } from "react";

import dayjs from 'dayjs';
import 'dayjs/locale/pt-br'

import firebase from "firebase/app";
import "firebase/database";
import "firebase/storage";
import "firebase/auth";

import { DotsThree } from "phosphor-react";
// import dot from "../../assets/dot.svg";

import styles from "./styles.module.scss";

export default function WeekEvents() {

    let localizedFormat = require('dayjs/plugin/localizedFormat');
    dayjs.extend(localizedFormat);
    dayjs.locale('pt-br');

    const [dataAccount, setDataAccount] = useState([]);
    const [dataUserEvents, setDataUserEvents] = useState([]);
    const [date, setDate] = useState(dayjs().format('dddd, D [de] MMMM - HH:mm[h]'));

    useEffect(() => {
        setInterval(() => {
            setDate(dayjs().format('dddd, D [de] MMMM - HH:mm[h]'))
        }, 1000)
    }, [])

    useEffect(() => {

        const userId = localStorage.getItem('uid');
        const dbRef = firebase.database().ref();

        dbRef.child("users").child(userId).get().then((snapshot) => {
            if (snapshot.exists()) {
                setDataAccount(snapshot.val());
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });

    }, []);

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
        <section className={styles.bodyWeekEvents}>
            <div className={styles.textInformation}>
                <h3>Olá, <b>{dataAccount.name}</b></h3>
                <h1>Esse são seus eventos da semana <b>.</b></h1>
                <span>{date}</span>
            </div>
            
            <div className={styles.weekEvents}>
                {dataUserEvents.map((calendarEvent, index) => (
                    <div key={index} className={styles.cardEvent}>
                    {calendarEvent.initialDate.dayAndMonth !== calendarEvent.finalDate.dayAndMonth ? (
                        <span>{calendarEvent.initialDate.dayOfTheWeek} - {calendarEvent.initialHour}h | {calendarEvent.finalDate.dayAndMonth} - {calendarEvent.finalHour}h</span>
                    ) : (
                        <span>{calendarEvent.initialDate.dayAndMonth} | {calendarEvent.initialHour} - {calendarEvent.finalHour}h</span>
                    )}
                    <p>{calendarEvent.description}</p>
                    <DotsThree size={32} weight="fill" />
                </div>
                ))}
            </div>
        </section>
    )
}
