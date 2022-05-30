import React from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import timeGridPlugin from "@fullcalendar/timegrid";
import AddAppointmentModal from "../modals/AddAppointmentModal";

// REF: https://github.com/fullcalendar/fullcalendar-example-projects/blob/master/react-redux/src/DemoApp.jsx

export default class CalendarGrid extends React.Component {
    constructor() {
        super();
        this.state = {
            events: [],
            addAppointmentModalOpen: false,
        };
    }

    getTodayStr = (date) => {
        return new Date(date).toISOString().replace(/T.*$/, "");
    };

    getTimeStr = (time) => {
        return "T" + time.toString() + ":00";
    };

    handleDateClick = (arg) => {
        alert(arg.dateStr);
    };

    render() {
        return (
            <>
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
                    events={this.props.appointments}
                    eventContent={renderEventContent}
                    eventClick={this.handleEventClick}
                    eventAdd={this.handleEventAdd}
                    eventChange={this.handleEventChange} // called for drag-n-drop/resize
                    eventRemove={this.handleEventRemove}
                />

                <AddAppointmentModal
                    isOpen={this.state.addAppointmentModalOpen}
                    closeModal={() => {
                        this.setState((prev) => ({
                            ...prev,
                            addAppointmentModalOpen: false,
                        }));
                    }}
                    doctorId={this.props.id}
                />
            </>
        );
    }

    handleDateSelect = (selectInfo) => {
        console.log(selectInfo);
        this.setState((prev) => ({
            ...prev,
            addAppointmentModalOpen: true,
        }));
        // let calendarApi = selectInfo.view.calendar;
        // let title = prompt("Please enter a new title for your event");

        // calendarApi.unselect(); // clear date selection

        // if (title) {
        //     calendarApi.addEvent(
        //         {
        //             // will render immediately. will call handleEventAdd
        //             title,
        //             start: selectInfo.startStr,
        //             end: selectInfo.endStr,
        //             allDay: selectInfo.allDay,
        //         },
        //         true
        //     ); // temporary=true, will get overwritten when reducer gives new events
        // }
    };

    handleEventClick = (clickInfo) => {
        console.log(clickInfo);
        // if (
        //     window.confirm(
        //         `Are you sure you want to delete the event '${clickInfo.event.title}'`
        //     )
        // ) {
        //     clickInfo.event.remove(); // will render immediately. will call handleEventRemove
        // }
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
