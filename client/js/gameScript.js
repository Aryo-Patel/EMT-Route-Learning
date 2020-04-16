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
    let gameContainer = document.getElementById('play-game-conatiner');
    let gameBoard = document.getElementById('game-board');
    let gameHeader = document.getElementById('game-header');

    //@todo the gameContainer needs to get styled
    //@todo createGameHeader method needs to be fleshed out

    fillGameBoard(gameBoard, route)
    
}


function fillGameBoard(gameBoard, route){
    //adds the route to the ul in the html file
    route.forEach(route => {
        let routeStepContainer = document.createElement('li');
        let routeStepText = document.createElement('span');
        routeStepText.textContent = route;
        routeStepContainer.appendChild(routeStepText);
        gameBoard.appendChild(routeStepContainer);
    })
}