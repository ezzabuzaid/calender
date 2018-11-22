import { PickerStyling } from "./theming";

class MobileView extends PickerStyling {
    constructor() { super(); }
    Picker() {
        const output = `
        <div class='d-flex justify-content-around align-items-center mt-3'>
            <div id='left-year' onclick="setMonth(--DateList.date.month);" class='pointer'>
                <i class="material-icons">chevron_left</i>
            </div>
            <div>
                <h2 class="m-text" id='month-mobile'></h2>
            </div>
            <div id='right-year' onclick="setMonth(++DateList.date.month);" class='pointer'>
                <i class="material-icons">chevron_right</i>
            </div>
        </div>
        <div id="picker" class="d-flex text-center justify-content-center bg-white"></div>
        `;
        this.html($('#column'), output);
        return this;
    }

    Header() {
        const output = `       
            <div class="d-flex m-bg p-4 justify-content-between">
                <div class="">
                    <div>
                        <h3 id="year"></h3>
                    </div>
                    <div>
                        <div id="c-month"></div>
                    </div>
                </div>
                <div>
                    <h3 id="day-mobile"></h3>
                </div>
            </div>
        `
        this.html($('#header-mobile'), output);
        return this;
    }

}

export { MobileView };