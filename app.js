const screen = document.getElementById("screen");
import {PlayerCar} from "./player.js";
import { Bg } from "./background.js";
import { Obstacles } from "./obstacle.js";
var newCanvas, ctx, player, actualStates, bg;
var obstacleGroup = [];

var gameStatus = {
  play:0,
  playing:1,
  loose:2,
};

eventListeners(window, "mousedown", actionByBtn);

var raceGame = {
  start: function(){
      console.log("Criar canvas");
      gameArea.start();
      var canvas = document.getElementById("gameCanvas");
      ctx = canvas.getContext("2d");
      bg = new Bg(ctx, "./images/bg-image-02.png", "image");
      player = new PlayerCar(ctx, "images/pixel-car.png", "image");
      updateCanvas()
      // cancelAnimationFrame(requestAnimationFrame(updateCanvas))
      axis()
  },
};


// Cria Game Area
var gameArea = {
  newCanvas: document.createElement("canvas"),
  start: function(){
    this.newCanvas.id ="gameCanvas";
    this.newCanvas.width = screen.clientWidth;
    this.newCanvas.height = screen.clientHeight;
    screen.appendChild(this.newCanvas);
    this.frameCount = 0;
    // this.interval = setInterval(updateCanvas, 1);

    eventListeners(window, "mousedown", actionByBtn);
    eventListeners(window, "mouseup", gameControlls.clearMove);
    eventListeners(window, "touchstart", actionByBtn);
    eventListeners(window, "touchend", gameControlls.clearMove)
    eventListeners(window, "keydown", actionByKey);
    eventListeners(window, "keyup",  gameControlls.clearMove);
  },
  stop: function(){
    clearInterval()
  }
};

// Limpa Game Area
function clearGameArea(){
  let canvas = document.getElementById("gameCanvas");
  let context = canvas.getContext("2d");
  context.clearRect(0, 0, canvas.width, canvas.height)
};

function createObstacles(){
  const xCanvas = ctx.canvas.width
  const xLeft = Number((xCanvas*15)/100);
  const xCenter = Number((xCanvas /2) - (40 / 2));
  const xRight = Number((xCanvas*72)/100);
  const x = [xLeft, xCenter, xRight];
  
  const roadPositionX = Math.floor(Math.random()* x.length);
  const obstacle = new Obstacles(ctx, x[roadPositionX], -70, randomColor());
  obstacleGroup.push(obstacle);
  gameArea.frameCount = randomIntNum(50,200)
};

function updateObstacle(){
  gameArea.frameCount == 0 ? createObstacles() : gameArea.frameCount--;
  for(let i = 0; i < obstacleGroup.length; i++){
    if(obstacleGroup[i].y < ctx.canvas.clientHeight + obstacleGroup[i].height){
      obstacleGroup[i].y +=2
      obstacleGroup[i].update()
    } else {
      obstacleGroup.splice(i, 1);
      i--
    };    
  };
};

function gameOver(){
  let x = ctx.canvas.width/2;
  let y = ctx.canvas.height/2;
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 2;
  ctx.shadowBlur = 0;
  ctx.shadowColor = 'rgba(0, 0, 0, 1)';
  ctx.font = "bold 40px arial";
  ctx.textAlign = 'center';
  ctx.textBaseline = "middle"
  ctx.fillStyle = "#ff00ff";
  ctx.fillText("Game Over", x, y)
}

//update moves on the canvas
function updateCanvas(){
  setTimeout(function(){
    for(let i=0; i < obstacleGroup.length; i++){
      if(player.carCrash(obstacleGroup[i])){
        po("BATEU!!!");
        gameOver();
        gameArea.stop();
        cancelAnimationFrame(requestAnimationFrame(updateCanvas));
        return
      };
    };
    requestAnimationFrame(updateCanvas);
    clearGameArea();
    bg.update();
    updateObstacle();
    player.newPosition();
    player.update();
  }, 1000/60)
}

const gameControlls = {
  moveLeft: function(){player.positionX -= 5, player.angle = -(30 * Math.PI / 180)},
  moveRight: function(){player.positionX += 5, player.angle = (30 * Math.PI / 180)},
  moveUp: function(){player.positionY -= 5},
  moveDown: function(){player.positionY += 5},
  clearMove: function(){player.positionX = 0, player.positionY = 0, player.angle = 0}
};

const consoleBtn = {
  btnStart: document.getElementById("btn-start"),
  btnUp: document.getElementById("btn-direct-up"),
  btnDown: document.getElementById("btn-direct-down"),
  btnLeft: document.getElementById("btn-direct-left"),
  btnRight: document.getElementById("btn-direct-right"),
};

function eventListeners(elemt, action, func){
  elemt.addEventListener(action, func)
};

function actionByBtn(e){
  if(e.defaultPrevented) {
    return; // Do nothing if event already handled
  };
  switch(e.target){
    case consoleBtn.btnLeft:
      gameControlls.moveLeft();
      break;
    case consoleBtn.btnRight:
      gameControlls.moveRight();
      break;
    case consoleBtn.btnUp:
      gameControlls.moveUp();
      break;
    case consoleBtn.btnDown:
      gameControlls.moveDown();
      break;
    case consoleBtn.btnStart:
      raceGame.start();
      break;
    };
    e.preventDefault();
};
    
function actionByKey(e){
  if(e.defaultPrevented) {
    return; // Do nothing if event already handled
  };
  switch(e.code){
    case "ArrowLeft":
      gameControlls.moveLeft();
      break;
    case "ArrowRight":
      gameControlls.moveRight();
      break;
    case "ArrowUp":
      gameControlls.moveUp();
      break;
    case "ArrowDown":
      gameControlls.moveDown();
      break;
  };
  e.preventDefault();
};

//____________________________________________

function randomIntNum(max, min){
  return Math.floor(Math.random() * (max - min +1)) + min;
};

function randomColor(){
  return `rgb(${randomIntNum(0, 255)},${randomIntNum(0, 255)},${randomIntNum(0, 255)})`;
};

function randomfltNum(max, min){
  const n = Math.random() * (max - min +1) + min;
  return Number(n.toFixed(2));
};

function po(print){console.log(print)}

function axis(){
  var posX
  var posY
  let canv = document.getElementById("gameCanvas")
  canv.addEventListener("click", function(e){
    posX = e.offsetX
    posY = e.offsetY
    document.getElementById("input").value = `X: ${posX} | Y: ${posY}`
  })
};