import React, { useState } from "react";
import Calendar from 'react-calendar';

// import dayjs from 'dayjs';
import 'dayjs/locale/pt-br'

// import firebase from "firebase/app";
import "firebase/database";
import "firebase/storage";
import "firebase/auth";

import styles from "./styles.module.scss";
import 'react-calendar/dist/Calendar.css';
import "./style.scss";

export default function NewEventModal(props) {

    const isOpen = props.isOpen
    const handleModalState = props.state

    const [date, setDate] = useState(new Date());

    return (

        <div className="align-items-center justify-content-center vw-100 vh-100 position-absolute" style={{display: isOpen ? 'flex' : 'none', zIndex: '2', backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
            <div className={`modal-content w-50 rounded-4 shadow bg-white ${styles.eventModal}`}>
                <div className="modal-header p-5 pb-4 border-bottom-0">
                    <h2 className="fw-bold mb-0">Criar novo evento</h2>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => handleModalState()}></button>
                </div>

                <div className="modal-body p-5 pt-0">
                    <form>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control rounded-3" id="eventNameInput" placeholder="Nome do evento" />
                            <label htmlFor="eventNameInput">Nome do evento</label>
                        </div>

                        <div className={styles.calendarContainer}>
                            <Calendar
                                id={styles.calendarComponent}
                                onChange={setDate}
                                value={date}
                                selectRange={true}
                            />
                        </div>

                        <div className="form-floating mb-3">
                            <input type="time" className="form-control rounded-3" id="startHourInput" placeholder="Password" />
                            <label htmlFor="startHourInput">Hora de início</label>
                        </div>

                        <div className="form-floating mb-3">
                            <input type="time" className="form-control rounded-3" id="finishHourInput" placeholder="Password" />
                            <label htmlFor="finishHourInput">Hora de término</label>
                        </div>

                        <div className="form-floating mb-3" id={styles.datalistUsers}>
                            <input type="text" list="users" className="form-control rounded-3" id="addPeopleInput" placeholder="Password" />
                            <label htmlFor="addPeopleInput">Adicionar pessoas</label>

                            <datalist id="users">
                                <option value="Roberto">Roberto</option>
                                <option value="Marcelo">Marcelo</option>
                                <option value="Luísa">Luísa</option>
                                <option value="Rebeca">Rebeca</option>
                            </datalist>
                        </div>
                    
                        <button id={styles.btnCreateEvent} className="w-100 mb-2 btn btn-lg rounded-3" type="button" onClick={() => console.log(date)}>Criar evento</button>
                        <small className="text-muted">By clicking Sign up, you agree to the terms of use.</small>
                    </form>
                </div>
            </div>
        </div>
    )
}

