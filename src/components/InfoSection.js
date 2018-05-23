import React from "react";
import Col from "./Col";

var InfoSection = ({reserved ,selected, name, seatsNeed, ticketsList, selectionPossible, onSelectionDone}) => {
      return (
        <div className="info-section">
          <div>
            <p className="submit">
              <button disabled={!selectionPossible} onClick={onSelectionDone}>Confirm Selection</button>
            </p>
            <div>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>No. Of Seats</th>
                    <th>Seats</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    ticketsList.map((ticket, index) => {
                      return (
                        <tr key={index}>
                          <td>{ticket.name}</td>
                          <td>{ticket.selected.length}</td>
                          <td>{ticket.selected.join(", ")}</td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
          <div className="status">
            <div>
              <Col type="selected" /> Selected Seat
            </div>
            <div>
              <Col type="reserved" /> Reserved Seat
            </div>
            <div>
              <Col type="empty" /> Empty Seat
            </div>
          </div>
        </div>
        );
}

export default InfoSection;