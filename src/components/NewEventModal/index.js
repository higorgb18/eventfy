import React, { useState } from "react";

import Calendar from 'react-calendar';

import dayjs from 'dayjs';
import 'dayjs/locale/pt-br'

import firebase from "firebase/app";
import "firebase/database";
import "firebase/storage";
import "firebase/auth";

import styles from "./styles.module.scss";
import 'react-calendar/dist/Calendar.css';
import "../../styles/calendar.scss";

export default function NewEventModal(props) {

    const isOpen = props.isOpen
    const handleCreateModalState = props.createModalState

    const [date, setDate] = useState(new Date());
    const [selectedParticipant, setSelectedParticipant] = useState('');
    const [eventParticipants, setEventParticipants] = useState([]);

    const [eventTextData, setEventTextData] = useState({
        description: '',
        initialHour: '',
        finalHour: '',
    })

    function handleInputChange(event) {

        const { name, value } = event.target

        setEventTextData({
            ...eventTextData, [name]: value
        })

    }

    function handleSelectedParticipant(event) {
        setSelectedParticipant(event.target.value)
    }

    function selectParticipants() {
        let membersList = [...eventParticipants]

        if (selectedParticipant !== '') {
            membersList.push(selectedParticipant)
        }

        setEventParticipants(membersList)
    }

    function removeParticipants(index) {
        let membersList = [...eventParticipants]

        if (index !== -1) {
            membersList.splice(index, 1);
            setEventParticipants(membersList);
        }
    }
    
    function handleDateFormat(date) {
        const dateInfos = {
            completeDate: dayjs(date).format(),
            dayAndMonth: dayjs(date).format('DD [de] MMMM'),
            dayOfTheWeek: dayjs(date).format('dddd'),
            timestamp: date.getTime()
        }

        return dateInfos
    }
    
    function createEvent() {

        const id = firebase.database().ref().child('posts').push().key;
        const eventCreatorId = localStorage.getItem('uid')

        firebase.database().ref('events/').child(eventCreatorId).child(id).set({
            eventId: id,
            creatorId: eventCreatorId,
            description: eventTextData.description,
            initialDate: handleDateFormat(date[0]),
            finalDate: date[1] ? handleDateFormat(date[1]) : handleDateFormat(date[0]),
            initialHour: eventTextData.initialHour,
            finalHour: eventTextData.finalHour,
            eventMembers: eventParticipants,
            status: ''
        }).then(() => {
            alert('Evento criado com sucesso!');
            window.location.reload();
        }).catch((error) => {
            if (error) {
                alert('Desculpe, ocorreu um erro ao criar o seu evento, tente novamente!');
            }
        })
        
    }

    return (

        <div className="align-items-center justify-content-center vw-100 vh-100 position-absolute" style={{display: isOpen ? 'flex' : 'none', zIndex: '2', backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
            <div className={`modal-content w-50 rounded-4 shadow bg-white ${styles.eventModal}`}>
                <div className="modal-header p-5 pb-4 border-bottom-0">
                    <h2 className="fw-bold mb-0">Criar novo evento</h2>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => handleCreateModalState()}></button>
                </div>

                <div className="modal-body p-5 pt-0">
                    <form onSubmit={createEvent}>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control rounded-3" id="eventNameInput" name="description" required={true} placeholder="Nome do evento" onChange={handleInputChange}/>
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
                            <input type="time" className="form-control rounded-3" id="startHourInput" name="initialHour" required={true} placeholder="Hora de início" onChange={handleInputChange}/>
                            <label htmlFor="startHourInput">Hora de início</label>
                        </div>

                        <div className="form-floating mb-3">
                            <input type="time" className="form-control rounded-3" id="finishHourInput" name="finalHour" required={true} placeholder="Hora de término" onChange={handleInputChange}/>
                            <label htmlFor="finishHourInput">Hora de término</label>
                        </div>

                        <div className="d-flex flex-column align-items-center form-floating mb-3" id={styles.listUsers}>

                            <select id={styles.users} className="form-select form-floating mb-3" aria-label="select" defaultValue="" onChange={handleSelectedParticipant}>
                                <option value="" disabled>Adicionar participantes</option>
                                <option value="Roberto">Roberto</option>
                                <option value="Marcelo">Marcelo</option>
                                <option value="Luísa">Luísa</option>
                                <option value="Rebeca">Rebeca</option>
                            </select>

                            <button id={styles.btnAddParticipant} className="w-50 mb-2 d-block btn btn-sm rounded-3" type="button" style={{display: selectedParticipant !== '' ? 'flex' : 'none'}} onClick={() => selectParticipants()}>Adicionar participante</button>
                            
                            {eventParticipants.length > 0 ? (
                                <small 
                                    className="text-muted text-center mb-2">
                                    Participantes convidados:&nbsp;
                                    {eventParticipants.map((participant, index) => (
                                        <span 
                                            key={index} 
                                            onClick={() => removeParticipants(index)}>
                                            {(index ? ', ' : '') + participant}
                                        </span>
                                    ))}
                                </small>
                            ) : null}

                        </div>
                    
                        <button id={styles.btnCreateEvent} className="w-100 mb-2 btn btn-lg rounded-3" type="submit" >Criar evento</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

