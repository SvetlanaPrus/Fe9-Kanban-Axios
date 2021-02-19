import React, {useState} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

export default function ModalUpdateCard(props){

    const {modalUpdate,toggleUpdate,singleCard,update,setStartOn,startOn} = props;

    const [updatedDate, setUpdatedDate] = useState(new Date().getTime());
    const [updatedName, setUpdatedName] = useState(singleCard.name)
    const [updatedDescription, setUpdatedDescription] = useState(singleCard.description)
    const [updatedStatus, setUpdatedStatus] = useState(singleCard.status)
    const [updatedPriority, setUpdatedPriority] = useState(singleCard.priority)

    function handlerSaveClick(){
        setStartOn(!startOn);
        update({
            name: updatedName,
            description: updatedDescription,
            status: updatedStatus,
            priority: updatedPriority,
            updatedAt: updatedDate
        }, singleCard._id)
    }

    return(
        <div>

            <Modal isOpen={modalUpdate} toggle={toggleUpdate}>
                <ModalHeader toggle={toggleUpdate}> What do you want to change?

                    <input value={updatedDate} onChange={(e) => setUpdatedDate(e.target.value)}
                           type="datetime-local" className="form-control mt-2 w-75" id="updatedDate" placeholder=""/>

                </ModalHeader>
                <ModalBody>

                    <div className="mb-3">
                        <label className="form-label"> Name: </label>
                        <input value={updatedName} onChange={(e) => setUpdatedName(e.target.value)}
                               type="text" className="form-control" id="updatedName"/>
                    </div>

                    <div className="mb-3">
                        <label className="form-label"> Description: </label>
                        <input value={updatedDescription} onChange={(e) => setUpdatedDescription(e.target.value)}
                               type="text" className="form-control" id="updatedDescription"/>
                    </div>

                    <label className="visually-hidden mr-2"> Status: </label>
                    <select value={updatedStatus} onChange={(e) => setUpdatedStatus(e.target.value)}
                            className="form-select mr-4" id="updatedStatus">
                        <option selected> Choose...</option>
                        <option value="Todo"> To do </option>
                        <option value="Progress"> Progress </option>
                        <option value="Review"> Review </option>
                        <option value="Done"> Done </option>
                    </select>

                    <label className="visually-hidden mr-2"> Priority: </label>
                    <select value={updatedPriority} onChange={(e) => setUpdatedPriority(e.target.value)}
                            className="form-select" id="updatedPriority">
                        <option selected> Choose... </option>
                        <option value="1"> 1 </option>
                        <option value="2"> 2 </option>
                        <option value="3"> 3 </option>
                    </select>

                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handlerSaveClick}> Save </Button>{' '}
                    <Button color="secondary" onClick={toggleUpdate}> Cancel </Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}