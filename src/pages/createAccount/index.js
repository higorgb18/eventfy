import React from 'react';

import { Link } from 'react-router-dom';

import styles from "./styles.module.scss";

export default function CreateAccount() {

  return (
    <body className={styles.welcomeScreen}>
        <div className={styles.textWrapper}>
            <span>Totalmente gratuito</span>
            <h1>Criar uma conta<b>.</b></h1>
            <span>Já possui uma conta? <Link to="/login">Entrar</Link></span>
        </div>

        <form className={styles.formRegister}>
            <div className={styles.nameWrapper}>
                <div className={styles.inputWrapper}>
                    <label for="inputName">Nome</label>
                    <input type="text" id="inputName" placeholder="Nome" required="" autofocus="" />
                </div>

                <div className={styles.inputWrapper}>
                    <label for="inputSurname">Sobrenome</label>
                    <input type="text" id="inputSurname" placeholder="Sobrenome" required="" autofocus="" />
                </div>
            </div>

            <div className={styles.inputWrapper}>
                <label for="inputEmail">E-mail</label>
                <input type="email" id="inputEmail" placeholder="E-mail" required="" autofocus="" />
            </div>

            <div className={styles.inputWrapper}>
                <label for="inputPassword">Senha</label>
                <input type="password" id="inputPassword" placeholder="Senha" required="" autofocus="" />
            </div>

            <div className={styles.inputWrapper}>
                <label for="inputPasswordConfirm">Confirmar senha</label>
                <input type="password" id="inputPasswordConfirm" placeholder="Confirmação de Senha" required="" autofocus="" />
            </div>

            <button id={styles.btnRegister} type="submit">Cadastrar</button>
        </form>
    </body>
  )

}