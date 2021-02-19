import './App.css';
import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CardBody, CardHeader, Card, Button, CardTitle, CardText } from 'reactstrap';
import ModalDeleteCard from "./ModalDeleteCard";
import ModalUpdateCard from "./ModalUpdateCard";

export default function OneCard(props) {

    const {singleCard,deleteCard,setStartOn,startOn,update,moveRight,moveLeft,tabHeaders} = props;

    const [modalDelete, setModalDelete] = useState(false);
    const toggleDelete = () => setModalDelete(!modalDelete);

    const [modalUpdate, setModalUpdate] = useState(false);
    const toggleUpdate = () => setModalUpdate(!modalUpdate);

    function handlerRightClick(){
        setStartOn(!startOn);
        moveRight(singleCard._id, singleCard.status);
    }

    function handlerLeftClick(){
        setStartOn(!startOn);
        moveLeft(singleCard._id, singleCard.status);
    }

    return (
            <Card outline color="primary mb-4">
                <CardHeader>
                    {singleCard.name}
                    <Button onClick={toggleDelete}
                            outline color="danger" className="ml-3 mt-1"> Delete </Button>

                    <ModalDeleteCard toggleDelete={toggleDelete} modalDelete={modalDelete} setModalDelete={setModalDelete}
                                     deleteCard={deleteCard} cardId={singleCard._id} cardName={singleCard.name}
                                     setStartOn={setStartOn}/>
                </CardHeader>

                <CardBody>
                {/*<CardTitle tag="h5"> x </CardTitle>*/}
                <CardText>
                    <br/>Task: {singleCard.description}
                    <br/>Status: {singleCard.status}
                    <br/>Priority: {singleCard.priority}
                </CardText>
                    {
                        singleCard.status.toLowerCase() === tabHeaders[0].status.toLowerCase()?
                          <Button outline color="secondary" inline disabled> ← </Button>
                        : <Button outline color="primary" inline onClick={handlerLeftClick}> ← </Button>
                    }
                    {' '}<Button onClick={toggleUpdate} outline color="primary" inline> Update </Button>{' '}
                    {
                        singleCard.status.toLowerCase() === tabHeaders[tabHeaders.length-1].status.toLowerCase()?
                         <Button outline color="secondary" inline disabled> → </Button>
                        :<Button outline color="primary" inline onClick={handlerRightClick}> → </Button>
                    }
                </CardBody>
                <ModalUpdateCard toggleUpdate={toggleUpdate} modalUpdate={modalUpdate} singleCard={singleCard} update={update}
                                 setStartOn={setStartOn} startOn={startOn}/>
            </Card>
    )
}


