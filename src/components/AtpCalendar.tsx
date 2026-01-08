import { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer, Views, type View } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, getDay, parse, startOfWeek } from "date-fns";
import { fr } from "date-fns/locale";
import "./atpCalendar.css";
import { useTournament } from "../hooks/useTournament";

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
  const [tournaments, setTournaments] = useState<any[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);

  const [date, setDate] = useState(new Date(2024, 6, 1));
  const [view, setView] = useState<View>(Views.MONTH);

  const { getTournaments, error } = useTournament();

  useEffect(() => {
    getTournaments().then((data) => {
      const formattedTournaments = data.map((tournament) => ({
        title: tournament.name,
        start: new Date(tournament.begin),
        end: new Date(tournament.end),
        color: tournament.color || "#1976d2", // Default color if none provided
      }));

      // set date to the oldest tournament start date
      if (formattedTournaments.length > 0) {
        const oldestDate = formattedTournaments.reduce((oldest, current) => {
          return current.start < oldest ? current.start : oldest;
        }, formattedTournaments[0].start);
        setDate(oldestDate);
      }

      setTournaments(formattedTournaments);
    }).catch(() => {
      console.log("Failed to fetch tournaments");
    });
  }, []);

  const eventStyleGetter = (event: any) => {
    return {
      style: {
        backgroundColor: event.color,
        borderRadius: "5px",
        opacity: 0.9,
        color: "white",
        border: "none",
      },
    };
  };

  const handleSelectEvent = (event: any) => {
    setSelectedEvent(event);
  };

  return (
    <div className="calendar-area">
      <h1>Calendrier des tournois</h1>

      <Calendar
        className="calendar"
        localizer={localizer}
        events={tournaments}
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
        eventPropGetter={eventStyleGetter}
        onSelectEvent={handleSelectEvent}
      />

      {selectedEvent && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{selectedEvent.title}</h2>
            <p>
              Du {selectedEvent.start.toLocaleDateString()} <br />
              au {selectedEvent.end.toLocaleDateString()}
            </p>

            <button onClick={() => setSelectedEvent(null)}>Fermer</button>
          </div>
        </div>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}

    </div>
  );
}
