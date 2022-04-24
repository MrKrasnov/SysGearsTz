//first task
import Quantities from './firstTask/Quantities.js';
import Converter from './firstTask/Converter.js';
import ConverterUpper from './firstTask/ConverterUpper.js';

const unit = document.getElementById('unit'),
    convert_to = document.getElementById('convert_to');

document.getElementById('number').onkeydown = (event) => {
    return (event.key >= '0' && event.key <= '9') || event.key == 'ArrowLeft' || event.key == 'ArrowRight' || event.key == 'Delete' || event.key == 'Backspace' || event.key == '.';
}

document.getElementById("first_form").addEventListener('submit', (e) => {
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

document.getElementById("add_value").onclick = () => {
    let option = document.getElementById('add_to');

    if (option.value == "mm") {
        adderElements(option.value, "millimeters");
    }
    else if (option.value == "yd") {
        adderElements(option.value, "yards");
    }
    else if (option.value == "km") {
        adderElements(option.value, "kilometers");
    }
}

function adderElements(el, text) {
    let above_option = document.createElement("option");
    above_option.setAttribute("value", el);
    above_option.textContent = text;
    document.getElementById(el).remove();

    let option_clone = above_option.cloneNode(true);
    unit.append(above_option);
    convert_to.append(option_clone);
}

//second task
import FormHandler from './secondTask/FormHandler.js';
import CheckboxHandler from './secondTask/CheckboxHandler.js';
import Filter from './secondTask/filter/Filter.js';
import FilterInput from './secondTask/filter/FilterInput.js';
import FilterCheck from './secondTask/filter/FilterCheck.js';
import ClassToggle from './secondTask/ClassToggle.js';
import DataСollector from './secondTask/DataСollector.js';
import ReaderByRequest from './secondTask/Request/ReaderByRequest.js';
import Show from './secondTask/show/Show.js';

const db = [];
document.getElementById("second_form").addEventListener('submit', (e) => {
    e.preventDefault();
    let data = Object.fromEntries(new FormData(e.target).entries());
    let handler = new FormHandler(data);
    let result = handler.handler();
    db.push(result);
});

document.getElementById("mode").addEventListener('change', (e) => {
    if (e.target.value == 'boxes') {
        document.querySelector('.search_name').value = '';
        document.querySelector('.input_name').classList.add("close");
        document.querySelector('.include').classList.remove("close");
    }
    else {
        document.querySelector('.input_name').classList.remove("close");
        document.querySelector('.include').classList.add("close");
        let classToggle = new ClassToggle(document.querySelectorAll('.extraOption'));
        classToggle.divHide();
        let checkboxes = new CheckboxHandler(document.querySelectorAll('.check'));
        checkboxes.checkboxesOff()
    }

});

document.querySelectorAll(".check")[0].addEventListener('change', (e) => toggleCheck(e, 0));
document.querySelectorAll(".check")[1].addEventListener('change', (e) => toggleCheck(e, 1));

document.querySelector('.show').onclick = () => {
    let checkboxes = new CheckboxHandler(document.querySelectorAll(".check"));
    const checkOn = checkboxes.getCheckedCheckBoxes();
    const sort = document.getElementById('sort').value;
    let input = document.querySelector('.search_name').value;
    const key = document.getElementById('key').value;
    if (input == '') input = false;

    let filter;

    if (input) {
        filter = new FilterInput(sort, key, input);

    }
    else if (checkOn) {
        filter = new FilterCheck(sort, checkOn);

    }
    else {
        filter = new Filter(sort);
    }

    let config = JSON.stringify(filter.filterOn())
    let set = new DataСollector(db, config);
    let resultJSON = new ReaderByRequest(set.creatingRequest());
    let show = new Show(resultJSON.getRequestObj(), document.querySelectorAll('.profiles'))
    show.showHide()
    show.showCreateDiv();
};

function toggleCheck(e, i) {
    if (e.target.checked) {
        let classToggle = new ClassToggle(document.querySelectorAll('.extraOption'));
        classToggle.divTargetShow(i);
    } else {
        let classToggle = new ClassToggle(document.querySelectorAll('.extraOption'));
        classToggle.divTargetHide(i);
    }
};

//third Task
import QuestionsSet from './thirdTask/QuestionsSet.js'
import { questions } from './thirdTask/questions.js';

document.querySelector('.third_task').onclick = () => {
    const questionsSet = new QuestionsSet(JSON.stringify(questions));
    questionsSet.createScenaries();
}