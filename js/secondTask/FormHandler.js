export default class FormHandler {
    constructor(data) {
        this.data = data;
    }
    handler() {
        let source = this.data;
        source.disabled = false;
        source.rating = 0;
        source = JSON.stringify(source);
        return source;
    }
}