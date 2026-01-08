import { useEffect, useState } from "react";
import {
  Calendar,
  dateFnsLocalizer,
  Views,
  type View,
} from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  format,
  getDay,
  parse,
  startOfWeek,
  startOfYear,
  addMonths,
} from "date-fns";
import { fr } from "date-fns/locale";
import "./atpCalendar.css";
import { useTournament } from "../hooks/useTournament";
import { splitEventsByMonth } from "../utils/splitEventByMonth";
import YearToolbar from "./YearToolbar";

const locales = { fr };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const YEAR_VIEW = "year";

function YearView({
  yearDate,
  events,
  onSelectEvent,
  eventStyleGetter,
}: any) {
  const start = startOfYear(yearDate);

  const months = Array.from({ length: 12 }, (_, i) =>
    addMonths(start, i)
  );

  return (
    <div className="year-grid">
      {months.map((monthDate, index) => (
        <div key={index} className="year-month">
          <div className="month-title">
            {format(monthDate, "MMMM yyyy", { locale: fr })}
          </div>

          <Calendar
            localizer={localizer}
            date={monthDate}
            view={Views.MONTH}
            views={[Views.MONTH]}
            toolbar={false}
            events={events}
            startAccessor="start"
            endAccessor="end"
            selectable={false}
            popup={false}
            onSelectEvent={onSelectEvent}
            eventPropGetter={eventStyleGetter}
            style={{ height: 220 }}
          />
        </div>
      ))}
    </div>
  );
}

export default function AtpCalendar() {
  const [tournaments, setTournaments] = useState<any[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);

  const [date, setDate] = useState(new Date(2024, 6, 1));
  const [view, setView] = useState<View | string>(Views.MONTH);

  const { getTournaments, error } = useTournament();

  useEffect(() => {
    getTournaments()
      .then((data) => {
        const formatted = data.map((tournament) => ({
          title: tournament.name,
          start: new Date(tournament.begin),
          end: new Date(tournament.end),
          color: tournament.color || "#1976d2",
        }));

        if (formatted.length > 0) {
          const oldest = formatted.reduce((oldest, current) =>
            current.start < oldest ? current.start : oldest,
          formatted[0].start);
          setDate(oldest);
        }

        setTournaments(splitEventsByMonth(formatted));
      })
      .catch(() => {
        console.log("Failed to fetch tournaments");
      });
  }, []);

  const eventStyleGetter = (event: any) => ({
    style: {
      backgroundColor: event.color,
      borderRadius: "4px",
      opacity: 0.9,
      color: "white",
      border: "none",
      fontSize: "0.75rem",
    },
  });

  const handleSelectEvent = (event: any) => {
    setSelectedEvent(event);
  };

  return (
    <div className="calendar-area">
      <h1>Calendrier des tournois</h1>

      {/* === VUE ANNÉE === */}
      {view === YEAR_VIEW ? (
        <>
          <YearToolbar
            date={date}
            onNavigate={setDate}
            onToggleView={() => setView(Views.MONTH)}
          />

          <YearView
            yearDate={date}
            events={tournaments}
            onSelectEvent={handleSelectEvent}
            eventStyleGetter={eventStyleGetter}
          />
        </>
      ) : (
        <>
          {/* <div className="calendar-toggle">
            <button
              className={view === YEAR_VIEW ? "active" : ""}
              onClick={() => setView(YEAR_VIEW)}
            >
              Année
            </button>

            <button
              className={view === Views.MONTH ? "active" : ""}
              onClick={() => setView(Views.MONTH)}
            >
              Mois
            </button>
          </div> */}

          <Calendar
            className="calendar"
            localizer={localizer}
            events={tournaments}
            startAccessor="start"
            endAccessor="end"
            views={{
              month: true,
              agenda: true,
              year: true, // affiché dans la toolbar
            }}
            view={view as View}
            date={date}
            onView={setView}
            onNavigate={setDate}
            culture="fr"
            messages={{
              today: "Aujourd'hui",
              previous: "Précédent",
              next: "Suivant",
              month: "Mois",
              agenda: "Agenda",
              year: "Année",
              noEventsInRange: "Aucun événement",
            }}
            eventPropGetter={eventStyleGetter}
            onSelectEvent={handleSelectEvent}
          />
        </>
      )}

      {/* === MODAL === */}
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
