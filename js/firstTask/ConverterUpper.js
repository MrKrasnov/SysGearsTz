export default class UpperConverter {
    constructor(request) {
        this.request = request
    }

    converting() {
        let parcel = JSON.parse(this.request);
        let unit = parcel.unit,
            int = +parcel.value,
            convert = parcel.convert_to;
        let result = {};

        function rounding(int) {
            return Math.floor(int * 100) / 100;
        }

        function sending() {
            let obj = {
                unit: convert,
                value: result[convert]
            }
            let send = JSON.stringify(obj);
            return send;
        }

        switch (unit) {
            case 'yd':
                result.mm = rounding(int / 0.0010936);
                result.m = rounding(int / 1.0936);
                result.in = rounding(int * 36);
                result.cm = rounding(int / 0.010936);
                result.yd = int;
                result.km = rounding(int / 1093.6);
                result.ft = rounding(int * 3);
                return sending();
            case 'km':
                result.mm = rounding(int * 1000000);
                result.m = rounding(int * 1000);
                result.in = rounding(int * 39370);
                result.cm = rounding(int * 100000);
                result.yd = rounding(int * 1093.6);
                result.km = int;
                result.ft = rounding(int * 3280.8);
                return sending();
            case 'mm':
                result.mm = int;
                result.m = rounding(int / 1000);
                result.in = rounding(int * 0.039370);
                result.cm = rounding(int / 10);
                result.yd = rounding(int * 0.0010936);
                result.km = rounding(int / 1000000);
                result.ft = rounding(int * 0.0032808);
                return sending();
        }

        return parcel;
    }
}