import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import OneCard from "./OneCard";

function Board(props) {

    const {oneStatus,cards,deleteCard,setStartOn,startOn,update,moveRight,moveLeft,tabHeaders} = props;

    return (
        <div className="col-md">
            <h3> {oneStatus.status} </h3>
            {cards.filter(el => el.status.toLowerCase() === oneStatus.status.toLowerCase())
                .sort((a,b) => a.priority - b.priority)
                .map(el => <OneCard key={el._id} singleCard={el} deleteCard={deleteCard} update={update}
                         setStartOn={setStartOn} startOn={startOn} moveRight={moveRight} moveLeft={moveLeft} tabHeaders={tabHeaders}
                    />)}
        </div>
    );
}

export default Board;
