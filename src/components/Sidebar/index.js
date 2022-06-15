import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { House, Calendar, Users, Bell, Gear, Envelope, Lightning, CaretCircleRight  } from 'phosphor-react';
// import { Link, Navigate } from 'react-router-dom';

import styles from "./styles.module.scss";

export default function Sidebar() {

    const [active, setActive] = useState(true);

    // const options = [
    //     {
    //         title: 'Início',
    //         src: '',
    //         link: '/',
    //     },
    //     {
    //         title: 'Eventos',
    //         src: '',
    //         link: '/',
    //     },
    //     {
    //         title: 'Pessoas',
    //         src: '',
    //         link: '/',
    //     }
    // ]

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
                    <Link to="pessoas">
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
                    <img src="https://i.pinimg.com/550x/25/a6/9a/25a69a97952927b0aad0227173e9af8f.jpg" alt="" />

                    <div className={styles.textWrapper}>
                        <span>Higor <br />Brandão</span>
                    </div>
                </div>
            </ul>
        </aside>
    )

}