import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default function ModalDeleteCard(props){

    const {modalDelete, setModalDelete, toggleDelete,deleteCard,cardId,cardName,setStartOn} = props;

    function yesButtonHandler(){
        setStartOn(false);
        deleteCard(cardId);
        setModalDelete(!modalDelete);
    }

    return(
        <div>
            <Modal isOpen={modalDelete} toggle={toggleDelete}>
                <ModalHeader toggle={toggleDelete}> Do you want to delete this Card? </ModalHeader>
                <ModalBody>
                    <span className="mx-md-5"> {cardName} </span>
                </ModalBody>
                <ModalFooter>

                    <Button color="danger" onClick={yesButtonHandler}> Yes </Button>{' '}
                    <Button color="secondary" onClick={toggleDelete}>Cancel</Button>

                </ModalFooter>
            </Modal>
        </div>
    )
}