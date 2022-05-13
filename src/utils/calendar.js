export const getTodayStr = (date) => {
    return new Date(date).toISOString().replace(/T.*$/, "");
};

export const getTimeStr = (time) => {
    return "T" + (time ? time.toString() : "00:00") + ":00";
};

export const parseAppointments = (appointments) => {
    const parsedAppointments = appointments.map((appointment) => {
        const {
            title,
            timeFrom,
            timeTo,
            allDay,
            startDate,
            endDate,
            description,
        } = appointment;

        console.log(appointment);
        return {
            title,
            start: allDay
                ? getTodayStr(startDate) + getTimeStr(timeFrom)
                : getTodayStr(startDate),
            end: allDay ? getTodayStr(endDate) + getTimeStr(timeTo) : "",
            id: appointment._id,
            description,
        };
    });

    return parsedAppointments;
};
