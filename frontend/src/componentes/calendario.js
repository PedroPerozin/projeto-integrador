import React, { Component } from 'react';
import fullCalendar from 'fullcalendar';
import $ from 'jquery';
import 'fullcalendar/dist/fullcalendar.css';
import 'fullcalendar/dist/locale/pt-br.js'

class Calendario extends Component {

    //constructor(props){
        //super(props);

        //this.updateEvents = this.updateEvents.bind(this);

    //}

    componentDidMount() {
        $('#calendar').fullCalendar({
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay'
            },
            editable: false,
            droppable: false,
            locale: 'pt-br',
            navLinks: true,
            displayEventEnd: true,
            minTime:'07:30:00',
            timeFormat:'h:mm',
        });
        //this.updateEvents();
    }

    //updateEvents(){
        //$('#calendar').fullCalendar( 'removeEvents');
        //$('#calendar').fullCalendar('addEventSource', this.props.events);
    //}

    //componentDidUpdate(prevProps) {
        //this.updateEvents();
    //} 


    render(){
        return(
            <div>
                <div id="calendar"></div>
            </div>
        )
    }
}
export default Calendario;

