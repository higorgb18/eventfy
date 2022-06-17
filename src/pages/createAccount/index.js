import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';

import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/storage';
import 'firebase/auth';
import firebaseConfig from '../../Firebase/FirebaseConfig.js'

import styles from "./styles.module.scss";

export default function CreateAccount() {

    const [userIsLogged, setUserIsLogged] = useState(false);

    const [registerData, setRegisterData] = useState({
        name: '',
        surname: '',
        email: '',
        password: '',
        passwordConfirm: '',
    })

    function handleInputRegister(event) {

        const { name, value } = event.target
        setRegisterData({
            ...registerData, [name]: value
        })

    }

    function makeRegister() {

        firebase.auth()
            .createUserWithEmailAndPassword(registerData.email, registerData.password)
            .then((userCredential) => {
                
                const uid = userCredential.user.uid;

                firebase.database().ref('users/' + uid).set({

                    id: uid,
                    name: registerData.name,
                    surname: registerData.surname,
                    email: registerData.email,

                });

                localStorage.setItem('uid', uid);
                alert('Cadastro realizado com sucesso!');

            })
            .catch((error) => {
                if (error) {
                    alert('Ocorreu um erro no cadastro, tente novamente!')
                }
            });
    }

    function onAuthStateChanged() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                setUserIsLogged(true)
            }
        });
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        if (!firebase.apps.length)
            firebase.initializeApp(firebaseConfig)
        onAuthStateChanged();
    }, []);

    if (userIsLogged) {

        return (
            <Navigate to='/' />
        )

    } else {

        return (
            <body className={styles.welcomeScreen}>
                <div className={styles.textWrapper}>
                    <span>Totalmente gratuito</span>
                    <h1>Criar uma conta<b>.</b></h1>
                    <span>Já possui uma conta? <Link to="/">Entrar</Link></span>
                </div>
        
                <form className={styles.formRegister}>
                    <div className={styles.nameWrapper}>
                        <div className={styles.inputWrapper}>
                            <label htmlFor="inputName">Nome</label>
                            <input type="text" id="inputName" name="name" onChange={handleInputRegister}  placeholder="Nome" required={true} />
                        </div>
        
                        <div className={styles.inputWrapper}>
                            <label htmlFor="inputSurname">Sobrenome</label>
                            <input type="text" id="inputSurname" name="surname" onChange={handleInputRegister} placeholder="Sobrenome" required={true} />
                        </div>
                    </div>
        
                    <div className={styles.inputWrapper}>
                        <label htmlFor="inputEmail">E-mail</label>
                        <input type="email" id="inputEmail" name="email" onChange={handleInputRegister} placeholder="E-mail" required={true} />
                    </div>
        
                    <div className={styles.inputWrapper}>
                        <label htmlFor="inputPassword">Senha</label>
                        <input type="password" id="inputPassword" name="password" onChange={handleInputRegister} placeholder="Senha" required={true} />
                    </div>
        
                    <div className={styles.inputWrapper}>
                        <label htmlFor="inputPasswordConfirm">Confirmar senha</label>
                        <input type="password" id="inputPasswordConfirm" name="passwordConfirm" onChange={handleInputRegister} placeholder="Confirmação de Senha" required={true} />
                    </div>
        
                    <button id={styles.btnRegister} type="button" onClick={() => {makeRegister()}}>Cadastrar</button>
                </form>
            </body>
          )
    }

}