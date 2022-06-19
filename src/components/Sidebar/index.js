import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { House, Calendar, Users, Bell, Gear, Envelope, Lightning, CaretCircleRight  } from 'phosphor-react';

import firebase from "firebase/app";
import "firebase/database";
import "firebase/storage";
import "firebase/auth";

import styles from "./styles.module.scss";

export default function Sidebar() {

    const [active, setActive] = useState(true);
    const [dataAccount, setDataAccount] = useState([]);

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

    return(
        <aside className={`${styles.sidebar} ${active ? styles.active : styles.inactive}`}>
            <div className={styles.logoWrapper} onClick={() => setActive(!active)}>
               <Lightning size={32} color="#8942D0" weight="fill"/>
               <h3>Eventfy</h3>
               <CaretCircleRight id={styles.arrow} size={24} color="#8942D0" weight="fill"/>
            </div>

            <ul>
                <li>
                    <Link to="/">
                        <House size={24} color="#757B84" weight="bold"/>
                        <span>Inicio</span>
                    </Link>
                </li>

                <li>
                    <Link to="/eventos">
                        <Calendar size={24} color="#757B84" weight="bold"/>
                        <span>Eventos</span>
                    </Link>
                </li>

                <hr />

                <li>
                    <Link to="/pessoas">
                        <Users size={24} color="#757B84" weight="bold" />
                        <span>Pessoas</span>
                    </Link>
                </li>

                <li>
                    <Link to="/notificacoes">
                        <Bell size={24} color="#757B84" weight="bold" />
                        <span>Notificações</span>
                    </Link>
                </li>

                <li>
                    <Link to="/mensagens">
                        <Envelope size={24} color="#757B84" weight="bold" />
                        <span>Mensagens</span>
                    </Link>
                </li>

                <hr />

                <li>
                    <Link to="/configuracoes">
                        <Gear size={24} color="#757B84" weight="bold" />
                        <span>Configurações</span>
                    </Link>
                </li>
                
                <div className={styles.userWrapper}>
                    <img src="https://supermentor.com.br/assets/images/default-profile.png" alt="" />

                    <div className={styles.textWrapper}>
                        <span>{dataAccount.name} <br />{dataAccount.surname}</span>
                    </div>
                </div>
            </ul>
        </aside>
    )

}