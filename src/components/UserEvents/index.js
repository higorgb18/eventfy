import React from "react";

// import firebase from "firebase/app";
import "firebase/database";
import "firebase/storage";
import "firebase/auth";

import { PlusCircle } from "phosphor-react";

import styles from "./styles.module.scss";

export default function UserEvents(props) {

    // const [dataAccount, setDataAccount] = useState([]);
    const handleModalState = props.state;

    // useEffect(() => {

    //     const userId = localStorage.getItem('uid');
    //     const dbRef = firebase.database().ref();

    //     dbRef.child("users").child(userId).get().then((snapshot) => {
    //         if (snapshot.exists()) {
    //             setDataAccount(snapshot.val());
    //         } else {
    //             console.log("No data available");
    //         }
    //     }).catch((error) => {
    //         console.error(error);
    //     });

    // }, []);

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
                        <tr>
                            <td>Reunião com o cliente</td>
                            <td>quarta-feira | 10:00 - 11:00</td>
                            <td>Higor</td>
                            <td>Não iniciado</td>
                        </tr>

                        <tr>
                            <td>Festa de aniversário da Priscilla Almeida</td>
                            <td>quinta-feira | 18:00 - 20:00</td>
                            <td>Higor</td>
                            <td>Não iniciado</td>
                        </tr>

                        <tr>
                            <td>Entrega do relatório</td>
                            <td>quinta-feira | 10:00</td>
                            <td>Higor</td>
                            <td>Não iniciado</td>
                        </tr>

                        <tr>
                            <td>Reunião com o cliente</td>
                            <td>quarta-feira | 10:00 - 11:00</td>
                            <td>Higor</td>
                            <td>Não iniciado</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
        
    )

}