
class Task extends MonthList {
    // This is The right column on the large screen 
    // Your date []
    // restyle the dom to get it fine with you
    constructor() {
        super();
        this.InitView();
    }
    InitView() {
        // use only if you wanna to increase picker column size and replace the '18px' with icon or img width
        const setWidth = el => {
            let elWidth;
            if (!el) {
                elWidth = $("#task .js-width");
            } else {
                elWidth = $("#task .js-width")[el];
            }
            const width = elWidth.clientWidth | "18";
            $("#task").style.width = `calc(100% + ${width}px)`;
        };
        let output = "";
        const style = new PickerStyling();
        for (let i = 0; i < 6; i++) {
            output += `
            <div  style="color: #aeaeae;" class="custom-circle-border mb-lg-4 mb-3 position-relative">
                <div  class="d-flex align-items-center">
                    <div>
                        <p class="m-0">${this.MONTH_NAMES[i]} ${i + 1}, 201${i} 05:${i + 1} pm</p>
                    </div>
                    <div class="ml-3 js-width">
                        <img src="./icons/ic_settings_input_antenna_black_18px.svg" alt="icon">
                    </div>
                </div>
                <div class="d-flex align-items-center">
                    <div>
                        <small class="text-capitalize font-weight-bold m-0">${this.MONTH_NAMES[i]} design</small>
                    </div>
                    <div class="ml-3">
                        <img src="./icons/ic_delete_black_18px.svg" alt="Delete">
                    </div>
                </div>
            </div>`;
            style.html($("#task"), output);
        }
        const parentWidth = $("#task").clientHeight;
        const childWidth = $("#task div.custom-circle-border")[0].clientHeight;
        style.setPesudoStyle(
            "div.custom-left-border",
            ":before",
            "height",
            `calc(${parentWidth}px + ${childWidth}px)`
        );
    }
}