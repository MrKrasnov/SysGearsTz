export default class CheckboxHandler {
    constructor(checkboxes) {
        this.checkboxes = checkboxes;
    }

    getCheckedCheckBoxes() {
        let checkboxesChecked = [];
        for (let index = 0; index < this.checkboxes.length; index++) {
            if (this.checkboxes[index].checked) {
                checkboxesChecked.push(this.checkboxes[index].value);
            }
        }
        if (checkboxesChecked.length == 0) return false;
        return checkboxesChecked;
    }

    checkboxesOff() {
        for (let index = 0; index < this.checkboxes.length; index++) {
            this.checkboxes[index].checked = false;
        }
    }

}