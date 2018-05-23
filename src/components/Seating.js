import React from "react";
import Col from "./Col";

var rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
var cols = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

var rowGapAt = 5;
var colGapAt = 5;


var Seating = ({reserved ,selected, name, seatsNeed, ticketsList, selectionPossible, onSelectSeat}) => {
  return (
    <div>
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
                    onSelectSeat={onSelectSeat}
                  />
                );
              })}
            </div>
          );
        })
      }
      </div>
    </div>
    );
}

export default Seating;