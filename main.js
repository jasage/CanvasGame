const start = document.getElementById('start');
const stop = document.getElementById('stop');
const score = document.getElementById('score');

var timerId;
// animation request , use it to stop animation
var req;
// make and draw squares
var squares = [];
// Score
var scoreCount = 0;
// Random Colors
var colors = ['red','black','blue','green'];
// Canvas
const canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
// Class Square
function Square(x,y,speed,color){
  this.x = x;
  this.y = y;

  this.getPos = function(){
    return {
      'x': this.x,
      'y': this.y
    }
  }

  this.draw = function(){
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, 20, 20);
  }

  this.animation = function(){
    this.y +=speed;
    this.draw();
  }
}
// Animation , draw squares
function animate(){
  req = requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
  squares.forEach((value,index)=>{
    value.animation();
    if(value.getPos().y>canvas.clientHeight){
      squares.splice(index,1);
    }
  });
}
// clear and stop game
function clearAll(){
  scoreCount = 0; 
  cancelAnimationFrame(req);
  squares = [];
  clearTimeout(timerId);
  ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientWidth);
}
// add Square to frame Canvas
function addSquare(){
  var x = Math.floor(Math.random()*621);
  var speed = Math.floor(Math.random()*3)+1;
  var color = colors[Math.floor(Math.random()*colors.length)]
  squares.push(new Square(x, 0, speed, color)); 
  // random timer , make square
  var timer = (Math.random()*2000)+500;
  timerId = setTimeout(addSquare,timer);
}
// Start Button
start.onclick = function(){
  clearAll();
  addSquare();
  animate();
  score.innerText = scoreCount;
};
// Stop Button
stop.onclick = function(){
  clearAll();
};
// Click on Canvas frame
canvas.addEventListener('click',onClick,false);
function onClick(e){
  var cx = e.offsetX; 
  var cy = e.offsetY;
  // Check if client click on square => return index of array
  var index = squares.findIndex((value)=>{
    return (cy>=value.getPos().y && cx>=value.getPos().x && cy-value.getPos().y<=20 && cx-value.getPos().x<=20);
  })
  // delete square and count score
  if(index>=0){
    scoreCount++;
    score.innerText = scoreCount;
    squares.splice(index,1);
  }
}