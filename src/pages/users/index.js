import React, { useState, useEffect } from "react";

import firebase from "firebase/app";
import "firebase/database";
import "firebase/storage";
import "firebase/auth";
import firebaseConfig from '../../Firebase/FirebaseConfig.js';

import styles from './styles.module.scss'
import Sidebar from "../../components/Sidebar/index.js";

export default function Users() {

    const [dataUsers, setDataUsers] = useState([]);
    const [dataProfile, setDataProfile] = useState([]);

    useEffect(() => {

        const requesterId = localStorage.getItem('uid');

        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }

        let firebaseRef = firebase.database().ref('users/');

        firebaseRef.on('value', (snapshot) => {
            if (snapshot.exists()) {
                let data = snapshot.val();
                let temp = Object.keys(data).map((key) => data[key]);
                setDataUsers(temp);

                temp.forEach((item) => {
                    if (item.id === requesterId) {
                        setDataProfile(item)
                    }
                })

            } else {
                console.log('No data available');
            }
        });
    }, []);

    function sendFriendRequest(user) {

        const friendRequestId = firebase.database().ref().child('posts').push().key;

        firebase.database().ref('users/').child(user.id).child('friendRequests/' + friendRequestId).set({
            friendRequestId: friendRequestId,
            requesterId: dataProfile.id,
            requesterName: dataProfile.name + ' ' + dataProfile.surname
        }).then(() => {
            alert('Pedido de amizade enviado com sucesso!');
        }).catch((error) => {
            if (error) {
                alert('Desculpe, ocorreu um erro ao enviar o pedido de amizade, tente novamente!');
            }
        })
    }

    return(
        <main>
            <Sidebar />

            <section className={styles.sectionUsers}>
                <h1>Comunidade <b>.</b></h1>

                <table className={styles.tableUsers}>
                    <tbody>
                        {dataUsers.map((user, index) => ( user.id !== dataProfile.id ? 
                            (
                                <tr key={index}>
                                    <td className={`${styles.profileImgWrapper} px-1 `}><img src="https://supermentor.com.br/assets/images/default-profile.png" alt="" /></td>
                                    <td className="px-2"><b>{user.name} {user.surname}</b></td>
                                    <td className="px-2"><button className="w-100 btn btn-sm rounded-3 px-2 fw-bold" type="button" onClick={() => sendFriendRequest(user)}>Adicionar</button></td>
                                </tr>
                            ) : null ))
                        }
                    </tbody>
                </table>
            </section>
        </main>
    )
}