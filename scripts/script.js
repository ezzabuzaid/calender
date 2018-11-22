import { PickerStyling } from './theming';
'use strict';
const $ = el => {
    const one = document.querySelector(el);
    const many = document.querySelectorAll(el);
    if (many.length < 2) return one;
    return many;
};

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

class DesktopView extends PickerStyling {

    constructor() {
        super();
    }

    MiddleColumn() {
        $('#middle-column').classList = "col-lg-8 col-sm-8 col-12  pr-0 box-2 bg-white";
        const OUTPUT = `
        <div class="py-md-4">
            <div>
                <div class="add-button text-right">
                    <a class="btn s-bg rounded-0 active-hover icon-picker">
                    <i class="material-icons">add</i>
                    </a>
                </div>
                <!-- Headtag -->
                <div class="text-center d-sm-block d-none">
                    <h2 id="c-month" class="text-uppercase pointer"></h2>
                </div>
            </div>
            <div>
                <!-- List Of Days -->
                <div id="picker" class="d-flex text-center justify-content-center">

                </div>
            </div>
        </div>`
        this.html($('#middle-column'), OUTPUT);
        return this;
    }

    LeftColumn() {
        $('#left-column').classList = "col-lg-3 col-md-3 col-sm-4 p-0 m-bg box-1 d-sm-block";
        const OUTPUT = `
        <div class='text-white'>
        <div class='p-2 py-3 active-hover'>
            <div class='d-flex justify-content-around align-items-center'>
                <div id='left-year' onclick="setYear(--DateList.date.year);" class='pointer'>
                <i class="material-icons">chevron_left</i>
                </div>
                <div>
                    <h2 id='year'></h2>
                </div>
                <div id='right-year' onclick="setYear(++DateList.date.year);" class='pointer'>
                <i class="material-icons">chevron_right</i>
                </div>
            </div>
        </div>
        <ul id='n-month' class='list-group'></ul>
        </div>`;
        this.html($('#left-column'), OUTPUT);
        return
    }

}

class DateList {

    constructor() { }

    InitMonthList() {
        let output = '';
        MONTH_NAMES.forEach((el, i) => {
            output += `<li class='list-group-item border-0 rounded-0 m-bg active-picker-hover pointer'>
                        <div class='d-flex justify-content-between'>
                            <span>${el}</span>
                            <span>${i + 1}</span>
                        </div>
                    </li>`;
        });
        return output;
    }

    InitMonthGrid() {
        let ind = 3;
        let output = ''
        let parg = '';
        for (let i = 0; i < 4; i++) {
            for (let j = ind - 3; j < ind; j++) {
                parg += `<div class='col-3 my-1 mx-2 mx-sm-3 p-0 active-picker-hover m-bg'>
                <div class='text-white py-4'>
                    <h5>${MONTH_NAMES[j]}</h5>
                </div>
            </div>`;
            }
            ind += 3;
            output += `<div class='row m-0 justify-content-sm-between justify-content-around'>${parg}</div>`;
            parg = '';
        }
        return `<div id='l-month' class='w-lg-75 w-100 mt-5'>${output}</div>`;
    }
    InitYearGrid() { }
}

DateList.date = {
    year: new Date().getFullYear(),
    month: new Date().getMonth()
};

class Picker extends PickerStyling {

    constructor(
        month = new Date().getMonth(),
        year = new Date().getFullYear(),
        day = new Date().getDate()
    ) {
        super();
        this.date = new Date(Number(year), Number(month), Number(day));
        this.date = {
            day: this.date.getDate(),
            month,
            year: this.date.getFullYear(),
            iso: this.date.toISOString(),
            local: this.date.toLocaleDateString()
        };
        this.days = {
            Sun: [],
            Mon: [],
            Tue: [],
            Wed: [],
            Thu: [],
            Fri: [],
            Sat: []
        };
        this.properties = Object.keys(this.days);
        this.InitTime();
        this.InitTab();
    }

    InitTime() {
        const {
            year,
            month,
            day
        } = this.date;
        const P = this.properties;
        for (const i of P) this.days[i] = [];
        const date = new Date(year, month + 1, 0).getDate();
        for (let i = 1; i <= date; i++) {
            const testdate = new Date(year, month, i);
            const day = testdate.toDateString().split(' ')[0];
            const j = P.indexOf(day);
            this.days[P[j]].push(i);
        }
    }

    InitTab() {
        const P = this.properties;
        P.forEach((el, ind) => {
            const _ = this.days;
            if (_[el].some(ele => ele === 1)) {
                for (let i = 0; i < ind; i++) {
                    _[P[i]].splice(0, 0, ' ');
                }
            }
        });
        for (const i of P) {
            const _ = this.days[i];
            if (_.length === 4) {
                if (!_.some(j => j === 0)) {
                    _.splice(4, 0, ' ');
                }
            }
            if (_.length === 6) {
                var index = P.indexOf(i);
            }
        }
        for (let j = index + 1; j < P.length; j++) {
            this.days[P[j]].splice(6, 0, ' ');
        }
    }

