import React, {useState} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


export default function ModalCreateCard(props){

    const {toggleCreateCard, modalCard,createCard,setStartOn,setModalCard,startOn} = props;

    const [dateCreated, setDateCreated] = useState(new Date().getTime());           //create 'date of creating'
    const [newName, setNewName] = useState('')
    const [newDescription, setNewDescription] = useState('')
    const [newStatus, setNewStatus] = useState('')
    const [newPriority, setNewPriority] = useState('')

    function saveButtonHandler() {
        setStartOn(!startOn);
        createCard({
                name: newName,
                description: newDescription,
                status: newStatus,
                priority: newPriority,
                createdAt: dateCreated
        }, setDateCreated, setNewName,setNewDescription,setNewStatus,setNewPriority)
    }

    return(
        <div>
            <Modal isOpen={modalCard} toggle={toggleCreateCard}>
                <ModalHeader toggle={toggleCreateCard}>
                    The following should be fill in:
                        <input value={dateCreated} onChange={(e) => setDateCreated(e.target.value)}
                               type="datetime-local" className="form-control mt-2 w-75" id="datetime" placeholder=""
                        />
                </ModalHeader>
                <ModalBody>

                    <div className="mb-3">
                        <label htmlFor="formGroupExampleInput" className="form-label"> Name: </label>
                        <input value={newName} onChange={(e) => setNewName(e.target.value)}
                            type="text" className="form-control" id="Name"/>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="formGroupExampleInput2" className="form-label"> Description: </label>
                        <input value={newDescription} onChange={(e) => setNewDescription(e.target.value)}
                            type="text" className="form-control" id="Description"/>
                    </div>

                    <label className="visually-hidden mr-2"> Status: </label>
                    <select value={newStatus} onChange={(e) => setNewStatus(e.target.value)}
                        className="form-select mr-4" id="autoSizingSelect">
                        <option selected> Choose...</option>
                        <option value="Todo"> To do </option>
                        <option value="Progress"> Progress </option>
                        <option value="Review"> Review </option>
                        <option value="Done"> Done </option>
                    </select>

                    <label className="visually-hidden mr-2"> Priority: </label>
                    <select value={newPriority} onChange={(e) => setNewPriority(e.target.value)}
                        className="form-select" id="autoSizingSelect">
                        <option selected> Choose... </option>
                        <option value="1"> 1 </option>
                        <option value="2"> 2 </option>
                        <option value="3"> 3 </option>
                    </select>

                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={saveButtonHandler}> Save </Button>{' '}
                    <Button color="secondary" onClick={toggleCreateCard}> Cancel </Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}