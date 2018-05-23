import React from "react";
import { render } from "react-dom";
import "./style.css"
import Col from "./components/Col";
import Heading from "./components/Heading";
import InfoSection from "./components/InfoSection";
import Seating from "./components/Seating";

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
      <div>
        <Heading 
        {...this.state}
        startSelection={this.startSelection}
        onChangeName={this.onChangeName}
        onChangeSeatNumbers={this.onChangeSeatNumbers}
        />
        <Seating 
          {...this.state}
          onSelectSeat={this.onSelectSeat}
        />
        <InfoSection 
          {...this.state}
          onSelectionDone={this.onSelectionDone}
        />
      </div>
    );
  }
};

render(<App />, document.getElementById("root"));
