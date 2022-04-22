//first task
import Quantities from './firstTask/Quantities.js';
import Converter from './firstTask/Converter.js';
import ConverterUpper from './firstTask/ConverterUpper.js';

const unit = document.getElementById('unit'),
    convert_to = document.getElementById('convert_to'),
    number_unit = document.getElementById('number');

number_unit.onkeydown = (event) => {
    return (event.key >= '0' && event.key <= '9') || event.key == 'ArrowLeft' || event.key == 'ArrowRight' || event.key == 'Delete' || event.key == 'Backspace' || event.key == '.';
}
let first_form = document.getElementById("first_form");
first_form.addEventListener('submit', (e) => {
    e.preventDefault();
    let data = Object.fromEntries(new FormData(e.target).entries());
    let pushEntries = new Quantities(data.unit, data.value, data.convert_to);
    let JSON_form = pushEntries.getJSON();
    let converter = new Converter(JSON_form);

    let result = converter.converting();
    if (typeof result == typeof {}) {
        let converterUpper = new ConverterUpper(JSON.stringify(result));
        let str = converterUpper.converting();
        str = JSON.parse(str);
        document.querySelector('.out-1').textContent = `Your result ${str.value}${str.unit}`;
    } else {
        result = JSON.parse(result);
        document.querySelector('.out-1').textContent = `Your result ${result.value}${result.unit}`;
    }
});

function adderElements(el, text) {
    let above_option = document.createElement("option");
    above_option.setAttribute("value", el);
    above_option.textContent = text;
    document.getElementById(el).remove();
    let option_clone = above_option.cloneNode(true);
    unit.append(above_option);
    convert_to.append(option_clone);
}

let add_value = document.getElementById("add_value");
add_value.onclick = () => {
    let option = document.getElementById('add_to');

    if (option.value == "mm") {
        adderElements(option.value, "millimeters");
    } else if (option.value == "yd") {
        adderElements(option.value, "yards");
    } else if (option.value == "km") {
        adderElements(option.value, "kilometers");
    }
}

//second task
import FormHandler from './secondTask/FormHandler.js';
import CheckboxHandler from './secondTask/CheckboxHandler.js';
import Filter from './secondTask/filter/Filter.js';
import FilterInput from './secondTask/filter/FilterInput.js';
import FilterCheck from './secondTask/filter/FilterCheck.js';
import DataСollector from './secondTask/DataСollector.js';

//отправка формы в базу данных
const db = [];
let second_form = document.getElementById("second_form");

second_form.addEventListener('submit', (e) => {
    e.preventDefault();
    let data = Object.fromEntries(new FormData(e.target).entries());
    let handler = new FormHandler(data);
    let result = handler.handler();
    db.push(result);
    console.log(db);
});
// cмена мода
document.getElementById("mode").addEventListener('change', (e) => {
    if (e.target.value == 'boxes') {
        document.querySelector('.search_name').value = '';
        document.querySelector('.input_name').classList.add("close");
        document.querySelector('.include').classList.remove("close");
    } else {
        document.querySelector('.input_name').classList.remove("close");
        document.querySelector('.include').classList.add("close");
        let checkboxes = new CheckboxHandler(document.querySelectorAll('.check'));
        checkboxes.checkboxesOff()
    }
})
// показ фильтра
document.querySelector('.show').onclick = () => {
    let checkboxes = new CheckboxHandler(document.querySelectorAll(".check"));
    const checkOn = checkboxes.getCheckedCheckBoxes(); // чекс боксы
    const sort = document.getElementById('sort').value; // списки
    let input = document.querySelector('.search_name').value;
    const key = document.getElementById('key').value;
    if (input == '') input = false;

    // получаем полученные данные в классе
    if (input) {
        let filter = new FilterInput(sort, key, input);
        let config = JSON.stringify(filter.filterOn())
        let set = new DataСollector(db, config);
        console.log(set.creatingRequest());
    } else if (checkOn) {
        let filter = new FilterCheck(sort, checkOn);
        let config = JSON.stringify(filter.filterOn())
        let set = new DataСollector(db, config);
        console.log(set.creatingRequest());
    } else {
        let filter = new Filter(sort);
        let config = JSON.stringify(filter.filterOn())
        let set = new DataСollector(db, config);
        console.log(set.creatingRequest());
    }

}

//third Task