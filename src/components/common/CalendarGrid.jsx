import React from "react";
import FullCalendar, { formatDate } from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import timeGridPlugin from "@fullcalendar/timegrid";

// REF: https://github.com/fullcalendar/fullcalendar-example-projects/blob/master/react-redux/src/DemoApp.jsx

export default class CalendarGrid extends React.Component {
    constructor() {
        super();
        this.state = {
            events: [
                {
                    id: "434",
                    title: "All-day event",
                    start: this.getTodayStr(),
                },
                {
                    id: "535",
                    title: "Timed event",
                    start: this.getTodayStr() + "T12:00:00",
                },
            ],
        };
    }

    getTodayStr = () => {
        return new Date().toISOString().replace(/T.*$/, "");
    };

    handleDateClick = (arg) => {
        // bind with an arrow function
        alert(arg.dateStr);
    };
    render() {
        return (
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                headerToolbar={{
                    left: "prev,next today",
                    center: "title",
                    right: "dayGridMonth,timeGridWeek,timeGridDay",
                }}
                initialView="dayGridMonth"
                editable={true}
                selectable={true}
                selectMirror={true}
                dayMaxEvents={true}
                select={this.handleDateSelect}
                events={this.state.events}
                eventContent={renderEventContent}
                eventClick={this.handleEventClick}
                eventAdd={this.handleEventAdd}
                eventChange={this.handleEventChange} // called for drag-n-drop/resize
                eventRemove={this.handleEventRemove}
            />
        );
    }

    handleDateSelect = (selectInfo) => {
        let calendarApi = selectInfo.view.calendar;
        let title = prompt("Please enter a new title for your event");

        calendarApi.unselect(); // clear date selection

        if (title) {
            calendarApi.addEvent(
                {
                    // will render immediately. will call handleEventAdd
                    title,
                    start: selectInfo.startStr,
                    end: selectInfo.endStr,
                    allDay: selectInfo.allDay,
                },
                true
            ); // temporary=true, will get overwritten when reducer gives new events
        }
    };

    handleEventClick = (clickInfo) => {
        if (
            window.confirm(
                `Are you sure you want to delete the event '${clickInfo.event.title}'`
            )
        ) {
            clickInfo.event.remove(); // will render immediately. will call handleEventRemove
        }
    };

    handleEventAdd = (addInfo) => {
        try {
            console.log("=====ADD==========");
            console.log(addInfo.event.toPlainObject());
            console.log("======================");
        } catch (error) {
            addInfo.revert();
        }
    };

    handleEventChange = (changeInfo) => {
        try {
            console.log("=====UPDATE==========");
            console.log(changeInfo.event.toPlainObject());
            console.log("======================");
        } catch (error) {
            changeInfo.revert();
        }
    };

    handleEventRemove = (removeInfo) => {
        try {
            console.log("=====REMOVE==========");
            console.log(removeInfo.event.toPlainObject());
            console.log("======================");
        } catch (error) {
            removeInfo.revert();
        }
    };
}

function renderEventContent(eventInfo) {
    return (
        <>
            <b>{eventInfo.timeText}</b>
            <i>{eventInfo.event.title}</i>
        </>
    );
}
