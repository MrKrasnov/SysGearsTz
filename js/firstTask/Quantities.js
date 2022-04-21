export default class Quantities {
    constructor(unit, value, convert) {
        this.unit = unit;
        this.value = value;
        this.convert = convert;
    }
    getJSON() {
        let str = {
            "distance": {
                "unit": this.unit,
                "value": this.value
            },
            "convert_to": this.convert,
        };
        let result = JSON.stringify(str)
        return result;
    }
}