    InitView() {
        const P = this.properties;
        const D = this.days;
        let output = '';
        let parg = '';
        let h5 = '';
        for (let i of P) {
            for (let j in D[i])
                if (j !== 'undefined') {
                    // This if statment just for styling, replace it else code only
                    let day = D[i][j];
                    const n = Math.round(Math.random() * 500);
                    if (n % 2 && day != ' ') {
                        if (D[i][j] < 10) day = `0${D[i][j]}`;
                        parg += `<p onclick='getDate(this.innerText)' style='background: rgba(${n},${Math.round(n / 3)},${Math.round(n / 4)},1);' class='text-white font-weight-bold rounded-circle pointer'>${day}</p>`;
                    } else
                        parg += `<p onclick='getDate(this.innerText)'>${day}</p>`;
                }
            if (window.outerWidth > 768) {
                h5 = `<h5>${i}</h5>`
            } else {
                h5 = `<h5>${i.split('').slice(0, 2).join('')}</h5>`
            }
            output += `
                    <div class='d-flex flex-column p-1 m-1 p-sm-2 m-xl-1 animate day-box'>
                        ${h5}
                        ${parg}
                    </div>`;
            parg = '';
            h5 = '';
        }
        return output;
    }

}

(function Init() {
    const DATE_LIST = new DateList();
    const STYLE = new PickerStyling();
    const DATE = new Date();
    const PICKER = new Picker();
    if (window.outerWidth > 767) {
        // Desktop View
        $('#desktop-view').style.display = 'block !important';
        $('#mobile-view').style.display = 'none';

        new DesktopView()
            .MiddleColumn()
            .LeftColumn();

        STYLE
            .html($('#picker'), PICKER.InitView())
            .html($('ul#n-month'), DATE_LIST.InitMonthList())
            .text($('#c-month'), MONTH_NAMES[DATE.getMonth()])
            .html($('#year'), DATE.getFullYear());
        monthListSetter();
        $('ul#n-month li')[DATE.getMonth()].classList.add('active-picker'); // set the current month
    } else {
        // // Mobile View
        $('#desktop-view').style.display = 'none';
        $('#mobile-view').style.display = 'block';

        new MobileView()
            .Picker()
            .Header();

        STYLE
            .html($('#picker'), PICKER.InitView())
            .text($('#year'), DATE.getFullYear())
            .text($('#day-mobile'), DATE.getDate())
            .text($('#month-mobile'), MONTH_NAMES[DATE.getMonth()])
            .text($('#c-month'), MONTH_NAMES[DATE.getMonth()]);
    }
})();

function monthListSetter() {
    const monthElement = Array.from($('#n-month li'));
    for (const i in monthElement) {
        monthElement[i].addEventListener('click', () => {
            DateList.date.month = Number(i);
            const {
                year,
                month
            } = DateList.date;
            const setPicker = new Picker(month, year);
            const style = new PickerStyling();
            const element = monthElement[i].firstElementChild.firstElementChild;
            style
                .text($('#c-month'), element.innerText.trim())
                .html($('#picker'), setPicker.InitView())
                .activeStyle(monthElement, i, 'active-picker');
        });
    }
};

function getDate(d) {
    if (d !== '') {
        d = Number(d);
        const picker = new Picker(
            DateList.date.month,
            DateList.date.year,
            d
        );
        console.log(picker.date);
    }
}

function setYear(year) {
    const DATE = new Date();
    DATE.setFullYear(year);
    const setPicker = new Picker(DATE.getMonth(), DATE.getFullYear());
    const style = new PickerStyling();
    style
        .html($('#picker'), setPicker.InitView())
        .text($('#year'), DATE.getFullYear());
}

function setMonth(month) {
    const { year } = DateList.date;
    const date = new Date();
    date.setFullYear(year);
    date.setMonth(month);
    if (month < 0) {
        DateList.date.month = 11;
        month = 11;
    }
    if (month > 11) {
        DateList.date.month = date.getMonth();
        month = 0
    }
    const setPicker = new Picker(date.getMonth(), date.getFullYear());
    const style = new PickerStyling();
    style
        .html($('#picker'), setPicker.InitView())
        .text($('#month-mobile'), MONTH_NAMES[DateList.date.month])
        .text($('#c-month'), MONTH_NAMES[DateList.date.month]);
}

$('#c-month').addEventListener('click', () => {
    const { month, year } = DateList.date;
    const style = new PickerStyling();
    const dateList = new DateList()
    style
        .html($('#picker'), dateList.InitMonthGrid())
        .activeStyle(
            $('#l-month .active-picker-hover'),
            DateList.date.month,
            'active-picker'
        );
    return (function () {
        const monthElement = Array.from($('#l-month .active-picker-hover'));
        for (const i in monthElement) {
            monthElement[i].addEventListener('click', () => {
                DateList.date.month = Number(i);
                const { year, month } = DateList.date;
                const setPicker = new Picker(month, year);
                const style = new PickerStyling();
                const element = monthElement[i].firstElementChild.firstElementChild;
                style
                    .html($('#picker'), setPicker.InitView())
                    .text($('#c-month'), element.innerText.trim());
                if (window.outerWidth > 767) {
                    style.activeStyle(Array.from($('#n-month li')), i, 'active-picker');
                } else {
                    style.text($('#month-mobile'), MONTH_NAMES[month]);
                }
            });
        }
    }())
});

function mobileTagDate(date = new Date()) {
    date = date.toDateString().split(' ');
    date.splice(date.length - 1);
    date[0] = `${date[0]},`;
    return date.join(' ');
}

function styleOne(view, style) {
    view.LeftColumn();
    style.html($('#picker'), PICKER.InitView())
        .html($('ul#n-month'), DATE_LIST.InitMonthList())
        .text($('#c-month'), MONTH_NAMES[this.date.month])
        .html($('#year'), this.date.year);
}