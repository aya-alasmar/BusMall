"use strict";

var leftImageElement = document.getElementById("left-image");
var middleImageElement = document.getElementById("middle-image");
var rightImageElement = document.getElementById("right-image");
var maxAttempts = 25;
var userAttemptsCounter = 0;
var leftImagei, middleImagei, rightImagei;
var imagesNames = [];
var imgVote = [];
var statistics = [];
var checkArray = [-1, -1, -1];
var userNum;

function GetImage(name, source) {
  this.name = name;
  this.source = source;
  this.votes = 0;
  this.repeat = 0;
  this.shownPercentage = 0;
  this.votePercentage = 0;

  imagesNames.push(name);
  GetImage.prototype.allImages.push(this);
}

GetImage.prototype.allImages = [];
new GetImage("bag", "img/bag.jpg");
new GetImage("banana", "img/banana.jpg");
new GetImage("bathroom", "img/bathroom.jpg");
new GetImage("boots", "img/boots.jpg");
new GetImage("breakfast", "img/breakfast.jpg");
new GetImage("bubblegum", "img/bubblegum.jpg");
new GetImage("chair", "img/chair.jpg");
new GetImage("cthulhu", "img/cthulhu.jpg");
new GetImage("dog-duck", "img/dog-duck.jpg");
new GetImage("dragon", "img/dragon.jpg");
new GetImage("pen", "img/pen.jpg");
new GetImage("pet-sweep", "img/pet-sweep.jpg");
new GetImage("scissors", "img/scissors.jpg");
new GetImage("shark", "img/shark.jpg");
new GetImage("sweep", "img/sweep.png");
new GetImage("tauntaun", "img/tauntaun.jpg");
new GetImage("unicorn", "img/unicorn.jpg");
new GetImage("usb", "img/usb.gif");
new GetImage("water-can", "img/water-can.jpg");
new GetImage("wine-glass", "img/wine-glass.jpg");
var voteInLs, repeatInLs, maxAttemptsLs, localStorageArr;
renderRandomImages();

var form = document.getElementById("form");
form.addEventListener("submit", userRoundTimes);

form.removeEventListener("submit", handleUserClick);
leftImageElement.addEventListener("click", handleUserClick);
middleImageElement.addEventListener("click", handleUserClick);
rightImageElement.addEventListener("click", handleUserClick);

function handleUserClick(event) {
  userAttemptsCounter++;

  if (userAttemptsCounter <= maxAttempts) {
    if (event.target.id === "left-image") {
      GetImage.prototype.allImages[leftImagei].votes++;
    } else if (event.target.id === "middle-image") {
      GetImage.prototype.allImages[middleImagei].votes++;
    } else {
      GetImage.prototype.allImages[rightImagei].votes++;
    }
    renderRandomImages();
  } else {
    // handle end of voting
    document.getElementById("result-btn").style.visibility = "visible";
    var result = document.getElementById("result");
    result.addEventListener("submit", showResult);

    leftImageElement.removeEventListener("click", handleUserClick);
    middleImageElement.removeEventListener("click", handleUserClick);
    rightImageElement.removeEventListener("click", handleUserClick);
  }
}

// this function to calclate the number of rounds
function userRoundTimes(event) {
  event.preventDefault();
  maxAttempts = event.target[1].value;
}

// to show the result after clicked the dhow result btn
function showResult(event) {
  event.preventDefault();

  var resultsList = document.getElementById("results-list");
  resultsList.textContent = " ";
  var resultItem;
  percentage();
  for (var i = 0; i < GetImage.prototype.allImages.length; i++) {
    resultItem = document.createElement("li");
    resultItem.textContent =
      GetImage.prototype.allImages[i].name +
      " had " +
      GetImage.prototype.allImages[i].votes +
      " votes and " +
      GetImage.prototype.allImages[i].repeat +
      " times";
    resultsList.appendChild(resultItem);
    imgVote.push(GetImage.prototype.allImages[i].votePercentage);
    statistics.push(GetImage.prototype.allImages[i].shownPercentage);
    //percentage(GetImage.prototype.allImages[i]);

    //voteAndRepeatLocalStorage(GetImage.prototype.allImages[i]);
  }

  // the chart
  var ctx = document.getElementById("myChart").getContext("2d");
  var chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: imagesNames,
      datasets: [
        {
          label: "Votes",
          backgroundColor: "rgb(100, 17, 17)",
          borderColor: "black",
          data: imgVote,
        },

        {
          label: "showns",
          backgroundColor: "rgb(94, 77, 77)",
          borderColor: "black",
          data: statistics,
        },
      ],
    },
  });
  userLocalStorage();
}

// this function to display the 3 differnet images
function renderRandomImages() {
  do {
    leftImagei = generateRandomi();
    rightImagei = generateRandomi();
    middleImagei = generateRandomi();
  } while (
    leftImagei == rightImagei ||
    leftImagei == middleImagei ||
    middleImagei == rightImagei ||
    check(leftImagei) ||
    check(middleImagei) ||
    check(rightImagei)
  );

  checkArray[0] = leftImagei;
  checkArray[1] = rightImagei;
  checkArray[2] = middleImagei;

  console.log(leftImagei, rightImagei, middleImagei, "result");

  leftImageElement.src = GetImage.prototype.allImages[leftImagei].source;
  GetImage.prototype.allImages[leftImagei].repeat++;
  middleImageElement.src = GetImage.prototype.allImages[middleImagei].source;
  GetImage.prototype.allImages[middleImagei].repeat++;
  rightImageElement.src = GetImage.prototype.allImages[rightImagei].source;
  GetImage.prototype.allImages[rightImagei].repeat++;
}

//this function to create a random number to choose the images
function generateRandomi() {
  return Math.floor(Math.random() * GetImage.prototype.allImages.length);
}

//to assgin the chart values
function percentage() {
  for (var i = 0; i < GetImage.prototype.allImages.length; i++) {
    GetImage.prototype.allImages[i].shownPercentage =
      (GetImage.prototype.allImages[i].repeat / maxAttempts) * 100;
    GetImage.prototype.allImages[i].votePercentage =
      (GetImage.prototype.allImages[i].votes / maxAttempts) * 100;
  }
}

// this function to check the image if repeated from last round or not .
function check(imgi) {
  for (var i = 0; i < checkArray.length; i++) {
    if (imgi == checkArray[i]) {
      return true;
    }
  }
  return false;
}

// this function to store each user choices in localStorage after converting the js object to localStroage object , will save the object with users numbers .
function userLocalStorage() {
  if (localStorage.length == 0) {
    userNum = 1;
  } else {
    userNum = localStorage.getItem("userCounter");
  }
  localStorage.setItem(
    "user " + userNum,
    JSON.stringify(GetImage.prototype.allImages)
  );
  userNum++;
  localStorage.setItem("userCounter", userNum);
  
}

// this function will check if localStorage empty or not , if not empty with run over the localStorage keys and then take the value for each key to convert the string object(localStorga object ) to Js object and retrive the objects for each user in log.
function toJsObj() {
  if (localStorage.length != 0) {
    for (var i = 0; i < localStorage.length; i++) {
      var key = localStorage.key(i);
      if( key != "userCounter"){
      console.log(" the local Storage Content for ", key," is : ",JSON.parse(localStorage.getItem(key)));
      }
    }
    //console.log(localStorage.length);
  } else console.log(" the local Storage is Empty!");
}

toJsObj();
