export default class Show {
    constructor(result, divs) {
        this.result = result;
        this.divs = divs;
    }

    showHide() {
        for (let index = 0; index < this.divs.length; index++) {
            this.divs[index].remove();
        }
    }

    showCreateDiv() {
        let setArray = [];
        let result = JSON.parse(this.result);

        for (let item of result["result"]) {
            if (item.hasOwnProperty('disabled') & item.hasOwnProperty('rating')) {
                setArray.push([item.name, item.email, `Disabled: ${item.disabled}`, `Rating: ${item.rating}`]);
                continue;
            } else if (item.hasOwnProperty('disabled')) {
                setArray.push([item.name, item.email, `Disabled: ${item.disabled}`]);
                continue;
            } else if (item.hasOwnProperty('rating')) {
                setArray.push([item.name, item.email, `Rating: ${item.rating}`]);
                continue;
            } else {
                setArray.push([item.name, item.email]);
            }
        }

        for (let arr of setArray) {
            createDIV(arr[0], arr[1], arr[2], arr[3])
        }

        function createDIV(name, email, prop = "hide", prop2 = "hide") {
            let div = document.createElement('div');
            div.classList.add('profiles');
            div.innerHTML = `<div class="profiles">
                <div>
                    <p>${name}</p>
                    <p>${email}</p>
                </div>
                <div>
                    <p class="${prop}">${prop}</p>
                    <p class="${prop2}">${prop2}</p>
                </div>
            </div>`;
            document.getElementById('second_task').append(div);
        }
        return result;
    }
}