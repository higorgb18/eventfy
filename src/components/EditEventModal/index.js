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

export default function EditEventModal(props) {

    const isOpen = props.isOpen;
    const handleEditModalState = props.editModalState;
    const modalData = props.modalData;

    const [date, setDate] = useState(new Date());
    const [selectedParticipant, setSelectedParticipant] = useState('');
    const [eventParticipants, setEventParticipants] = useState(modalData.eventMembers);
    const [selectedStatus, setSelectedStatus] = useState('');

    const [eventTextChangeData, setEventTextChangeData] = useState({
        description: '',
        initialHour: '',
        finalHour: '',
    })

    function handleInputChange(event) {

        const { name, value } = event.target

        setEventTextChangeData({
            ...eventTextChangeData, [name]: value
        })

    }

    function handleSelectedStatus(event) {
        setSelectedStatus(event.target.value)
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
    
    function handleDateFormat(date) {
        const dateInfos = {
            completeDate: dayjs(date).format(),
            dayAndMonth: dayjs(date).format('DD [de] MMMM'),
            dayOfTheWeek: dayjs(date).format('dddd'),
            timestamp: date.getTime()
        }

        return dateInfos
    }
    
    function removeParticipants(index) {
        let membersList = [...modalData.eventMembers]

        if (index !== -1) {
            membersList.splice(index, 1);
            setEventParticipants(membersList);
        }
    }
    
    function updateEvent() {

        const eventData = {
            eventId: modalData.eventId,
            creatorId: modalData.creatorId,
            description: eventTextChangeData.description !== '' ? eventTextChangeData.description : modalData.description,
            initialDate: date[0] ? handleDateFormat(date[0]) : modalData.initialDate,
            finalDate: date[1] ? handleDateFormat(date[1]) : modalData.finalDate,
            initialHour: eventTextChangeData.initialHour !== '' ? eventTextChangeData.initialHour : modalData.initialHour,
            finalHour: eventTextChangeData.finalHour !== '' ? eventTextChangeData.finalHour : modalData.finalHour,
            eventMembers: eventParticipants,
            status: selectedStatus !== '' ? selectedStatus : modalData.status 
        }

        firebase
        .database()
        .ref('events/').child(modalData.creatorId).child(modalData.eventId)
        .update(eventData)
        .then(() => alert('Evento atualizado com sucesso!'));

        window.location.reload();        
    }

    function deleteEvent() {
        const confirm = window.confirm('Tem certeza que deseja excluir esse evento? Ele não poderá ser recuperado após a exclusão!');

        if (confirm) {
            firebase.database().ref('events/').child(modalData.creatorId).child(modalData.eventId).remove();
            window.location.reload();
        }
    }

    return (

        <div className="align-items-center justify-content-center vw-100 vh-100 position-absolute" style={{display: isOpen ? 'flex' : 'none', zIndex: '2', backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
            <div className={`modal-content w-50 rounded-4 shadow bg-white ${styles.eventModal}`}>
                <div className="modal-header p-5 pb-4 border-bottom-0">
                    <div>
                        <h2 className="fw-bold mb-0">Editar evento</h2>
                        <small>Preencha <strong>apenas</strong> os campos que você deseja alterar</small>
                    </div>
                   
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => handleEditModalState()}></button>
                </div>

                <div className="modal-body p-5 pt-0">
                    <form>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control rounded-3" id="eventNameInput" name="description" required={true} placeholder="Nome do evento" defaultValue={modalData.description} onChange={handleInputChange}/>
                            <label htmlFor="eventNameInput">Nome do evento</label>
                        </div>

                        <div className={styles.calendarContainer}>
                            <label htmlFor={styles.calendarComponent}>Data atual: {modalData.initialDate.dayAndMonth !== modalData.finalDate.dayAndMonth ? modalData.initialDate.dayAndMonth + ' a ' + modalData.finalDate.dayAndMonth : modalData.initialDate.dayAndMonth}</label>

                            <Calendar
                                id={styles.calendarComponent}
                                onChange={setDate}
                                value={date}
                                selectRange={true}
                                // defaultValue={[new Date(modalData.initialDate.timestamp), new Date(modalData.finalDate.timestamp)]}
                            />
                        </div>

                        <div className="form-floating mb-3">
                            <input type="time" className="form-control rounded-3" id="startHourInput" name="initialHour" required={true} placeholder="Hora de início" defaultValue={modalData.initialHour} onChange={handleInputChange}/>
                            <label htmlFor="startHourInput">Hora de início</label>
                        </div>

                        <div className="form-floating mb-3">
                            <input type="time" className="form-control rounded-3" id="finishHourInput" name="finalHour" required={true} placeholder="Hora de término" defaultValue={modalData.finalHour} onChange={handleInputChange}/>
                            <label htmlFor="finishHourInput">Hora de término</label>
                        </div>

                        <div className="d-flex flex-column align-items-center form-floating" id={styles.selectStatus}>

                            <select id={styles.status} className="form-select form-floating mb-3" aria-label="select" defaultValue="" onChange={handleSelectedStatus}>
                                <option value="" disabled>Mudar status</option>
                                <option value="Não iniciado">Não iniciado</option>
                                <option value="Iniciado">Iniciado</option>
                                <option value="Finalizado">Finalizado</option>
                            </select>
                        
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
                    
                        <button id={styles.btnCreateEvent} className="w-100 mb-2 btn btn-lg rounded-3" type="button" onClick={updateEvent}>Alterar evento</button>
                        <button id={styles.btnDeleteEvent} className="w-100 mb-2 btn btn-lg rounded-3" type="button" onClick={deleteEvent}>Excluir evento</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

