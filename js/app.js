import { dictionary } from './dictionary.js';

let gameField = document.querySelector('.game_field');
let buttonspanel = document.querySelector('.buttons');
let currentRow = 0;
let currentSquare = 0;
let rightWord = getRandomWord(dictionary, dictionary.length);
let isGameOver = false;
let numberOfRows = 6;
let numberOfColumns = 5;
let incrdecr = 1;

//table
function createArray(){
    let gameRows = new Array(numberOfRows);
    for (let i = 0; i < numberOfRows; i++) {
        gameRows[i] = new Array(numberOfColumns);
        for (let j = 0; j < numberOfColumns; j++){
            gameRows[i][j] = '';
        }
    }return gameRows;
}
let gameRows = createArray();

gameRows.forEach((gameRow, index) => {
    const rowElem = document.createElement('div');
    rowElem.setAttribute('id', 'row-' + index)
    rowElem.className = 'table_row';
    gameRow.forEach((square, squareIndex) => {
        const squareElem = document.createElement('div');
        squareElem.setAttribute('id','row-'+ index+ '-square-' + squareIndex);
        squareElem.className = 'table_square';
        rowElem.append(squareElem);
    })
    
    gameField.append(rowElem);
})

//reset button
const Reset = document.createElement('button');
Reset.textContent = 'Reset';
buttonspanel.append(Reset);
Reset.className = 'but';
Reset.addEventListener('click', function(){
    window .location.reload();
});

//check button
const Check = document.createElement('button');
Check.textContent = 'Check';
buttonspanel.append(Check);
Check.className = 'but';
Check.addEventListener('click', function(){
    if (!isGameOver){
        const userWord = gameRows[currentRow].join('');
        if (currentSquare > numberOfColumns - incrdecr) {
            if (!dictionary.find(element => element === userWord)) {
                alert('word not in list');
                currentSquare = 0;
                return;
            } else {
                coloringSquare()
                if (rightWord === userWord) {
                    alert('Congratulations! You won');
                    isGameOver = true;
                    return;
                } else {
                    if (currentRow >= numberOfColumns) {
                        isGameOver = true;
                        alert('Game Over');
                        return;
                    }
                    if (currentRow < numberOfColumns) {
                        currentRow += incrdecr;
                        currentSquare = 0;
                    }
                }
            }
        }
    }
});

//get word from list
function getRandomWord(array, max){
    let num = Math.floor(Math.random() * max);
    return array[num];
}

//key variety
function handleClick(elem) {
    if(elem.key === 'Backspace'){
        deleteLetter();
        return;
    }
    addLetter(elem.key);
    
}

//add letter
function addLetter(elem){
    if (currentSquare < numberOfColumns && currentRow < numberOfRows){
        const square = document.getElementById('row-'+ currentRow + '-square-' + currentSquare);
        square.textContent = elem;
        gameRows[currentRow][currentSquare] = elem;
        square.setAttribute('data', elem);
        currentSquare += incrdecr;   
    }
}

//add listener on keybord 
document.addEventListener('keydown', function(e) {
    if (/[а-яіїєґ]/ig.test(e.key) || e.key === 'Backspace'){
        handleClick(e);
    }    
})

//delete letter
function deleteLetter(){
    if (currentSquare > 0) {
        currentSquare -= incrdecr;
        const square = document.getElementById('row-' + currentRow + '-square-' + currentSquare);
        square.textContent = '';
        gameRows[currentRow][currentSquare] = '';
        square.setAttribute('data', '');
    }
}

//change colors
function coloringSquare(){
    const rowSquares = document.querySelector('#row-' + currentRow).childNodes;
    rowSquares.forEach((square, index) => {
        const dataLetter = square.getAttribute('data');
        if (dataLetter === rightWord[index]){
            square.classList.add('green');
        }else if(rightWord.includes(dataLetter)){
            square.classList.add('yellow');
        }else{
            square.classList.add('gray');
        }
    })
}










