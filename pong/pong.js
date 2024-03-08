var paddleHeight = 150;
var paddleWidth = 30;
var ballRadius = 25;
var halfPaddleHeight = paddleHeight/2;
var speedOfPaddle1 = 0;
var speedOfPaddle2 = 0;
var positionOfPaddle1 = 220;
var positionOfPaddle2 = 220;
var topPositionOfBall = 210;
var leftPositionOfBall = 820;
var topSpeedOfBall = 10;
var leftSpeedOfBall = 0;
var score1 = 0;
var score2 = 0;
var gameOver = false;
var gameLoop;

function startBall(){

    topPositionOfBall = 510;
    leftPositionOfBall = 820;
    

    if(Math.random() < 0.5){

        var side = 1;

    } else{

        var side = -1;

    }

    leftSpeedOfBall = side * (Math.random() * 6 + 5);
    topSpeedOfBall = Math.random() * 6 + 5;
}

// Function to check for a winner and end the game if there is one
function updateScore() {
    // Update the scores displayed on the page
    document.getElementById('score1').innerHTML = score1.toString();
    document.getElementById('score2').innerHTML = score2.toString();

    // Check if any player has reached 10 points
    if (score1 >= 10 || score2 >= 10) {
        // Display the winner message on the page with the appropriate styling
        document.getElementById('winnerMessage').innerHTML = "Player " + (score1 > score2 ? "1" : "2") + " won!";
        document.getElementById('winnerMessage').classList.add("winner");
        
        // Show the restart button
        document.getElementById('restartButton').style.display = 'block';
        
        // Set game over to true
        gameOver = true;
    }
}

// Function to restart the game
function restartGame() {
    // Reset the scores
    score1 = 0;
    score2 = 0;
    
    // Hide the winner message and restart button
    document.getElementById('winnerMessage').innerHTML = "";
    document.getElementById('restartButton').style.display = 'none';
    
    // Start the game loop again
    gameLoop = setInterval(show, 1000 / 60);
}

document.addEventListener('keydown', function(e){

    if(e.keycode == 87 || e.which == 87){
        speedOfPaddle1 = -10;
    }

    if(e.keycode == 83 || e.which == 83){
        speedOfPaddle1 = 10;
    }

    if(e.keycode == 38 || e.which == 38){
        speedOfPaddle2 = -10;
    }

    if(e.keycode == 40 || e.which == 40){
        speedOfPaddle2 = 10;
    }
})

document.addEventListener('keyup', function(e){

    if(e.keycode == 87 || e.which == 87){
        speedOfPaddle1 = 0;
    }

    if(e.keycode == 83 || e.which == 83){
        speedOfPaddle1 = 0;
    }

    if(e.keycode == 38 || e.which == 38){
        speedOfPaddle2 = 0;
    }

    if(e.keycode == 40 || e.which == 40){
        speedOfPaddle2 = 0;
    }
})

function startGameLoop() {
    gameLoop = setInterval(function show() {
        if (!gameOver) {
            // Your existing game logic
            positionOfPaddle1 += speedOfPaddle1;
            positionOfPaddle2 += speedOfPaddle2;

            topPositionOfBall += topSpeedOfBall;
            leftPositionOfBall += leftSpeedOfBall;

            if (positionOfPaddle1 <= 1) {
                positionOfPaddle1 = 1;
            }

            if (positionOfPaddle2 <= 1) {
                positionOfPaddle2 = 1;
            }

            if (positionOfPaddle1 >= window.innerHeight - paddleHeight) {
                positionOfPaddle1 = window.innerHeight - paddleHeight;
            }

            if (positionOfPaddle2 >= window.innerHeight - paddleHeight) {
                positionOfPaddle2 = window.innerHeight - paddleHeight;
            }

            if (topPositionOfBall <= 10 || topPositionOfBall >= window.innerHeight - ballRadius) {
                topSpeedOfBall = -topSpeedOfBall;
            }

            if (leftPositionOfBall <= paddleWidth) {
                if (topPositionOfBall > positionOfPaddle1 && topPositionOfBall < positionOfPaddle1 + paddleHeight) {
                    leftSpeedOfBall = -leftSpeedOfBall;
                } else {
                    score2++;
                    startBall();
                }
            }

            if (leftPositionOfBall >= window.innerWidth - ballRadius - paddleWidth) {
                if (topPositionOfBall > positionOfPaddle2 && topPositionOfBall < positionOfPaddle2 + paddleHeight) {
                    leftSpeedOfBall = -leftSpeedOfBall;
                } else {
                    score1++;
                    startBall();
                }
            }

            document.getElementById('playerOnePaddle').style.top = positionOfPaddle1 + 'px';
            document.getElementById('playerTwoPaddle').style.top = positionOfPaddle2 + 'px';

            document.getElementById('gameBall').style.top = topPositionOfBall + 'px';
            document.getElementById('gameBall').style.left = leftPositionOfBall + 'px';

            document.getElementById('score1').innerHTML = score1.toString();
            document.getElementById('score2').innerHTML = score2.toString();

            // Check for game over condition after updating positions
            updateScore();
        }
    }, 1000 / 60);
}

// Function to start the game
function startGame() {
    // Reset game variables
    gameOver = false;
    score1 = 0;
    score2 = 0;
    startBall();

    // Stop the existing game loop if it's running
    clearInterval(gameLoop);

    // Start the new game loop
    startGameLoop();

    // Clear winner message and hide restart button
    document.getElementById('winnerMessage').innerHTML = "";
    document.getElementById('restartButton').style.display = 'none';
}