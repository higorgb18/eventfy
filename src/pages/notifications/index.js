import React, { useState, useEffect } from "react";

import firebase from "firebase/app";
import "firebase/database";
import "firebase/storage";
import "firebase/auth";
import firebaseConfig from '../../Firebase/FirebaseConfig.js';

import styles from './styles.module.scss'
import Sidebar from "../../components/Sidebar/index.js";

export default function Notifications() {

    const [dataProfile, setDataProfile] = useState([]);
    const [friendRequestList, setFriendRequestList] = useState([]);

    useEffect(() => {

        const userId = localStorage.getItem('uid');
        let firebaseRef = firebase.database().ref('users/').child(userId);

        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }

        firebaseRef.on('value', (snapshot) => {
            if (snapshot.exists()) {
                let data = snapshot.val();
                setDataProfile(data);

                if (data.friendRequests) {
                    let temp = Object.keys(data.friendRequests).map((key) => data.friendRequests[key]);
                    setFriendRequestList(temp);
                }

            } else {
                console.log('No data available');
            }
        });
    }, []);

    function removeFriendRequest(requestId) {
        firebase.database().ref('users/').child(dataProfile.id).child('friendRequests/' + requestId).remove().then(() => {
            window.location.reload();
        });
    }

    function acceptFriendRequest(user) {

        const id = firebase.database().ref().child('posts').push().key;

        firebase.database().ref('users/').child(user.requesterId).child('friends/').child(id).set({
            friendId: dataProfile.id,
            friendName: dataProfile.name + ' ' + dataProfile.surname
        }).then(() => {

            firebase.database().ref('users/').child(dataProfile.id).child('friends/').child(id).set({
                friendId: user.requesterId,
                friendName: user.requesterName
            }).then(() => {
                alert('Pedido aceito com sucesso!');
                removeFriendRequest(user.friendRequestId)
            })
            
        }).catch((error) => {
            if (error) {
                alert('Desculpe, ocorreu um erro ao aceitar o pedido de amizade, tente novamente!');
            }
        })
    }

    return(
        <main>
            <Sidebar />

            <section className={styles.sectionUsers}>
                <h1>Suas notificações <b>.</b></h1>

                <table className={styles.tableUsers}>
                    <tbody>
                        {friendRequestList ? friendRequestList.map((request, index) => (
                            <tr key={index}>
                                <td className="px-2"><b>Pedido de amizade de {request.requesterName}</b></td>
                                <td className="px-2"><button className="w-100 btn btn-sm rounded-3 px-2 fw-bold" type="button" onClick={() => acceptFriendRequest(request)}>Aceitar</button></td>
                                <td className="px-2"><button className="w-100 btn btn-sm rounded-3 px-2 fw-bold" type="button" onClick={() => removeFriendRequest(request.friendRequestId)}>Recusar</button></td>
                            </tr>
                        )) : null}
                    </tbody>
                </table>
            </section>
        </main>
    )
}