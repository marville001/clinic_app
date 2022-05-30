import React from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import timeGridPlugin from "@fullcalendar/timegrid";
import AddAppointmentModal from "../modals/AddAppointmentModal";
import EditAppointmentModal from "../modals/EditAppointmentModal";

// REF: https://github.com/fullcalendar/fullcalendar-example-projects/blob/master/react-redux/src/DemoApp.jsx

export default class CalendarGrid extends React.Component {
    constructor() {
        super();
        this.state = {
            addAppointmentModalOpen: false,
            editAppointmentModalOpen: false,
            startDate: "",
            endDate: "",
            startTime: "",
            endTime: "",
            selectedAppointment: "",
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
                    doctorId={this.props.doctorId}
                    startDate={this.state.startDate}
                    endDate={this.state.endDate}
                    startTime={this.state.startTime}
                    endTime={this.state.endTime}
                />

                <EditAppointmentModal
                    isOpen={this.state.editAppointmentModalOpen}
                    closeModal={() => {
                        this.setState((prev) => ({
                            ...prev,
                            editAppointmentModalOpen: false,
                        }));
                    }}
                    doctorId={this.props.doctorId}
                    selectedId={this.state.selectedAppointment}
                />
            </>
        );
    }

    handleDateSelect = (selectInfo) => {
        const startDateSplit = selectInfo.startStr.split("T");
        const endDateSplit = selectInfo.endStr.split("T");

        const startTime = endDateSplit[1]
            ? startDateSplit[1].split("+")[0].substring(0, 5)
            : "";
        const endTime = endDateSplit[1]
            ? endDateSplit[1].split("+")[0].substring(0, 5)
            : "";

        this.setState((prev) => ({
            ...prev,
            startDate: startDateSplit[0],
            endDate: endDateSplit[0],
            startTime,
            endTime,
        }));

        this.setState((prev) => ({
            ...prev,
            addAppointmentModalOpen: true,
        }));
        // let calendarApi = selectInfo.view.calendar;
        // calendarApi.unselect();
    };

    handleEventClick = (clickInfo) => {
        const { id } = clickInfo.event;

        console.log(id);

        this.setState((prev) => ({
            ...prev,
            selectedAppointment: id,
        }));

        this.setState((prev) => ({
            ...prev,
            editAppointmentModalOpen: true,
        }));
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
