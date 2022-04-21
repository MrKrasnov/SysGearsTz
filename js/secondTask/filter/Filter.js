export default class Filter {
    constructor(sort_by) {
        this.sort_by = sort_by;
    }
    filterOn() {
        let obj = {
            "condition": {
                "sort_by": [this.sort_by]
            },
        };
        return obj;
    }
}
