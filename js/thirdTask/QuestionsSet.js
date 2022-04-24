export default class QuestionsSet {
    constructor(questions) {
        this.questions = questions;
    }
    createScenaries() {

        const data = JSON.parse(this.questions),
            firstList = data.firstList,
            secondList = data.secondList;
        let firstListQuestion = [],
            secondListQuestion = [],
            firstAnswers = [],
            secondAnswers = [];
        for (let key in firstList) {
            firstListQuestion.push(key);
            firstAnswers.push(firstList[key]);
        }
        for (let key in secondList) {
            secondListQuestion.push(key);
            secondAnswers.push(secondList[key]);
        }

        let list = [];
        let step = 0;
        function quiz(question, answear, questions = firstListQuestion) {
            list.push({ [question]: answear });
            if (questions.length > step && firstAnswers[step - 1][0] == answear) {
                quiz(firstListQuestion[step++], firstAnswers[step - 1][0], firstListQuestion); // передал первый ответ
            }
            else if (questions.length > step && firstAnswers[step - 1][1] == answear) { // переключает после неправильного
                quiz(secondListQuestion[step++], secondAnswers[step - 1][0], secondListQuestion);
            }
            else if (questions.length > step && secondAnswers[step - 1][0] == answear) {
                quiz(secondListQuestion[step++], secondAnswers[step - 1][0], secondListQuestion); // вторая строчка вопросов с правильным ответом
            }
            else if (questions.length > step && secondAnswers[step - 1][1] == answear) {
                quiz(firstListQuestion[step++], firstAnswers[step - 1][0], firstAnswers);
            }
        }

        quiz(firstListQuestion[step++], firstAnswers[step - 1][0], firstListQuestion);
        let result = {
            paths: {
                number: 1,
                list: [list],
            }
        };
        result = JSON.stringify(result);
        console.log(result)

        list = [];
        step = 0;
        quiz(firstListQuestion[step++], firstAnswers[step - 1][1], firstListQuestion);
        result = {
            paths: {
                number: 2,
                list: [list],
            }
        };
        result = JSON.stringify(result);
        console.log(result)

    }
}