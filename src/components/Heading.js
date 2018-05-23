import React from "react";

var Heading = ({reserved ,selected, name, seatsNeed, ticketsList, selectionPossible, startSelection, onChangeName, onChangeSeatNumbers}) => {
  return (
    <div>
      <h2>MOVIE SEAT RESERVATION</h2>
      <p className="form">
        <span>
          Name : 
          <input
            disabled={selectionPossible}
            type="text"
            value={name}
            onChange={onChangeName}
          />
        </span>
        <span>
          Number of seeats : 
          <input
            disabled={selectionPossible}
            type="number"
            value={seatsNeed}
            onChange={onChangeSeatNumbers} 
          />
        </span>
      </p>
      <p className="submit">
        <button disabled={selectionPossible} onClick={startSelection}>Start Selecting</button>
      </p>
    </div>
  )
}

export default Heading;