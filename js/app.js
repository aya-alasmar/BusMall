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

function getImage(name, source) {
  this.name = name;
  this.source = source;
  this.votes = 0;
  this.repeat = 0;
  this.shownPercentage = 0;
  this.votePercentage = 0;

  imagesNames.push(name);
  getImage.prototype.allImages.push(this);
}

getImage.prototype.allImages = [];
new getImage("bag", "img/bag.jpg");
new getImage("banana", "img/banana.jpg");
new getImage("bathroom", "img/bathroom.jpg");
new getImage("boots", "img/boots.jpg");
new getImage("breakfast", "img/breakfast.jpg");
new getImage("bubblegum", "img/bubblegum.jpg");
new getImage("chair", "img/chair.jpg");
new getImage("cthulhu", "img/cthulhu.jpg");
new getImage("dog-duck", "img/dog-duck.jpg");
new getImage("dragon", "img/dragon.jpg");
new getImage("pen", "img/pen.jpg");
new getImage("pet-sweep", "img/pet-sweep.jpg");
new getImage("scissors", "img/scissors.jpg");
new getImage("shark", "img/shark.jpg");
new getImage("sweep", "img/sweep.png");
new getImage("tauntaun", "img/tauntaun.jpg");
new getImage("unicorn", "img/unicorn.jpg");
new getImage("usb", "img/usb.gif");
new getImage("water-can", "img/water-can.jpg");
new getImage("wine-glass", "img/wine-glass.jpg");
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
      getImage.prototype.allImages[leftImagei].votes++;
    } else if (event.target.id === "middle-image") {
      getImage.prototype.allImages[middleImagei].votes++;
    } else {
      getImage.prototype.allImages[rightImagei].votes++;
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

function userRoundTimes(event) {
  event.preventDefault();
  maxAttempts = event.target[1].value;
}
function showResult(event) {
  event.preventDefault();

  var resultsList = document.getElementById("results-list");
  resultsList.textContent = " ";
  var resultItem;
  
  for (var i = 0; i < getImage.prototype.allImages.length; i++) {
    percentage(getImage.prototype.allImages[i]);
    resultItem = document.createElement("li");
    resultItem.textContent =
      getImage.prototype.allImages[i].name +
      " had " +
      getImage.prototype.allImages[i].votes +
      " votes and " +
      getImage.prototype.allImages[i].repeat +
      " times";
    resultsList.appendChild(resultItem);
    imgVote.push(getImage.prototype.allImages[i].votePercentage);
    statistics.push(getImage.prototype.allImages[i].shownPercentage);


    voteAndRepeatLocalStorage(getImage.prototype.allImages[i])



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
}
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

  leftImageElement.src = getImage.prototype.allImages[leftImagei].source;
  getImage.prototype.allImages[leftImagei].repeat++;
  middleImageElement.src =
    getImage.prototype.allImages[middleImagei].source;
  getImage.prototype.allImages[middleImagei].repeat++;
  rightImageElement.src = getImage.prototype.allImages[rightImagei].source;
  getImage.prototype.allImages[rightImagei].repeat++;
}

function generateRandomi() {
  return Math.floor(Math.random() * getImage.prototype.allImages.length);
}

function percentage(item) {
  localStorageArr=localStorage.getItem(item.name).split(',');
   item.shownPercentage = localStorageArr[1] / localStorageArr[2] * 100;
   item.votePercentage =localStorageArr[0] /localStorageArr[2] * 100;
   console.log(item.shownPercentage,item.votePercentage);

}

function check(imgi) {
  for (var i = 0; i < checkArray.length; i++) {
    if (imgi == checkArray[i]) {
      return true;
    }
  }
  return false;
}

function voteAndRepeatLocalStorage(item) {

  if (localStorage.getItem(item.name) !== null) {
    localStorageArr=localStorage.getItem(item.name).split(',');

    localStorageArr[0] = Number(localStorageArr[0]) + item.votes;
    localStorageArr[1] = Number(localStorageArr[1] )+ item.repeat;
    localStorageArr[2] = Number(localStorageArr[2] )+ Number(maxAttempts); 
    localStorage.setItem(item.name , localStorageArr);
    console.log(item.name, localStorageArr, 'if');
  }
  else {
    voteInLs = item.votes;
    repeatInLs = item.repeat;
    maxAttemptsLs = Number(maxAttempts);
    localStorage.setItem(item.name, [voteInLs, repeatInLs, maxAttemptsLs]);
   // console.log(localStorage.getItem(item.name));
  }
  percentage(item);

  }


