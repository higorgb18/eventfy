import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/storage';
import 'firebase/auth';

import styles from "./styles.module.scss";

import illustration from '../../assets/calendar2.jpg';
import googleIcon from '../../assets/google.svg';

export default function WelcomeScreen() {

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  })

  function makeLogin () {

    firebase.auth().signInWithEmailAndPassword(loginData.email, loginData.password)
    .then((userCredential) => {
        
        const uid = userCredential.user.uid;
        localStorage.setItem('uid', uid)

    })
    .catch((error) => {
        if (error) {
          alert('Ocorreu um erro ao efetuar o login, verifique o nome de usuário e senha e tente novamente!')
        }
    }); 
    
  }

  function makeLoginWithGoogle() {

    let provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth()
    .signInWithPopup(provider)
    .then((userCredential) => {

      console.log(userCredential.user.displayName)

      const uid = userCredential.user.uid;
      localStorage.setItem('uid', uid)

    }).catch((error) => {
      if (error) {
        alert('Ocorreu um erro ao efetuar o login, verifique o nome de usuário e senha e tente novamente!')
      }
    });

  }

  function handleInputLogin(event) {

    const {name, value} = event.target

    setLoginData ({
        ...loginData, [name]: value
    })
    
  }

  return (
    <div className={styles.welcomeScreen}>
        <div className={styles.leftSideWelcomeContent}>
            <h1>Bem-vindo(a) ao <br /><b>Eventfy!</b></h1>

            <span>O Eventfy é um calendário de eventos que possibilita ter o controle de suas tarefas na palma de sua mão!</span>

            <form className={styles.formSignin}>
              <div className={styles.inputWrapper}>
                <label htmlFor="inputEmail">E-mail</label>
                <input type="email" name="email" id="inputEmail" onChange={handleInputLogin} placeholder="Insira seu e-mail" required={true} />
              </div>

              <div className={styles.inputWrapper}>
                <label htmlFor="inputPassword">Senha</label>
                <input type="password" name="password" id="inputPassword" onChange={handleInputLogin} placeholder="Insira sua senha" required={true} />
              </div>

              <Link to="recuperarSenha">Esqueci a senha</Link>

              <div className={styles.buttonWrapper}>
                <button id={styles.btnLogin} type="button" onClick={makeLogin}>Entrar</button>

                <button 
                  type="button"
                  id={styles.btnLoginGoogle}
                  onClick={makeLoginWithGoogle}
                  >
                  <img src={googleIcon} alt="Ícone do Google" />
                  Entrar com Google</button>
              </div>

              <span 
                className={styles.registerText}>
                Ainda não possui uma conta? 
                <Link to="/cadastrar"> Cadastrar</Link>
              </span>
              
            </form>
        </div>

        <div className={styles.rightSideWelcomeContent}>
            <img src={illustration} alt="Ilustração de um homem de terno apontando para um celular com calendário" />
        </div>
    </div>
  )

}