export class PickerStyling {
    constructor() { }
    setPesudoStyle(el, pesudo, prop, value) {
        document.styleSheets[0].insertRule(
            `${el}:${pesudo} { ${prop}: ${value}; }`,
            0
        );
    }
    html(el, view) {
        el.innerHTML = view;
        return this;
    }
    text(el, view) {
        el.textContent = view;
        return this;
    }
    activeStyle(sib, el, clsNme) {
        for (let i of sib) i.classList.remove(clsNme);
        sib[el].classList.add(clsNme);
        return this;
    }
    setStyle(el, prop, value) {
        el.style[prop] = value;
        return this;
    }
}
