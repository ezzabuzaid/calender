export const element = el => {
    const one = document.querySelector(el);
    const many = document.querySelectorAll(el);
    if (many.length < 2) return one;
    return many;
};

export class Utils {
    static mobileTagDate(date = new Date()) {
        const stringDate = date.toDateString().split(' ');
        stringDate.splice(stringDate.length - 1);
        stringDate[0] = `${stringDate[0]},`;
        return stringDate.join(' ');
    }
    static activeStyle(sib, el, clsNme) {
        for (let i of sib) i.classList.remove(clsNme);
        sib[el].classList.add(clsNme);
        return this;
    }
    static setPesudoStyle(el, pesudo, prop, value) {
        document.styleSheets[0]['insertRule'](
            `${el}:${pesudo} { ${prop}: ${value}; }`,
            0
        );
    }
}