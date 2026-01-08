import {
  startOfMonth,
  endOfMonth,
  min,
  max,
  addMonths,
  isBefore,
} from "date-fns";

export function splitEventByMonth(event: any) {
  const events = [];
  let cursor = startOfMonth(event.start);

  while (isBefore(cursor, event.end)) {
    const monthStart = startOfMonth(cursor);
    const monthEnd = endOfMonth(cursor);

    events.push({
      ...event,
      start: max([event.start, monthStart]),
      end: min([event.end, monthEnd]),
      __split: true,
    });

    cursor = addMonths(cursor, 1);
  }

  return events;
}

export function splitEventsByMonth(events: any[]) {
  return events.flatMap(splitEventByMonth);
}
