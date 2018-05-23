import React from "react";
import { render } from "react-dom";
import "./style.css"

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};
var rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
var cols = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

var rowGapAt = 5;
var colGapAt = 5;

//rows.splice(rowGapAt, 0, "GAP");
//cols.splice(colGapAt, 0, "GAP");
var Col = ({rightGap, bottomGap, type, onSelectSeat, row, col}) => {
  const selectSeat = () => {
    if(type != "reserved"){
      onSelectSeat(row, col)
    }
  }
  var margin = "12px 15px";
  var marginBottom = "12px";
  var marginRight = "12px";
  if(rightGap) { margin = "12px 60px 12px 15px";marginRight = "60px"}
  if(bottomGap) {margin = "12px 15px 60px 15px";marginBottom = "60px"}
  return <div className={"col " + (type ? type : "")}
    style={{
      width: "12px",
      height: "12px",
      background: "#fff",
      border: "2px solid darkblue",
      display: "inline-block",
      margin: margin,
      marginBottom,
      marginRight
    }}
    onClick={selectSeat}
  />
  };
  
class App extends React.Component {
  state = {
    reserved : ["A1","B6",'C5',"D8"],
    selected : [],
    name : '',
    seatsNeed : '',
    ticketsList : [],
    selectionPossible : false
  }
  constructor(){
    super();
    this.state = this.getFromLocal() || this.state;
  }
  onChangeName = (e) => {
    var name = e.target.value;
    this.setState({name})
  }
  onChangeSeatNumbers = (e) => {
    var seatsNeed = e.target.value;
    this.setState({seatsNeed})
  }
  startSelection = () => {
    const { name, seatsNeed} = this.state;
    if(name && seatsNeed > 0){
      this.setState({selectionPossible : true})
    }
  }
  saveToLocal = () => {
    localStorage.setItem("state" , JSON.stringify(this.state));
  }
  getFromLocal = () => {
    return JSON.parse(localStorage.getItem("state"));
  }
  onSelectSeat = (row,col) =>{
    let { selected, seatsNeed, selectionPossible} = this.state;
    var index = selected.indexOf(row+col);
    if(index > -1){
      selected.splice(index,1);
    }else{
      if(selected.length < seatsNeed && selectionPossible){
        selected.push(row+col);
      }
    }
    this.setState({selected});
  }
  onSelectionDone = () => {
    const { selected, name, seatsNeed, reserved} = this.state;
    let { ticketsList } = this.state;
    if(selected.length == seatsNeed){
      ticketsList.push({
        selected,
        name,
        seatsNeed
      });
      this.setState({
        ticketsList,
        name : '',
        seatsNeed : '',
        selected : [],
        reserved : reserved.concat(selected),
        selectionPossible : false
      })
    }
  }
  componentDidUpdate = () => {
    this.saveToLocal();
  }
  render(){
    const {reserved ,selected, name, seatsNeed, ticketsList, selectionPossible} = this.state;
    return (
      <div style={styles}>
        <h2>MOVIE SEAT RESERVATION</h2>
        <p className="form">
          <span>Name : <input disabled={selectionPossible} type="text" value={name} onChange={this.onChangeName} /></span>
          <span>Number of seeats : <input disabled={selectionPossible} type="number" value={seatsNeed} onChange={this.onChangeSeatNumbers} /></span>
        </p>
        <p className="submit">
          <button disabled={selectionPossible} onClick={this.startSelection}>Start Selecting</button>
        </p>
        <div className="screen">SCREEN</div>
        <div className={"selection-" + (selectionPossible ? "enabled" : "disabled")}>
        {
          rows.map((row, rowIdx) => {
            let bottomGap;
            if (rowIdx == rowGapAt) {
              bottomGap = true;
            } else {
              bottomGap = false;
            }
            return (
              <div style={{ display: "flex" }} key={row}>
                {cols.map((col, colIdx) => {
                  let rightGap;
                  if (colIdx == colGapAt) {
                    rightGap = true;
                  } else {
                    rightGap = false;
                  }
                  const isReserved = reserved.indexOf(row+col) > -1;
                  const isSelected = selected.indexOf(row+col) > -1;
                  let type = "empty";
                  if(isReserved) type = "reserved";
                  if(isSelected) type = "selected";

                  return (
                    <Col 
                      key={row + col} 
                      row={row}
                      col={col}
                      rightGap={rightGap} 
                      bottomGap={bottomGap} 
                      type={type}
                      onSelectSeat={this.onSelectSeat}
                    />
                  );
                })}
              </div>
            );
          })
        }
        </div>
        <div className="info-section">
          <div>
            <p className="submit">
              <button disabled={!selectionPossible} onClick={this.onSelectionDone}>Confirm Selection</button>
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
      </div>
    );
  }
};

render(<App />, document.getElementById("root"));
