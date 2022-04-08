const screen = document.getElementById("screen");
import {PlayerCar} from "./player.js";
import { Bg } from "./background.js";
import { Obstacles } from "./obstacle.js";
var canvas, ctx, player, actualState, bg;
var frameCount = 0;
var obstacleGroup = [];
var pause = false;
var gameStatus = {
  play:0,
  playing:1,
  loose:2,
};
actualState = gameStatus.play

//TODO: add score/ change obstacle speed by score/ edit background

eventListeners(window, "mousedown", actionByBtn);

function start(){
  if(actualState == gameStatus.play){
    actualState = gameStatus.playing;
    gameArea.start();
  }else if(actualState == gameStatus.playing){
    gameArea.reset()
  }else if(actualState == gameStatus.loose){
    actualState = gameStatus.playing;
    gameArea.restart();
  };
};

function pauseFunc(){
  if(!pause){
    pause = true
  }else{
    pause = false
    updateCanvas()
  };
};

function createCanvas(){
  canvas = document.createElement("canvas");
  canvas.id ="gameCanvas";
  canvas.width = screen.clientWidth;
  canvas.height = screen.clientHeight;
  ctx = canvas.getContext("2d");
  screen.appendChild(canvas);
}

// Cria Game Area
var gameArea = {
  start: function(){
    createCanvas();
    bg = new Bg(ctx, "bg-image-02.png", "image");
    player = new PlayerCar(ctx, "images/pixel-car.png", "image");
    updateCanvas();

    eventListeners(window, "mousedown", actionByBtn);
    eventListeners(window, "mouseup", gameControlls.clearMove);
    eventListeners(window, "touchstart", actionByBtn);
    eventListeners(window, "touchend", gameControlls.clearMove)
    eventListeners(window, "keydown", actionByKey);
    eventListeners(window, "keyup",  gameControlls.clearMove);
  },
  stop: function(){
    pause = true;
  },
  reset: function(){ 
    clearGameArea()
    obstacleGroup = [];
    player.restore();
  },
  restart: function(){ 
    clearGameArea()
    player.restore();
    pause = false;
    obstacleGroup = [];
    updateCanvas()
    // bg = {};
  }
};

// Limpa Game Area
function clearGameArea(){
  ctx.clearRect(0, 0, canvas.width, canvas.height)
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
  frameCount = randomIntNum(50,200)
};

function updateObstacle(){
  frameCount == 0 ? createObstacles() : frameCount--;
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

//update moves on the canvas
function updateCanvas(){
  if(pause) return;
  setTimeout(function(){
    for(let i=0; i < obstacleGroup.length; i++){
      if(player.carCrash(obstacleGroup[i])){
        po("BATEU!!!");
        pause = true;
        gameOver(ctx);
        actualState = gameStatus.loose;
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
  btnPause: document.getElementById("btn-pause"),
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
      start();
      break;
    case consoleBtn.btnPause:
      pauseFunc();
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

function gameOver(ctx){
  let x = ctx.canvas.width/2;
  let y = ctx.canvas.height/2;
  ctx.font = "bold 40px arial";
  ctx.textAlign = 'center';
  ctx.textBaseline = "middle"
  ctx.fillStyle = "#ff00ff";
  return ctx.fillText("Game Over", x, y)
}
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