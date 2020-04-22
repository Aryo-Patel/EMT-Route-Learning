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

function initializeGameBoard(startLocation, endLocation, route){
    let gameContainer = document.getElementById('play-game-container');
    let gameForm = document.getElementById('play-game-form');
    let gameBoard = document.getElementById('game-board');
    let gameHeader = document.getElementById('game-header');

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
    route.forEach(route => {
        //load in the span elements from the styleRoute function
        route = styleRoute(route);

        //append the route to the ordered list
        let routeStepContainer = document.createElement('li');
        routeStepContainer.appendChild(route);
        gameBoard.appendChild(routeStepContainer);

    })
}

function styleRoute(route) {
    route = route + ''; //turns the true on the last route into a string


    let span = document.createElement('span'); //everything goes inside the span

    while(route.indexOf('<') !== -1){ // splits the input text around the directions, and changes the nominally bolded words to inputs
        span.innerHTML += route.substring(0, route.indexOf('<'));
        span.id += route.substring(0, route.indexOf('<'));

        route = route.substring(route.indexOf('>') + 1) //shortens route so it doesn't include first <
        let inputText = route.substring(0, route.indexOf('<'));
        
        //puts an input element inside the span, giving it dynamic size changing for test purposes change placeholder to value
        span.innerHTML += `<input class = inputText value = "${inputText}" onkeypress = "this.style.width = ((this.value.length + 1)*8 + 10) + 'px';" required>`;                                                       
        span.id += inputText;

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
    submitButton.addEventListener('click', e =>gameSubmit(e))
    gameForm.appendChild(submitButton);
}

function gameSubmit(e){
    console.log('game has been submitted');
    e.preventDefault();


}