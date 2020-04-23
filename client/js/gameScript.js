/*
~~~~~~~~~~~~~~~~~~~~~~~~~~
        functions for now 
~~~~~~~~~~~~~~~~~~~~~~~

    initializeGameBoard(startLocation, endLocation, route)
        container for the other functions

    createGameHeader(startLocation, endLocation)
        creates the game header that says start location and
        the end location

    fillGameBoard(gameBoard, route)
        fills the preexisting ul from the html with li elements
        after clearing prior elements in the ul 

*/
let routeArray;
function initializeGameBoard(startLocation, endLocation, route){
    let gameContainer = document.getElementById('play-game-container');
    let gameForm = document.getElementById('play-game-form');
    let gameBoard = document.getElementById('game-board');
    let gameHeader = document.getElementById('game-header');
    routeArray = route;
    //@todo the gameContainer needs to get styled
    //@todo createGameHeader method needs to be fleshed out
    createGameHeader(gameHeader, startLocation, endLocation);
    fillGameBoard(gameBoard, route)

    addButton(gameForm);
    
}

function createGameHeader(gameHeader, startLoc, endLoc){
    gameHeader.innerHTML = `Navigate from ${startLoc} to ${endLoc}`;
}

function fillGameBoard(gameBoard, route){
    //adds the route to the ul in the html file
    route.forEach((route, index) => {
        //load in the span elements from the styleRoute function
        route = styleRoute(route, index);

        //append the route to the ordered list
        let routeStepContainer = document.createElement('li');
        routeStepContainer.classList.add('route-step');
        routeStepContainer.appendChild(route);
        gameBoard.appendChild(routeStepContainer);

    })
}

function styleRoute(route, index) {
    route = route + ''; //turns the true on the last route into a string
    let idCount = 0;

    let span = document.createElement('span'); //everything goes inside the span

    while(route.indexOf('<') !== -1){ // splits the input text around the directions, and changes the nominally bolded words to inputs
        span.innerHTML += route.substring(0, route.indexOf('<'));
        span.id += route.substring(0, route.indexOf('<'));

        route = route.substring(route.indexOf('>') + 1) //shortens route so it doesn't include first <
        let inputText = route.substring(0, route.indexOf('<'));
        
        //puts an input element inside the span, giving it dynamic size changing for test purposes change placeholder to value
        span.innerHTML += `<input id = "${index}-${idCount}" class = "inputText inputGroup${index}" value = "${inputText}" onkeypress = "this.style.width = ((this.value.length + 1)*8 + 10) + 'px';" required>`;                                                       
        span.id += inputText;
        idCount++;

        route = route.substring(route.indexOf('>')+ 1);
    }

    //the last route will appear blank, but the final step is simply arriving...applying a constant value that will be displayed
    if(span.innerHTML === ''){
        span.innerHTML = 'Arrived';
        span.id+= 'Arrived';
    }
    return span;
}

function addButton(gameForm){
    //create game button
    let submitButton = document.createElement('BUTTON');
    submitButton.type = 'submit';
    submitButton.innerHTML = 'Check answers';
    
    //add the onclick to be prevent default
    submitButton.addEventListener('click', e =>gameSubmit(e, routeArray))
    gameForm.appendChild(submitButton);
}

function gameSubmit(e, routeArray){
    e.preventDefault();

    let liList = document.querySelectorAll('.route-step'); //needed to get inside and map over the inputs using parallel class names
    liList = Array.from(liList);

    let userInputValues = []; // 2D array that stores the user inputs for each route

    liList.forEach((li, index) => {
        let inputList = document.querySelectorAll(`.inputGroup${index}`);
        inputList = Array.from(inputList);
        
        let stepUserInputs = inputList.map(input => { //each one of these inputs are the ones that the user put in. 
            return input.value;
        });

        userInputValues.push(stepUserInputs);
    });


    let correctInputValues = []; //stores the values that google maps gives for the inputs

    routeArray.forEach(route => {//returns all the words in between the bold tags that the computer gives 
        route = boldWords(route);
        correctInputValues.push(route);
    });

    checkAnswers(userInputValues, correctInputValues); //function will check if the two routes match up with visual display if they do

}

function boldWords(route) {
    route = route + ''; //turns the true on the last route into a string
    let returnArray = [];

    while(route.indexOf('<') !== -1){ // splits the input text around the directions, and changes the nominally bolded words to inputs
        
        route = route.substring(route.indexOf('>') + 1) //shortens route so it doesn't include first <
        
        returnArray.push(route.substring(0, route.indexOf('<'))); // adds the next part to return route

        route = route.substring(route.indexOf('>')+ 1);
    }
    return returnArray;
}

function checkAnswers(userInputValues, correctInputValues){
    for(let i = 0; i < userInputValues.length; i++){
        for(let j = 0; j < userInputValues[i].length; j++){
            if(userInputValues[i][j] !== correctInputValues[i][j]){
                console.log(userInputValues[i][j]);
            }
        }
    }
}