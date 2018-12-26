import { Days } from "typing/calender.model";
import { Utils } from "utils";

const MONTH_NAMES = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];

class Picker {
    date: Date;
    days: Days = {
        Sun: [],
        Mon: [],
        Tue: [],
        Wed: [],
        Thu: [],
        Fri: [],
        Sat: []
    };
    properties = Object.keys(this.days);

    constructor(time) {
        this.date = new Date(time);
        this.populateDates();
        this.arrangeDatesToCorrectPosition();
    }

    private populateDates() {
        for (const i of this.properties) this.days[i] = [];
        const date = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDate();
        for (let i = 1; i <= date; i++) {
            const testdate = new Date(this.date.getFullYear(), this.date.getMonth(), i);
            const testDay = testdate.toDateString().split(' ')[0];
            const day = this.properties.indexOf(testDay);
            this.days[this.properties[day]].push(i);
        }
    }

    private arrangeDatesToCorrectPosition() {
        this.properties.forEach((el, ind) => {
            // all days before the first day in month are belong the departed month
            const dayDates = this.days[el]
            if (dayDates[0] === 1) {
                for (let i = 0; i < ind; i++) {
                    this.days[this.properties[i]].unshift(null);
                }
            }
            if (dayDates.length === 4) {
                dayDates.push(null);
            }
        });
    }

}
