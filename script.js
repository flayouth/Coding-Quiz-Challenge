// question section


var questions = [
    {
        title: "All of the following are JavaScript Date Types EXCEPT:",
        choices: ["A. strings", "B. booleans", "C. alerts", "D. numbers"],
        answer: "C. alerts"
    },


    {
        title: "The condition in an if / else statement is enclosed within what?",
        choices: ["A. quotes", "B. curly brackets", "C. parenthesis", "D. square brackets"],
        answer: "C. parenthesis"
    },



    {
        title: "Arrays in Javascript can be used to store what?",
        choices: ["A. numbers and strings", "B. other arrays", "C. booleans", "D. all of the above"],
        answer: "D. all of the above"
    },



    {
        title: "String values must be enclosed within ____ when being assigned to variables.",
        choices: ["A. commas", "B. curly brackets", "C. quotes", "D. parenthesis"],
        answer: "C. quotes"
    },



    {
        title: "A very useful tool for used during development and debugging for printing content to the debugger is:",
        choices: ["A. Javascript", "B. terminal/bash", "C. for-loops", "D. console-log"],
        answer: "D. console-log"
    },
  
  ];


  var score = 0;
  var questionIndex = 0;
  var absoluteTime = document.querySelector("#timer");
  var timer = document.querySelector("#startTimer");
  var questionsDiv = document.querySelector("#questions");
  var container = document.querySelector("#container");
  // timer
  var secondsLeft = 75;
  var sameCost = 0;
  var cost = 15;

  var divNew = document.createElement("div");
  
  timer.addEventListener("click", function () {
    if (sameCost === 0) {
        sameCost = setInterval(function () {
            secondsLeft--;
            absoluteTime.textContent = "Time: " + secondsLeft;
  
            if (secondsLeft <= 0) {
                clearInterval(sameCost);
                allDone();
                absoluteTime.textContent = "Time's up!";
            }
        }, 1000);
    }
    render(questionIndex);
  });
  
  function render(questionIndex) {
    questionsDiv.innerHTML = "";
    divNew.innerHTML = "";
  
    for (var i = 0; i < questions.length; i++) {
        var playerQuestion = questions[questionIndex].title;
        var playerChoices = questions[questionIndex].choices;
        questionsDiv.textContent = playerQuestion;
    }
   
    playerChoices.forEach(function (newItem) {
        var listItem = document.createElement("button");
        listItem.textContent = newItem;
        questionsDiv.appendChild(divNew);
        divNew.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
  }

  function compare(event) {
    var element = event.target;
  
    if (element.matches("button")) {
  
        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");
      
        if (element.textContent == questions[questionIndex].answer) {
            score++;
            createDiv.textContent = "Correct! The answer was:  " + questions[questionIndex].answer;
        } else {
          
            secondsLeft = secondsLeft - cost;
            createDiv.textContent = "Wrong! The correct answer is:  " + questions[questionIndex].answer;
        }
  
    }
    // active question
    questionIndex++;
  
    if (questionIndex >= questions.length) {
        allDone();
        createDiv.textContent = "End of quiz!" + " " + "You got  " + score + "/" + questions.length + " Correct!";
    } else {
        render(questionIndex);
    }
    questionsDiv.appendChild(createDiv);
  
  }
  // result of quiz and name 
  function allDone() {
    questionsDiv.innerHTML = "";
    absoluteTime.innerHTML = "";
  
    
    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "All Done!"
  
    questionsDiv.appendChild(createH1);
  
   
    var newText = document.createElement("p");
    newText.setAttribute("id", "newText");
  
    questionsDiv.appendChild(newText);
  
    //  time remaining
    if (secondsLeft >= 0) {
        var timeRemaining = secondsLeft;
        var newText2 = document.createElement("p");
        clearInterval(sameCost);
        newText.textContent = "Your final score is: " + timeRemaining;
  
        questionsDiv.appendChild(newText2);
    }
  

    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Enter your initials: ";
  
    questionsDiv.appendChild(createLabel);
  
 
    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";
  
    questionsDiv.appendChild(createInput);
  
    
    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "Submit");
    createSubmit.textContent = "Submit";
  
    questionsDiv.appendChild(createSubmit);
  
  // listener to hold/capture/store info 
    createSubmit.addEventListener("click", function () {
        var initials = createInput.value;
  
        if (initials === null) {
  
            console.log("No value entered!");
  
        } else {
            var endScore = {
                initials: initials,
                score: timeRemaining
            }
            console.log(endScore);
            var totalScores = localStorage.getItem("totalScores");
            if (totalScores === null) {
                totalScores = [];
            } else {
                totalScores = JSON.parse(totalScores);
            }
            totalScores.push(endScore);
            var newScore = JSON.stringify(totalScores);
            localStorage.setItem("totalScores", newScore);
            window.location.replace("./scores.html");
        }
    });
  
  }
