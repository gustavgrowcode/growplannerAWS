
import './App.css';
//import * as React from 'react';
import React from 'react';
import Papa from "papaparse";
/* import * as ReactDOM from 'react-dom'; */
import { ScheduleComponent, Day, Week, WorkWeek, Month, TimelineMonth, Agenda, Inject, Resize, DragAndDrop,TimelineViews, ViewsDirective, ViewDirective, ResourcesDirective, ResourceDirective} from '@syncfusion/ej2-react-schedule';
import { DataManager,  UrlAdaptor } from '@syncfusion/ej2-data';
import { createElement } from '@syncfusion/ej2-base';
import { DropDownList } from '@syncfusion/ej2-dropdowns'; 
import { Uploader } from '@syncfusion/ej2-inputs'; 
import { UploaderComponent } from '@syncfusion/ej2-react-inputs';
import { useState } from 'react';
import axios from 'axios';

import "../node_modules/@syncfusion/ej2-base/styles/material.css";
import "../node_modules/@syncfusion/ej2-buttons/styles/material.css";
import "../node_modules/@syncfusion/ej2-calendars/styles/material.css";
import "../node_modules/@syncfusion/ej2-dropdowns/styles/material.css";
import "../node_modules/@syncfusion/ej2-inputs/styles/material.css";
import "../node_modules/@syncfusion/ej2-navigations/styles/material.css";
import "../node_modules/@syncfusion/ej2-popups/styles/material.css";
import "../node_modules/@syncfusion/ej2-schedule/styles/material.css";
import "../node_modules/@syncfusion/ej2-react-inputs/styles/material.css";





//import "./node_modules/@syncfusion/ej2/material-dark.css";

