import React from "react";

// import dayjs from 'dayjs';
import 'dayjs/locale/pt-br'

// import firebase from "firebase/app";
import "firebase/database";
import "firebase/storage";
import "firebase/auth";

import styles from "./styles.module.scss";

export default function NewEventModal(props) {

    const isOpen = props.isOpen
    const handleModalState = props.state

    return (

        <div className="align-items-center justify-content-center vw-100 vh-100 position-absolute" style={{display: isOpen ? 'flex' : 'none', zIndex: '2', backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>

            <div className="modal-content w-50 rounded-4 shadow bg-white">
                <div className="modal-header p-5 pb-4 border-bottom-0">
                    <h2 className="fw-bold mb-0">Criar novo evento</h2>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => handleModalState()}></button>
                </div>

            <div className="modal-body p-5 pt-0">
                <form>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control rounded-3" id="floatingInput" placeholder="Nome do evento" />
                        <label htmlFor="floatingInput">Nome do evento</label>
                    </div>

                    <div className="form-floating mb-3">
                        <input type="date" className="form-control rounded-3" id="floatingInput" placeholder="Password" />
                        <label htmlFor="floatingInput">Password</label>
                    </div>

                    <button id={styles.btnCreateEvent} className="w-100 mb-2 btn btn-lg rounded-3" type="submit">Criar evento</button>
                    <small className="text-muted">By clicking Sign up, you agree to the terms of use.</small>
                </form>
            </div>
        </div>
    </div>

    )
}

