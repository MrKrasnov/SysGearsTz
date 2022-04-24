export default class ReaderByRequest {
    constructor(config) {
        this.config = config;
    }

    getRequestObj() {
        let obj = JSON.parse(this.config);
        let config = obj["condition"];
        let profiles = obj["data"];
        let sort_by = config["sort_by"][0];

        if (profiles.length == 0) {
            let result = {
                "result": [],
            };
            return JSON.stringify(result);
        }
        else if (config.hasOwnProperty(["include"])) {
            let include = config["include"][0];
            let key = Object.keys(include)[0];
            let prop = include[key];

            profiles = {
                "data": obj["data"],
            }

            let searchProp = [];
            searchProp = profiles.data.filter(function (item) {
                return item[key] == prop;
            });
            let result = {
                "result": searchProp,
            };

            return sortItems(result["result"]);
        }
        else if (config.hasOwnProperty(["exclude"])) {
            let exclude = config["exclude"];

            let extraSetting = {};
            for (let item of exclude) {
                Object.assign(extraSetting, item)
            }

            return sortItems(obj["data"], extraSetting);
        }
        else {
            return sortItems(obj["data"]);
        }

        function sortItems(db_data, checkboxes = true) {
            profiles = {
                "data": db_data,
            }

            profiles.data.sort(function (a, b) {
                if (a[sort_by] > b[sort_by]) {
                    return 1;
                }
                if (a[sort_by] < b[sort_by]) {
                    return -1;
                }
                return 0;
            });

            let resultProp = [];
            for (let profile of profiles["data"]) {
                if (checkboxes) {
                    if (checkboxes.disabled == undefined) delete profile.disabled;
                    if (checkboxes.rating == undefined) delete profile.rating;
                }
                resultProp.push(profile);
            }

            let result = {
                "result": resultProp,
            };
            return JSON.stringify(result);
        }
    }

}