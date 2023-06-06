'use strict';

const numberBtns = document.querySelectorAll('.numbers');
const operatorBtns = document.querySelectorAll('.operators');
const equalToBtn = document.querySelector('.equalTo');
const upperScreen = document.querySelector('.upper-screen');
const point = document.querySelector('.point');
const lowerScreen = document.querySelector('.lower-screen');
const btnReset = document.querySelector('.reset');
const btnDelete = document.querySelector('.delete');

let num1 = '';
let num2 = '';
let operation = null;
let shouldResetDisplay = false;

const resetDisplay = function () {
    lowerScreen.textContent = '';
    shouldResetDisplay = false;
};

const reset = function () {
    lowerScreen.textContent = 0;
    upperScreen.textContent = '';
    num1 = '';
    num2 = '';
    operation = null;
};

const addPoint = function () {
    if (shouldResetDisplay) resetDisplay();
    if (lowerScreen.textContent === '') lowerScreen.textContent = 0;
    if (lowerScreen.textContent.includes('.')) return;
    lowerScreen.textContent += '.';
};

const displayNumber = function (number) {
    if (lowerScreen.textContent === '0' || shouldResetDisplay) resetDisplay();
    lowerScreen.textContent += +number;
};

const deleteNum = function () {
    lowerScreen.textContent = lowerScreen.textContent.toString().slice(0, -1);
    upperScreen.textContent = upperScreen.textContent.toString().slice(0, -1);
};

const runOperation = function (operatetor) {
    if (operation !== null) calculate();
    num1 = lowerScreen.textContent;
    operation = operatetor;
    console.log(num1);
    console.log(operatetor);
    upperScreen.textContent = `${num1}${operatetor}`;
    shouldResetDisplay = true;
};

const calculate = function () {
    if (operation === null || shouldResetDisplay) return;
    if (operation === '/' && lowerScreen.textContent === '0') {
        lowerScreen.textContent = 'ERROR';
        return;
    }
    num2 = lowerScreen.textContent;
    lowerScreen.textContent = roundNum(calc(operation, num1, num2));
    upperScreen.textContent = `${num1}${operation}${num2}`;
    operation = null;
};

const roundNum = function (number) {
    return Math.round(number * 1000) / 1000;
};

const calc = function (operator, n1, n2) {
    num1 = +num1;
    num2 = +num2;
    switch (operator) {
        case '+':
            return num1 + num2;
        case '-':
            return num1 - num2;
        case 'x':
            return num1 * num2;
        case '/':
            return num1 / num2;
        case '%':
            return num1 % num2;
        default:
            return null;
    }
};

// Evennt Handlers
equalToBtn.addEventListener('click', calculate);

btnReset.addEventListener('click', reset);

btnDelete.addEventListener('click', deleteNum);

point.addEventListener('click', addPoint);

numberBtns.forEach(btnNum =>
    btnNum.addEventListener('click', () =>
        displayNumber(btnNum.textContent.trim())
    )
);

operatorBtns.forEach(operatorBtn =>
    operatorBtn.addEventListener('click', () =>
        runOperation(operatorBtn.textContent.trim())
    )
);