function App() {
  const dataManager = new DataManager({
    url: 'http://localhost:8080/api/scheduleevents/getData',
    crudUrl: 'http://localhost:8080/api/scheduleevents/crudActions',
    adaptor: new UrlAdaptor(),
    crossDomain: true
});

const [file, setFile] = useState();

const fileReader = new FileReader();

const handleOnChange = (e) => {
    setFile(e.target.files[0]);
};

const handleOnSubmit = (e) => {
  console.log("We are in handle")
    e.preventDefault();

    if (file) {
        fileReader.onload = function (event) {
            const csvOutput = event.target.result;
        };
        console.log("We are in if file")
        fileReader.readAsText(file);
    }
};


const [machineData] = useState([
  { machineName: 'PP99', machineID: 1, MachineColor: '#ffaa00' },
  { machineName: 'SinglePP', machineID: 2, MachineColor: '#f8a398' },
  { machineName: 'DoublePP', machineID: 3, MachineColor: '#7499e1' }
]);

const updQuery = "INSERT INTO scheduleevents (id,starttime,endtime,subject,isallday,starttimezone,endtimezone,recurrencerule,recurrenceid,recurrenceexception,orderid,machineid,lineid,created_at,updated_at) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15) RETURNING id,starttime,endtime,subject,location,description,isallday,starttimezone,endtimezone,recurrencerule,recurrenceid,recurrenceexception,followingid,orderid,machineid,lineid,parentid,created_at,updated_at";

const [lineData] = useState([
  { lineName: 'PP99_1', lineID: 1,machineID: 1, lineColor: '#ffaa00' },
  { lineName: 'PP99_2', lineID: 2,machineID: 1, lineColor: '#ffaa00' },
  { lineName: 'PP99_3', lineID: 3,machineID: 1, lineColor: '#ffaa00' },
  { lineName: 'SinglePP_1', lineID: 4,machineID: 2, lineColor: '#f8a398' },
  { lineName: 'SinglePP_2', lineID: 5,machineID: 2, lineColor: '#f8a398' },
  { lineName: 'SinglePP_3', lineID: 6,machineID: 2, lineColor: '#f8a398' },
  { lineName: 'DoublePP_1', lineID: 7,machineID: 3, lineColor: '#7499e1' },
  { lineName: 'DoublePP_2', lineID: 8,machineID: 3, lineColor: '#7499e1' },
  { lineName: 'DoublePP_3', lineID: 9,machineID: 3, lineColor: '#7499e1' }
]);

const eventSettings = { dataSource: dataManager,
  fields: {
    id: 'id',
    subject: { name: 'subject' },
    isAllDay: { name: 'isallday' },
    location: { name: 'location' },
    description: { name: 'description' },
    startTime: { name: 'starttime' },
    endTime: { name: 'endtime' },
    startTimezone: { name: 'starttimezone' },
    endTimezone: { name: 'endtimezone' },
    recurrenceID: {name:'recurrenceid'},
    recurrenceRule:{name:'recurrencerule'},
    recurrenceException: {name:'recurrenceexception'},
    followingID:{name:'followingid'},
    orderID:{name:'orderid'},
    machineID:{name:'machineid'},
    lineID:{name:'lineid'},
    parentID:{name:'parentid'},
  }};


  const onEventRendered = (args) => {
    switch (args.data.orderid) {
      case 1:
        args.element.style.backgroundColor = '#F57F17';
        break;
      case 2:
        args.element.style.backgroundColor = '#7fa900';
        break;
      default:
        args.element.style.backgroundColor = "#FFFF00";
    }
  }
  
  const onPopupOpen = (args) => {
    if (args.type === 'Editor') {
        if (!args.element.querySelector('.custom-field-row')) {
            let row = createElement('div', { className: 'custom-field-row' });
            let formElement = args.element.querySelector('.e-schedule-form');
            formElement.firstChild.insertBefore(row, formElement.firstChild.firstChild);
            let container = createElement('div', { className: 'custom-field-container' });
            let inputEle = createElement('input', {
                className: 'e-field', attrs: { name: 'orderid' }
            });
            container.appendChild(inputEle);
            row.appendChild(container);
            let drowDownList = new DropDownList({
                dataSource: [
                    { text: 'Ett', value: 1 },
                    { text: 'Två', value: 2 }
                ],
                fields: { text: 'text', value: 'value' },
                value: args.data.orderID,
                floatLabelType: 'Always', placeholder: 'Order ID'
            });
            drowDownList.appendTo(inputEle);
            inputEle.setAttribute('name', 'orderid');
        }
    }
  }


  return (
    <div className="App">

        <div style={{ textAlign: "center" }}>
            <h1>REACTJS CSV IMPORT EXAMPLE </h1>
            <form>
                <input
                    type={"file"}
                    id={"csvFileInput"}
                    accept={".csv"}
                    onChange={handleOnChange}
                />

                <button
                    onClick={(e) => {
                        handleOnSubmit(e);
                    }}
                >
                    IMPORT CSV
                </button>
            </form>
        </div>

      <div>HEJ</div>

      <div>
      <ScheduleComponent width='100%' height='1000px' currentView='TimelineMonth' eventSettings={eventSettings} group = {{byGroupID: true, resources: ["Machines", "Lines"]}} popupOpen={onPopupOpen} eventRendered={onEventRendered} >
      <ViewsDirective>
      <ViewDirective option='Week' />
      <ViewDirective option='Month' />
      <ViewDirective option='TimelineMonth' />x
      <ViewDirective option='TimelineWeek' />
      <ViewDirective option='Agenda' />
    </ViewsDirective>

    <ResourcesDirective>
      <ResourceDirective field='machineid' title='Machine' name='Machines' allowMultiple={false} dataSource={machineData} textField='machineName' idField='machineID' colorField='MachineColor'>
      </ResourceDirective>
{       <ResourceDirective field='lineid' title='Line' name='Lines' allowMultiple={true} dataSource={lineData} textField='lineName' idField='lineID' groupIDField='machineID' colorField='lineColor'>
      </ResourceDirective> }
    </ResourcesDirective>
            <Inject services={[Day, Week, WorkWeek, Month,TimelineMonth, TimelineViews, Agenda, Resize, DragAndDrop]}/>
          </ScheduleComponent>
          </div>
    </div>
  );
}


export default App;
