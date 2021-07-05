//let the game begin!

const buttonColours = ["green", "red", "yellow", "blue"];
let gamePattern = [];
let userClickedPattern = [];
var userChosenColour;
var flag = 0;
var level =1;
var currentLevel=1;
var restartVal = 0;
var sounds = [];
sounds[0] = new Audio("sounds/green.mp3");
sounds[1] = new Audio("sounds/red.mp3");
sounds[2] = new Audio("sounds/yellow.mp3");
sounds[3] = new Audio("sounds/blue.mp3");
sounds[4] = new Audio("sounds/wrong.mp3");


$(document).keypress(function() {
    if(flag==0 && restartVal==0)
    {
        //$("h1").html("level "+level);
        setTimeout(() => {
            nextSequence() 
        }, 500);
        flag =1;
    }   
});

function nextSequence() 
{
    $("h1").html("level "+level);
    var randomNumber = Math.floor(Math.random() * 4);
    console.log(randomNumber);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    sounds[randomNumber].play();
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
}


$("#green,#red,#yellow,#blue").click(function (){
    if(flag==1)
    {
        userChosenColour = $(this).attr("id");
        userClickedPattern.push(userChosenColour);
        //console.log(userClickedPattern);
        //console.log(gamePattern);
        animatePress(userChosenColour);
        checkAnswer(currentLevel-1);
        //$("#" + userChosenColour).fadeOut(100).fadeIn(100);
    }
});

function animatePress(currentColour)
{
    $("#"+currentColour).addClass("pressed");
    setTimeout(() => {
        $("#"+currentColour).removeClass("pressed") 
    }, 100);
}

function playSound(colourNumber)
{
    sounds[colourNumber].play();
}
   
function checkAnswer(presentLevel)
{
    console.log("presentLevel :" + presentLevel);
    if(userChosenColour == gamePattern[presentLevel])
    {
        if(presentLevel == level-1)
        {
            setTimeout(() => {
                nextSequence() 
            }, 1000);
            level++;
            userClickedPattern=[];
            console.log(userClickedPattern);
            currentLevel=1;
        }
        else
        {
            currentLevel++;
        }
        var colourNumber;
        for(i=0;i<4;i++)
        {
            if(userChosenColour==buttonColours[i])
                colourNumber=i;
        }
        playSound(colourNumber);
    }
    else
    {
        playSound(4);
        var score = level-1;
        $("h1").html("Game over! Score: "+score+" <br>Refresh to restart");
        $("#footer-title").html("");
        restart();
    }

}
       // });
function restart()
{
    level =1;
    gamePattern=[];
    flag=0;
    restartVal=1;
}