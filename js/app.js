'use strict';

var leftImageElement = document.getElementById('left-image');
var middleImageElement = document.getElementById('middle-image');
var rightImageElement = document.getElementById('right-image');
var maxAttempts = 25;
var userAttemptsCounter = 0;

var leftImageIndex ,middleImageIndex, rightImageIndex;

function getImage(name,source){
  this.name = name;
  this.source = source;
  this.votes = 0;
  getImage.prototype.allImages.push(this);
}


getImage.prototype.allImages = [];
new getImage('bag','img/bag.jpg');
new getImage('banana','img/banana.jpg');      
new getImage('bathroom','img/bathroom.jpg'); 
new getImage('boots','img/boots.jpg');             
new getImage('breakfast','img/breakfast.jpg');         
new getImage('bubblegum','img/bubblegum.jpg');     
new getImage('chair','img/chair.jpg');
new getImage('cruisin-goat','img/cruisin-goat.jpg');      
new getImage('cthulhu','img/cthulhu.jpg'); 
new getImage('dog-duck','img/dog-duck.jpg');             
new getImage('dragon','img/dragon.jpg');         
new getImage('goat-away','img/goat-away.jpg');   
new getImage('goat-out-of-hand','img/goat-out-of-hand.jpg');         
new getImage('pen','img/pen.jpg');     
new getImage('pet-sweep','img/pet-sweep.jpg');
new getImage('sassy-goat','img/sassy-goat.jpg');      
new getImage('scissors','img/scissors.jpg'); 
new getImage('shark','img/shark.jpg');             
new getImage('smiling-goat','img/smiling-goat.jpg');         
new getImage('sweater-goat','img/sweater-goat.jpg'); 
new getImage('sweep','img/sweep.png'); 
new getImage('shark','img/shark.jpg');             
new getImage('tauntaun','img/tauntaun.jpg');         
new getImage('unicorn','img/unicorn.jpg'); 
new getImage('usb','img/usb.gif');             
new getImage('water-can','img/water-can.jpg');         
new getImage('wine-glass','img/wine-glass.jpg'); 


console.log(getImage.prototype.allImages);


renderRandomImages();

leftImageElement.addEventListener('click',handleUserClick);
middleImageElement.addEventListener('click',handleUserClick);
rightImageElement.addEventListener('click',handleUserClick);

function handleUserClick(event){
  userAttemptsCounter++;

  if(userAttemptsCounter <= maxAttempts){
    if(event.target.id === 'left-image'){
      getImage.prototype.allImages[leftImageIndex].votes++;
    } 
    else if(event.target.id === 'middle-image'){
        getImage.prototype.allImages[middleImageIndex].votes++;
    } 
    else {
      getImage.prototype.allImages[rightImageIndex].votes++;
    }
    renderRandomImages();

  } else {
    // handle end of voting
    var resultsList = document.getElementById('results-list');
    var goatResult;
    for(var i = 0; i < getImage.prototype.allImages.length; i++){
      goatResult = document.createElement('li');
      goatResult.textContent = getImage.prototype.allImages[i].name + 'has '+ getImage.prototype.allImages[i].votes + ' votes';
      resultsList.appendChild(goatResult);
    }
    rightImageElement.removeEventListener('click',handleUserClick);
    middleImageElement.removeEventListener('click',handleUserClick);
    leftImageElement.removeEventListener('click',handleUserClick);

  }

}


function renderRandomImages(){

  leftImageIndex = generateRandomIndex();

  do{
    rightImageIndex = generateRandomIndex();
    middleImageIndex = generateRandomIndex();
  } while(leftImageIndex === rightImageIndex || leftImageIndex === middleImageIndex || middleImageIndex === rightImageIndex)

  leftImageElement.src = getImage.prototype.allImages[leftImageIndex].source;
  middleImageElement.src = getImage.prototype.allImages[middleImageIndex].source;
  rightImageElement.src = getImage.prototype.allImages[rightImageIndex].source;
}

function generateRandomIndex(){
  return Math.floor(Math.random() * (getImage.prototype.allImages.length));
}


