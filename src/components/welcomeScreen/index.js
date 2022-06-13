import React from 'react';
import { Link } from 'react-router-dom';

import styles from "./styles.module.scss";

import illustration from '../../assets/calendar2.jpg';
import googleIcon from '../../assets/google.svg';

export default function WelcomeScreen() {

  return (
    <body className={styles.welcomeScreen}>
        <div className={styles.leftSideWelcomeContent}>
            <h1>Bem-vindo(a) ao <br /><b>Eventfy!</b></h1>

            <span>O Eventfy é um calendário de eventos que possibilita ter o controle de suas tarefas na palma de sua mão!</span>

            <form className={styles.formSignin}>
              <div className={styles.inputWrapper}>
                <label for="inputEmail">E-mail</label>
                <input type="email" id="inputEmail" placeholder="Insira seu e-mail" required="" autofocus="" />
              </div>

              <div className={styles.inputWrapper}>
                <label for="inputPassword">Senha</label>
                <input type="password" id="inputPassword" placeholder="Insira sua senha" required="" />
              </div>

              <Link to="recuperarSenha">Esqueci a senha</Link>

              <div className={styles.buttonWrapper}>
                <button id={styles.btnLogin} type="submit">Entrar</button>
                <button 
                  type="button" 
                  id={styles.btnLoginGoogle}>
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
            <img src={illustration} alt="" />
        </div>
    </body>
  )

}