import { Injectable } from '@angular/core';
import { Location } from '../types/location.interface';

const OPENING_HOURS = {
  morning: { first: '06', last: '12' },
  afternoon: { first: '12', last: '18' },
  night: { first: '18', last: '23' }
};

type HOUR_INDEXES = 'morning' | 'afternoon' | 'night';

@Injectable({
  providedIn: 'root'
})
export class FilterUnitsService {

  constructor() { }

  transformWeekday(weekday: number): string {
    switch (weekday) {
      case 0:
        return 'Dom.';
      case 6:
        return 'Sáb.';
      default:
        return 'Seg. à Sex.';
    }
  }

  isValidHourFilter(scheduleHour: string, openHourFilter: number, closeHourFilter: number): boolean {
    if (scheduleHour === 'Fechada') return false;

    const [unitOpenHour, unitCloseHour] = scheduleHour.split(' às ');
    const unitOpenHourInt = parseInt(unitOpenHour.replace('h', ''), 10);
    const unitCloseHourInt = parseInt(unitCloseHour.replace('h', ''), 10);

    return unitOpenHourInt <= openHourFilter && unitCloseHourInt >= closeHourFilter;
  }

  isMatchingWeekday(todaysWeekday: string, scheduleWeekday: string): boolean {
    return todaysWeekday === scheduleWeekday;
  }

  filterUnits(unit: Location, openHour: string, closeHour: string): boolean {
    if (!unit.schedules) return true;

    const openHourFilter = parseInt(openHour, 10);
    const closeHourFilter = parseInt(closeHour, 10);
    const todaysWeekday = this.transformWeekday(new Date().getDay());

    for (let i = 0; i < unit.schedules.length; i++) {
      const scheduleHour = unit.schedules[i].hour;
      const scheduleWeekday = unit.schedules[i].weekdays;

      if (this.isMatchingWeekday(todaysWeekday, scheduleWeekday)) {
        if (this.isValidHourFilter(scheduleHour, openHourFilter, closeHourFilter)) {
          return true;
        } else {
          return false;
        }
      }
    }

    return false;
  }

  filter(results: Location[], showClosed: boolean, hour: string): Location[] {
    let intermediateResults = results;

    if (!showClosed) {
      intermediateResults = results.filter(location => location.opened === true);
    }

    if (hour) {
      const OPEN_HOUR = OPENING_HOURS[hour as HOUR_INDEXES].first;
      const CLOSE_HOUR = OPENING_HOURS[hour as HOUR_INDEXES].last;

      return intermediateResults.filter(location => this.filterUnits(location, OPEN_HOUR, CLOSE_HOUR));
    } else {
      return intermediateResults;
    }
  }
}
