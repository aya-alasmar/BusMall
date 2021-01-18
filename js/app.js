"use strict";

var leftImageElement = document.getElementById("left-image");
var middleImageElement = document.getElementById("middle-image");
var rightImageElement = document.getElementById("right-image");
var maxAttempts = 25;
var userAttemptsCounter = 0;
var leftImageIndex, middleImageIndex, rightImageIndex;
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
      getImage.prototype.allImages[leftImageIndex].votes++;
    } else if (event.target.id === "middle-image") {
      getImage.prototype.allImages[middleImageIndex].votes++;
    } else {
      getImage.prototype.allImages[rightImageIndex].votes++;
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
  percentage();
  for (var i = 0; i < getImage.prototype.allImages.length; i++) {
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
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(255, 99, 132)",
          data: imgVote,
        },

        {
          label: "showns",
          backgroundColor: "#4b134f",
          borderColor: "#4b134f",
          data: statistics,
        },
      ],
    },
  });
}

function renderRandomImages() {
  do {
    leftImageIndex = generateRandomIndex();
    rightImageIndex = generateRandomIndex();
    middleImageIndex = generateRandomIndex();
  } while (
    leftImageIndex == rightImageIndex ||
    leftImageIndex == middleImageIndex ||
    middleImageIndex == rightImageIndex ||
    check(leftImageIndex) ||
    check(middleImageIndex) ||
    check(rightImageIndex)
  );

  checkArray[0] = leftImageIndex;
  checkArray[1] = rightImageIndex;
  checkArray[2] = middleImageIndex;

  console.log(leftImageIndex, rightImageIndex, middleImageIndex, "result");

  leftImageElement.src = getImage.prototype.allImages[leftImageIndex].source;
  getImage.prototype.allImages[leftImageIndex].repeat++;
  middleImageElement.src =
    getImage.prototype.allImages[middleImageIndex].source;
  getImage.prototype.allImages[middleImageIndex].repeat++;
  rightImageElement.src = getImage.prototype.allImages[rightImageIndex].source;
  getImage.prototype.allImages[rightImageIndex].repeat++;
}

function generateRandomIndex() {
  return Math.floor(Math.random() * getImage.prototype.allImages.length);
}

function percentage() {
  for (var i = 0; i < getImage.prototype.allImages.length; i++) {
    getImage.prototype.allImages[i].shownPercentage =
      (getImage.prototype.allImages[i].repeat / maxAttempts) * 100;
    getImage.prototype.allImages[i].votePercentage =
      (getImage.prototype.allImages[i].votes / maxAttempts) * 100;
  }
}

function check(imgIndex) {
  for (var i = 0; i < checkArray.length; i++) {
    if (imgIndex == checkArray[i]) {
      return true;
    }
  }
  return false;
}
