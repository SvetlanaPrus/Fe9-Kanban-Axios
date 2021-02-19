import './App.css';
import React, {useState,useEffect} from 'react';
import Board from "./Board";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import ModalCreateCard from "./ModalCreateCard";

// Comment: All in order. See only why in "Update Form" you get prev.status, not current.

function App() {

    // ************************** Get array of columns - statuses ***********************************

  const [tabHeaders, setTabHeaders] = useState([])

  function getHeaders(){
    axios.get('http://nazarov-kanban-server.herokuapp.com/column')
        .then((response)=>{
            let headers = response.data;
            setTabHeaders(headers);
        })
        .catch((error)=>{
            console.log("Error")})
  }

  // ******************************** Get array of cards *********************************

  const [cards, setCards] = useState([])

    function getCards(){
        axios.get('http://nazarov-kanban-server.herokuapp.com/card')
            .then((response)=>{
                let newCards = response.data;
                setCards(newCards);
            })
            .catch((error)=>{
                console.log("Error - can't get Cards")})
    }

    // ******************************** Starting program **********************************

    const [startOn, setStartOn] = useState(false)
    const toggle = () => setStartOn(!startOn)

    useEffect( () => {
        getHeaders();
        getCards();
    }, [startOn])

    // ************************************ Create Card **************************************

    const [modalCard, setModalCard] = useState(false);
    const toggleCreateCard = () => setModalCard(!modalCard);

    function createCard(obj,setNewName,setNewDescription,setNewStatus,setNewPriority,setDateCreated){
      axios.post('http://nazarov-kanban-server.herokuapp.com/card',{...obj})
          .then((response) => {
              setStartOn(true)
          })
          .catch((err) => {
              console.log("Error - can't add new Card")})
        setModalCard(!modalCard)
        setNewName('')
        setNewDescription('')
        setNewStatus('')
        setNewPriority('')
        setDateCreated(new Date().getTime())
    }

    // *********************************** Delete Card ****************************************************

    function deleteCard(id){
        axios.delete(`http://nazarov-kanban-server.herokuapp.com/card/${id}`)
            .then((response) => {
                setStartOn(true)
            })
            .catch((err) => {
                console.log("Error - can't delete Card")})
    }

    // ************************************ Update Card *******************************************

    function update(obj,id){
        axios.patch(`http://nazarov-kanban-server.herokuapp.com/card/${id}`,{...obj})
            .then(res => {
                setStartOn(true);
            })
            .catch((err) => {
                console.log("Error - can't update Card")})
        }

    // *************************** Move to new column / new STATUS *********************************

    function moveLeft(id, status){
        let newIndex = 0;
        const oldIndex = tabHeaders.indexOf(tabHeaders.find(el => el.status.toLowerCase() === status.toLowerCase()));
        if (oldIndex === 0) {
            newIndex = oldIndex;
        } else {
            newIndex = oldIndex - 1;
        }
        axios.patch(`http://nazarov-kanban-server.herokuapp.com/card/${id}`,{status: tabHeaders[newIndex].status})
            .then(res => {
                setStartOn(true);
            })
            .catch((err) => {
                console.log("Error - Can't move to the left!")})
    }

    function moveRight(id, status){
        let newIndex = 0;
        const oldIndex = tabHeaders.indexOf(tabHeaders.find(el => el.status.toLowerCase() === status.toLowerCase()))
        if (oldIndex === tabHeaders.length-1){
            newIndex = oldIndex;
        } else {
            newIndex = oldIndex + 1;
        }
        axios.patch(`http://nazarov-kanban-server.herokuapp.com/card/${id}`,{status: tabHeaders[newIndex].status})
             .then(res => {
                 setStartOn(true);
             })
            .catch((err) => {
            console.log("Error - Can't move to the right!")})
    }

  return (
      <div className="container m-4">

          <h1> Kanban & Axios </h1>
          <button onClick={toggle} type="button" className="btn btn-primary mt-4 mb-4 mr-3"> Start </button>

          <button onClick={toggleCreateCard} type="button" className="btn btn-primary mt-4 mb-4"> Create task </button>

          <ModalCreateCard toggleCreateCard={toggleCreateCard} modalCard={modalCard} setModalCard={setModalCard}
                           createCard={createCard} startOn={startOn} setStartOn={setStartOn}/>

          <div className="row">
              {startOn && tabHeaders.map(el =>
                  <Board oneStatus={el} cards={cards} deleteCard={deleteCard} update={update}
                         setStartOn={setStartOn} startOn={startOn} moveRight={moveRight} moveLeft={moveLeft} tabHeaders={tabHeaders}/> )}
          </div>
      </div>
  );
}

export default App;
