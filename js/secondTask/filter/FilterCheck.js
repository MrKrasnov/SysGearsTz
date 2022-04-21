import Filter from "./Filter.js";

export default class FilterCheck extends Filter {
    constructor(sort_by, check) {
        super(sort_by)
        this.check = check;
    }
    filterOn() {
        let obj = super.filterOn();
        // {"condition":{"sort_by":["user"]}}
        obj.condition.exclude = [];
        this.check.forEach(element => {
            obj.condition.exclude.push({ [element]: true });
        });

        return obj;
    }
}