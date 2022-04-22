export default class DataСollector {
    constructor(db, config) {
        this.db = db;
        this.config = config;
    }
    creatingRequest() {
        let data;
        if (this.db.length == 0) {
            data = [];
        } else {
            data = [];
            for (let item of this.db) {
                data.push(JSON.parse(item));
            }
        }

        let result = JSON.parse(this.config);
        result.data = data;

        return JSON.stringify(result);
    }

}