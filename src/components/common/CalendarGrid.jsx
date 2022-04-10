import React from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import timeGridPlugin from "@fullcalendar/timegrid";

export default class CalendarGrid extends React.Component {
    handleDateClick = (arg) => {
        // bind with an arrow function
        alert(arg.dateStr);
    };
    render() {
        return (
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                dateClick={this.handleDateClick}
                eventContent={renderEventContent}
            />
        );
    }
}

function renderEventContent(eventInfo) {
    return (
        <>
            <b>{eventInfo.timeText}</b>
            <i>{eventInfo.event.title}</i>
            <p>Welcome</p>
        </>
    );
}
