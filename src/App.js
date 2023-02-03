import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { TabulatorFull as Tabulator } from "tabulator-tables";
import * as luxon from "luxon";

function App() {
  var tabledata = [
    { id: 1, name: "Oli Bob", age: "12", col: "red", dob: "" },
    { id: 2, name: "Mary May", age: "1", col: "blue", dob: "14/05/1982" },
    {
      id: 3,
      name: "Christine Lobowski",
      age: "42",
      col: "green",
      dob: "22/05/1982",
    },
    {
      id: 4,
      name: "Brendon Philips",
      age: "125",
      col: "orange",
      dob: "01/08/1980",
    },
    {
      id: 5,
      name: "Margret Marmajuke",
      age: "16",
      col: "yellow",
      dob: "31/01/1999",
    },
  ];

  //Create Date Editor
  var dateEditor = function (cell, onRendered, success, cancel) {
    //cell - the cell component for the editable cell
    //onRendered - function to call when the editor has been rendered
    //success - function to call to pass thesuccessfully updated value to Tabulator
    //cancel - function to call to abort the edit and return to a normal cell

    //create and style input
    var cellValue = luxon.DateTime.fromFormat(
        cell.getValue(),
        "dd/MM/yyyy"
      ).toFormat("yyyy-MM-dd"),
      input = document.createElement("input");

    input.setAttribute("type", "date");

    input.style.padding = "4px";
    input.style.width = "100%";
    input.style.boxSizing = "border-box";

    input.value = cellValue;

    onRendered(function () {
      input.focus();
      input.style.height = "100%";
    });

    function onChange() {
      if (input.value != cellValue) {
        success(
          luxon.DateTime.fromFormat(input.value, "yyyy-MM-dd").toFormat(
            "dd/MM/yyyy"
          )
        );
      } else {
        cancel();
      }
    }

    //submit new value on blur or change
    input.addEventListener("blur", onChange);

    //submit new value on enter
    input.addEventListener("keydown", function (e) {
      if (e.keyCode == 13) {
        onChange();
      }

      if (e.keyCode == 27) {
        cancel();
      }
    });

    return input;
  };
  useEffect(() => {
    var table = new Tabulator("#example-table", {
      movableRows: true,
      height: 205, // set height of table (in CSS or here), this enables the Virtual DOM and improves render speed dramatically (can be any valid css height value)
      data: tabledata, //assign data to table
      layout: "fitColumns", //fit columns to width of table (optional)
      columns: [
        //Define Table Columns
        {
          rowHandle: true,
          formatter: "handle",
          headerSort: false,
          frozen: true,
          width: 30,
          minWidth: 30,
        },
        { title: "Name", field: "name", width: 150, editor: true },
        {
          title: "Age",
          field: "age",
          hozAlign: "left",
          formatter: "progress",
          editor: true,
        },
        {
          title: "Name",
          field: "name",
          editor: "list",
          editorParams: {
            valuesLookup: function (cell, filterTerm) {
              //cell - the cell component for the current cell
              //filterTerm - the current value of the input element

              return [
                {
                  label: "Steve Boberson",
                  value: "steve",
                },
                {
                  label: "Bob Jimmerson",
                  value: "bob",
                },
                {
                  label: "Jenny Jillerson",
                  value: "jenny",
                },
                {
                  label: "Jill Betterson",
                  value: "jill",
                },
              ];
            },
          },
        },
        {
          title: "Date Of Birth",
          field: "dob",
          sorter: "date",
          hozAlign: "center",
          editor: dateEditor,
        },
      ],
    });
  });
  return (
    <div className="App">
      <h1>Hello Word</h1>
      <div id="example-table"></div>
    </div>
  );
}

export default App;
