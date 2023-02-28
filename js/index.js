var selectedRoute;
var mode="";
var greenColorValue=127;
var redColorValue=127;
var blueColorValue=0;




function startGame(game){
    document.getElementById("startPage").style.display="none";
    switch(game){
        case('TRAIN'):
        mode="TRAIN";
        var length = data.trainLines.length;
        selectedRoute = data.trainLines[getRndInteger(0,length)];
        document.getElementById("gameHeadline").innerText=selectedRoute.name;
        break;

        case('S&B'):
        mode="S&B";
        var length = data.sbStreets.length;
        selectedRoute = data.sbStreets[getRndInteger(0,length)];
        document.getElementById("gameHeadline").innerText=selectedRoute.name;
        break;

        case('CAR'):
        mode="CAR";
        var length = data.autoLines.length;
        selectedRoute = data.autoLines[getRndInteger(0,length)];
        document.getElementById("gameHeadline").innerText=selectedRoute.name;
        break;

        case('SPL'):
        mode="SPL";
        var length = data.splQuestions.length;
        selectedRoute = data.splQuestions[getRndInteger(0,length)];
        document.getElementById("gameHeadline").innerText=selectedRoute.name;
        break;

        case('RANDOM'):
        mode = "RANDOM";
        var randomModes = ["TRAIN","S&B","CAR"];
        var randomMode = randomModes[getRndInteger(0,randomModes.length)];

        switch(randomMode){
            case('TRAIN'):
            var length = data.trainLines.length;
            selectedRoute = data.trainLines[getRndInteger(0,length)];
            document.getElementById("gameHeadline").innerText=selectedRoute.name;
            break;

            case('S&B'):
            var length = data.sbStreets.length;
            selectedRoute = data.sbStreets[getRndInteger(0,length)];
            document.getElementById("gameHeadline").innerText=selectedRoute.name;
            break;

            case('CAR'):
            var length = data.autoLines.length;
            selectedRoute = data.autoLines[getRndInteger(0,length)];
            document.getElementById("gameHeadline").innerText=selectedRoute.name;
            break;
        }
    }
    document.getElementById("game").style.display="block";

};

function restartGame(){
    document.body.style.background = 'rgb(' + redColorValue + ',' + greenColorValue + ',' + blueColorValue+')';
    document.getElementById("notice").innerText="Komma setzen als Trenner zwischen zwei Antworten/Knotenpunkten";
    document.getElementById("checkButton").style.display='block';
    document.getElementById("againButton").style.display='none'
    document.getElementById("userEntry").value="";
    document.getElementById("userEntry").disabled=false;
    startGame(mode);
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
  }

function checkUserInput(){
    var userInputCorrect = true;
    var userInput = document.getElementById("userEntry").value;
    var splitedInput = userInput.split(",");
    for(var i=0;i<splitedInput.length;i++) //remove any unecessary blankspaces in userinput
    {
        splitedInput[i] = splitedInput[i].trim();
    }

    if(selectedRoute.locationsInOrder.length!=splitedInput.length) //Checks if userinput has same amount of stations as solution
    {
        userInputCorrect = false;
    }
    else
    {
        for(var i=0;i<selectedRoute.locationsInOrder.length;i++){//Check for same order as in data{
            if(splitedInput[i]!=selectedRoute.locationsInOrder[i]){
                userInputCorrect = false;
                break;
            }
        }
        if(!userInputCorrect)
        {
            userInputCorrect=true;
            for(var i=0;i<selectedRoute.locationsInOrder.length;i++){ //Check for reversed order as in data
                if(splitedInput[i]!=selectedRoute.locationsInOrder[selectedRoute.locationsInOrder.length-(i+1)])
                {
                    userInputCorrect = false;
                    break;
                }
            }
        }
    }
    if(userInputCorrect == false)
    {
        document.body.style.background = "red"; 
        redColorValue=redColorValue+10;
        greenColorValue=greenColorValue-10;

        var rightroute="";
        for(var i=0;i<selectedRoute.locationsInOrder.length;i++)
        {
            if(i==selectedRoute.locationsInOrder.length-1)
            {
                rightroute = rightroute + selectedRoute.locationsInOrder[i];
            }
            else
            {
                rightroute = rightroute + selectedRoute.locationsInOrder[i]+" - ";
            }
        }
        document.getElementById("notice").innerText="Lösung: "+rightroute;
    }
    else
    {
        document.body.style.background = "green"; 
        redColorValue=redColorValue-10;
        greenColorValue=greenColorValue+10;

    }
    if(greenColorValue>255)
    {
        greenColorValue = 255;
        redColorValue = 0;
    }
    if(redColorValue>255)
    {
        redColorValue = 255;
        greenColorValue = 0;
    }
    document.getElementById("userEntry").disabled=true;
    document.getElementById("checkButton").style.display='none';
    document.getElementById("againButton").style.display='block';
}