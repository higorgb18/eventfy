import React, { useState, useEffect } from "react";

import dayjs from 'dayjs';
import 'dayjs/locale/pt-br' // import locale

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

    return (
        <body className={styles.bodyWeekEvents}>
            <div className={styles.textInformation}>
                <h3>Olá, <b>{dataAccount.name}</b></h3>
                <h1>Esse são seus eventos da semana <b>.</b></h1>
                <span>{date}</span>
            </div>
            
            <div className={styles.weekEvents}>
                <div className={styles.cardEvent}>
                    <span>quarta-feira | 10:00 - 11:00</span>
                    <p>Reunião com o cliente</p>
                    <DotsThree size={32} weight="fill" />
                </div>

                <div className={styles.cardEvent}>
                    <span>quinta-feira | 18:00 - 20:00</span>
                    <p>Festa de aniversário da Priscilla Almeida</p>
                    <DotsThree size={32} weight="fill" />
                </div>

                <div className={styles.cardEvent}>
                    <span>quinta-feira | 10:00</span>
                    <p>Entrega do relatório</p>
                    <DotsThree size={32} weight="fill" />
                </div>
               
            </div>
        </body>
    )
}
