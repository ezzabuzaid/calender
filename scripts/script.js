import { PickerStyling } from './theming';
'use strict';


class DesktopView extends PickerStyling {

    constructor() {
        super();
    }

    MiddleColumn() {
        element('#middle-column').classList = "col-lg-8 col-sm-8 col-12  pr-0 box-2 bg-white";
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
        this.html(element('#middle-column'), OUTPUT);
        return this;
    }

    LeftColumn() {
        element('#left-column').classList = "col-lg-3 col-md-3 col-sm-4 p-0 m-bg box-1 d-sm-block";
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
        this.html(element('#left-column'), OUTPUT);
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

(function Init() {
    const DATE_LIST = new DateList();
    const STYLE = new PickerStyling();
    const DATE = new Date();
    const PICKER = new Picker();
    if (window.outerWidth > 767) {
        // Desktop View
        element('#desktop-view').style.display = 'block !important';
        element('#mobile-view').style.display = 'none';

        new DesktopView()
            .MiddleColumn()
            .LeftColumn();

        STYLE
            .html(element('#picker'), PICKER.InitView())
            .html(element('ul#n-month'), DATE_LIST.InitMonthList())
            .text(element('#c-month'), MONTH_NAMES[DATE.getMonth()])
            .html(element('#year'), DATE.getFullYear());
        monthListSetter();
        element('ul#n-month li')[DATE.getMonth()].classList.add('active-picker'); // set the current month
    } else {
        // // Mobile View
        element('#desktop-view').style.display = 'none';
        element('#mobile-view').style.display = 'block';

        new MobileView()
            .Picker()
            .Header();

        STYLE
            .html(element('#picker'), PICKER.InitView())
            .text(element('#year'), DATE.getFullYear())
            .text(element('#day-mobile'), DATE.getDate())
            .text(element('#month-mobile'), MONTH_NAMES[DATE.getMonth()])
            .text(element('#c-month'), MONTH_NAMES[DATE.getMonth()]);
    }
})();

function monthListSetter() {
    const monthElement = Array.from(element('#n-month li'));
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
                .text(element('#c-month'), element.innerText.trim())
                .html(element('#picker'), setPicker.InitView())
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
        .html(element('#picker'), setPicker.InitView())
        .text(element('#year'), DATE.getFullYear());
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
        .html(element('#picker'), setPicker.InitView())
        .text(element('#month-mobile'), MONTH_NAMES[DateList.date.month])
        .text(element('#c-month'), MONTH_NAMES[DateList.date.month]);
}

element('#c-month').addEventListener('click', () => {
    const { month, year } = DateList.date;
    const style = new PickerStyling();
    const dateList = new DateList()
    style
        .html(element('#picker'), dateList.InitMonthGrid())
        .activeStyle(
            element('#l-month .active-picker-hover'),
            DateList.date.month,
            'active-picker'
        );
    return (function () {
        const monthElement = Array.from(element('#l-month .active-picker-hover'));
        for (const i in monthElement) {
            monthElement[i].addEventListener('click', () => {
                DateList.date.month = Number(i);
                const { year, month } = DateList.date;
                const setPicker = new Picker(month, year);
                const style = new PickerStyling();
                const element = monthElement[i].firstElementChild.firstElementChild;
                style
                    .html(element('#picker'), setPicker.InitView())
                    .text(element('#c-month'), element.innerText.trim());
                if (window.outerWidth > 767) {
                    style.activeStyle(Array.from(element('#n-month li')), i, 'active-picker');
                } else {
                    style.text(element('#month-mobile'), MONTH_NAMES[month]);
                }
            });
        }
    }())
});

function styleOne(view, style) {
    view.LeftColumn();
    style.html(element('#picker'), PICKER.InitView())
        .html(element('ul#n-month'), DATE_LIST.InitMonthList())
        .text(element('#c-month'), MONTH_NAMES[this.date.month])
        .html(element('#year'), this.date.year);
}