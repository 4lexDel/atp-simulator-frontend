import { useState } from "react";
import { Calendar, dateFnsLocalizer, Views, type View } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, getDay, parse, startOfWeek } from "date-fns";
import { fr } from "date-fns/locale";
import "./atpCalendar.css";

const locales = {
    fr: fr,
};
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

export default function AtpCalendar() {
  const [date, setDate] = useState(new Date(2024, 6, 1));
  const [view, setView] = useState<View>(Views.MONTH);

  const myEventsList = [
    {
      title: "Tournoi 1",
      start: new Date(2024, 6, 1),
      end: new Date(2024, 6, 7),
    },
    {
      title: "Tournoi 2",
      start: new Date(2024, 6, 15),
      end: new Date(2024, 6, 28),
    },
  ];

  return (
    <div className="calendar-area">
      <h1>Calendrier des tournois</h1>

      <Calendar
        className="calendar"
        localizer={localizer}
        events={myEventsList}
        startAccessor="start"
        endAccessor="end"
        views={{ month: true, agenda: true }}
        view={view}
        date={date}
        onView={setView}
        onNavigate={setDate}
        culture="fr"
        messages={{
          allDay: "Toute la journée",
          next: "Suivant",
          previous: "Précédent",
          today: "Aujourd'hui",
          month: "Mois",
          week: "Semaine",
          day: "Jour",
          agenda: "Agenda",
          noEventsInRange: "Aucun événement dans cette période.",
          event: "Evenement"
        }}
      />
    </div>
  );
}
