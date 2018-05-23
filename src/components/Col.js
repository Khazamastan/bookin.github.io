import React from "react";
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

  export default Col;