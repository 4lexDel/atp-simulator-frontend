import { addYears, subYears, format } from "date-fns";
import { fr } from "date-fns/locale";

export default function YearToolbar({ date, onNavigate, onToggleView }: any) {
  return (
    <div className="year-toolbar">
      <button onClick={() => onNavigate(subYears(date, 1))}>
        ← Année précédente
      </button>

      <strong>{format(date, "yyyy", { locale: fr })}</strong>

      <button onClick={() => onNavigate(addYears(date, 1))}>
        Année suivante →
      </button>

      <button className="toggle" onClick={onToggleView}>
        Vue mois
      </button>
    </div>
  );
}
