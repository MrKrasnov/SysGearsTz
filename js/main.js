//first task
import Quantities from './Quantities.js';
import Converter from './Converter.js';

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
    // добавляем елементы в класс
    let pushEntries = new Quantities(data.unit, data.value, data.convert_to);

    //метод класса получаем {"distance": {"unit": "m", "value": "0.5"}, "convert_to": "ft"}
    let JSON_form = pushEntries.getJSON();
    // console.log(JSON_form);
    let converter = new Converter(JSON_form);

    console.log(converter.converting())
});

// supplement
let add_value = document.getElementById("add_value");
add_value.onclick = () => {
    let option = document.getElementById('add_to');

    if (option.value == "mm") {
        let above_option = document.createElement("option");
        above_option.setAttribute("value", "mm");
        above_option.textContent = "millimeters";
        document.getElementById("mm").remove();
        let option_clone = above_option.cloneNode(true);
        unit.append(above_option);
        convert_to.append(option_clone);
    } else if (option.value == "yd") {
        let above_option = document.createElement("option");
        above_option.setAttribute("value", "yd");
        above_option.textContent = "yards";
        document.getElementById("yd").remove();
        let option_clone = above_option.cloneNode(true);
        unit.append(above_option);
        convert_to.append(option_clone);
    } else if (option.value == "km") {
        let above_option = document.createElement("option");
        above_option.setAttribute("value", "km");
        above_option.textContent = "kilometers";
        document.getElementById("km").remove();
        let option_clone = above_option.cloneNode(true);
        unit.append(above_option);
        convert_to.append(option_clone);
    }
}

//second Task