export default class Converter {
    constructor(request) {
        this.request = request
    }
    converting() {
        let convert_to = JSON.parse(this.request);
        let distance = convert_to.distance;
        delete convert_to.distance;
        let int = rounding(+distance.value);
        let result = {};

        function defaultSending() {
            let obj = {
                unit: distance.unit,
                value: int,
                convert_to: convert_to.convert_to,
            };

            return obj;
        }

        function sending() {
            let obj = {
                unit: convert_to.convert_to,
                value: result[convert_to.convert_to]
            }
            let send = JSON.stringify(obj);
            return send;
        }

        function rounding(int) {
            return Math.floor(int * 100) / 100;
        }

        switch (distance.unit) {
            case 'ft':
                result.mm = rounding(int / 0.0032808);
                result.m = rounding(int / 3.2808);
                result.in = rounding(int * 12);
                result.cm = rounding(int / 0.032808);
                result.yd = rounding(int * 0.33333);
                result.km = rounding(int / 3280.8);
                result.ft = int;
                return sending();
            case 'm':
                result.mm = rounding(int * 1000);
                result.m = int;
                result.in = rounding(int * 39.370);
                result.cm = rounding(int / 0.01);
                result.yd = rounding(int * 1.0936);
                result.km = rounding(int / 1000);
                result.ft = rounding(int * 3.2808);
                return sending();
            case 'in':
                result.mm = rounding(int / 0.03937);
                result.m = rounding(int / 39.370);
                result.in = int;
                result.cm = rounding(int / 0.39370);
                result.yd = rounding(int * 0.027778);
                result.km = rounding(int / 39370);
                result.ft = rounding(int * 0.083333);
                return sending();
            case 'cm':
                result.mm = rounding(int / 10);
                result.m = rounding(int / 100);
                result.in = rounding(int * 0.39370);
                result.cm = int;
                result.yd = rounding(int * 0.010936);
                result.km = rounding(int / 100000);
                result.ft = rounding(int * 0.032808);
                return sending();
            default:
                return defaultSending();
        }

    }
}