export default class ClassToggle {
    constructor(elements) {
        this.elements = elements;
    }
    divHide() {
        for (let item of this.elements) {
            item.classList.add("close");
        }
    }
    divShow() {
        for (let item of this.elements) {
            item.classList.remove("close");
        }
    }
    divTargetShow(i) {
        this.elements[i].classList.remove("close");
    }
    divTargetHide(i) {
        this.elements[i].classList.add("close");
    }
}