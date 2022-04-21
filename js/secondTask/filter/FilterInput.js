import Filter from "./Filter.js";

export default class FilterInput extends Filter {
    constructor(sort_by, key, input) {
        super(sort_by)
        this.input = input;
        this.key = key;
    }
    filterOn() {
        let obj = super.filterOn();
        let request = { [this.key]: this.input };
        obj.condition.include = [request];
        return obj;
    }
}