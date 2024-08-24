import {PlayerCar} from "./objects/raceGameObjects/player.js";
import { Obstacles } from "./objects/raceGameObjects/obstacle.js";
import { Score } from "./objects/raceGameObjects/score.js";
import { Bg } from "./objects/raceGameObjects/background.js";
import { Text } from "./objects/text.js";
import { Shape } from "./objects/shape.object.js";
import { MenuText } from "./objects/menu.text.js";
import { gameList } from "./lists/games.list.js";
import {eventListeners, randomIntNum, randomfltNum, randomColor, randomArrayIndx, objctSize, lightOn, lightOff, axis} from "./utils/utils.basicfunctions.js";

const screen = document.getElementById("screen");

let canvas, ctx, player, score, bg, obstacle, gameOver, myneGame, menuBg;
let frameCount = 0;
let obstacleGroup = [];
let bgGroup = [];
let pause = false;
let gameStatus = {
  play:0,
  playing:1,
  loose:2,
};
let consoleStatus = {
  off:0,
  on:1
};
let gameState = gameStatus.play;
let consoleState = consoleStatus.off;

eventListeners(window, "mousedown", actionByBtn);

/* _______TODO:_______ 
4º Create option select Game when start console;
5º Create option when loose -> back to manu or play again;
6º Create option when pause -> back to manu/ reset game/ continue playing;
*/

function powerOn(){
  if(consoleState == consoleStatus.off){
    consoleAction.on();
    consoleState = consoleStatus.on;
  }else if(consoleState == consoleStatus.on){
    consoleAction.off();
    consoleState = consoleStatus.off;
  };
};

let arrM = []
function start(index){
  if(consoleState == consoleStatus.off){
    return
  };
  clearCanvasArea()
  menuBackground();
  gameList.map(menuItem);
  
  eventListeners(window, "click", selectMenuItem)
};

function menuItem(item, index, arr){
  let textMenu = new MenuText(ctx, 100 + (50 * index), "normal", "18px","arial", "#000000", item.name);
  textMenu.drawItem()
  arrM.push(textMenu)
};
function menuBackground(){
  menuBg = new Shape(ctx, (ctx.canvas.width*0.15), (ctx.canvas.height*0.20), ctx.canvas.width - (ctx.canvas.width*0.30), ctx.canvas.height - (ctx.canvas.height*0.40), "rgba(90, 105, 60, 0.50)", "strokeOn");
  
  return menuBg.drawItem();
};

function selectMenuItem(e){
  if(e.defaultPrevented) {
    return; // Do nothing if event already handled
  };
  switch(e.target){
    case consoleBtn.btnUp:
      break;
      case consoleBtn.btnDown:
      break;
  };
};

function startGame(){
  if(consoleState == consoleStatus.off){
    return
  };
  if(gameState == gameStatus.play){
    gameState = gameStatus.playing;
    gameArea.start();
    setInterval(function(){score.updateByTime(player)}, 200)
    axis()
  }else if(gameState == gameStatus.playing){
    gameArea.reset()
    axis()
  }else if(gameState == gameStatus.loose){
    gameState = gameStatus.playing;
    gameArea.restart();
    axis()
  };
};

// Add 
// const menuControlls = {
//   moveLeft: function(){player.positionX -= 5},
//   moveRight: function(){player.positionX += 5},
//   moveUp: function(){player.positionY -= 5},
//   moveDown: function(){player.positionY += 5},
//   clearMove: function(){player.positionX = 0, player.positionY = 0}
// };

// window.onmousedown = function (){
//   let posX = event.clientX;
//   let posY = event.clientY;
//   let x = parseInt((ctx.canvas.width / 2) - (menuBg.width / 2));
//   let y = parseInt((ctx.canvas.height / 2) - (menuBg.height / 2));
//   let index = -1;

//   if (posX > x && posX < x + menuBg.width) {
//       if (posY > y && posY < y + menuBg.height) {
//         index = parseInt((posY - y) / 100);
//           po(index)
//       }
//   }
//   test(index);
// }

let consoleAction = {
  on: function(){
    lightOn()

    createCanvas();
    myneGame = new Text(ctx, ((ctx.canvas.height/2)-20), "bold", "30px","arial", "#000000", "Myne-Game");
    let pressStart = new Text(ctx, ((ctx.canvas.height/2)+40), "normal", "18px","arial", "#000000", "Press Start to begin");
    myneGame.drawItem();
    setTimeout(()=>{pressStart.drawItem()}, 500);
  },
  off: function(){
    lightOff()
    document.getElementById("gameCanvas").remove()
  }
};

function createCanvas(){
  canvas = document.createElement("canvas");
  canvas.id ="gameCanvas";
  canvas.width = screen.clientWidth;
  canvas.height = screen.clientHeight;
  ctx = canvas.getContext("2d");
  screen.appendChild(canvas);
};

function pauseFunc(){
  if(!pause){
    pause = true
  }else{
    pause = false
    updateCanvas()
  };
};

// Create Game Area
let gameArea = {
  start: function(){
    clearCanvasArea();
    bg = new Bg(ctx, 0, "images/bg-image-03.png", "image");
    bgGroup.push(bg);
    player = new PlayerCar(ctx, "images/player-race-car.png", "image");
    score = new Score(ctx);
    gameOver = new Text(ctx, (ctx.canvas.height/2), "bold", "40px", "arial", "rgba(255, 255, 255, 0.90)","Game Over", "strokeON")
    
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
    clearCanvasArea();
    bgGroup = []
    obstacleGroup = [];
    bg = new Bg(ctx, 0, "images/bg-image-03.png", "image");
    bgGroup.push(bg);
    player.restore();
    score.restore();
    pause = false;
  },
  restart: function(){ 
    clearCanvasArea();
    bgGroup = []
    obstacleGroup = [];
    bg = new Bg(ctx, 0, "images/bg-image-03.png", "image");
    bgGroup.push(bg);
    score.restore();
    player.restore();
    pause = false;
    updateCanvas();
  }
};

// clear Game Area
function clearCanvasArea(){
  ctx.clearRect(0, 0, canvas.width, canvas.height)
};

// Create and Update Background
function generateBG(score){
  bg = new Bg(ctx, -ctx.canvas.height-(score.speed), "./images/bg-image-03.png", "image");
  bgGroup.push(bg);
};
function updateBgPosition(){
  let arr = [];
  for(let i = bgGroup[bgGroup.length-1].y; i < 0; i += score.speed){
    let res = Math.min(Math.max(i, -18), 0);
    arr.push(res)
  };

  if((bgGroup[bgGroup.length-1].y == 0) || bgGroup[bgGroup.length-1].y == arr[arr.length -1]){
    generateBG(score)
  };
  bg.update(bgGroup, score);
};

// Create and Update Obstacle
function generateObstacles(){
  const CanvasX = ctx.canvas.width
  const LeftX = Number((CanvasX*15)/100);
  const CenterX = Number((CanvasX /2) - (objctSize(35)/ 2));
  const RightX = Number((CanvasX*72)/100);
  const x = [LeftX, CenterX, RightX];

  obstacle = new Obstacles(ctx, randomArrayIndx(x), -70, "image");
  obstacleGroup.push(obstacle);
  if(score.speed <= 4){
    frameCount = randomIntNum(50,60);
  }else if(score.speed <= 7){
    frameCount = randomIntNum(35,45);
  }else if(score.speed <= 10){
    frameCount = randomIntNum(10,20);
  }else{
    frameCount = randomIntNum(5,10);
  }
};
function updateObstaclePosition(){
  frameCount == 0 ? generateObstacles() : frameCount--;
  obstacle.update(obstacleGroup, score);
};

//update moves on the canvas
function updateCanvas(){
  if(pause) return;
  setTimeout(function(){
    for(let i=0; i < obstacleGroup.length; i++){
      if(player.carCrash(obstacleGroup[i])){
        pause = true;
        gameOver.drawItem();
        gameState = gameStatus.loose;
        return
      };
    };
    clearCanvasArea();
    score.drawItem();
    score.updateSpeed();
    updateObstaclePosition();
    updateBgPosition();
    player.drawItem();
    player.newPosition();
    requestAnimationFrame(updateCanvas);
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
  btnOnOff: document.getElementById("btn-on-off"),
  btnStart: document.getElementById("btn-masters-start"),
  btnPause: document.getElementById("btn-masters-pause"),
  btnUp: document.getElementById("btn-directions-up"),
  btnDown: document.getElementById("btn-directions-down"),
  btnLeft: document.getElementById("btn-directions-left"),
  btnRight: document.getElementById("btn-directions-right"),
  btnActionA: document.getElementById("btn-actions-a"),
  btnActionB: document.getElementById("btn-actions-b"),
};

function actionByBtn(e){
  if(e.defaultPrevented) {
    return; // Do nothing if event already handled
  };
  switch(e.target){
    case consoleBtn.btnOnOff:
      powerOn();
      break;
    case consoleBtn.btnStart:
      start()
      break;
    case consoleBtn.btnPause:
      pauseFunc();
      break;
    case consoleBtn.btnLeft:
      gameControlls.moveLeft();
      break;
    case consoleBtn.btnRight:
      gameControlls.moveRight();
      break;
    // case consoleBtn.btnUp:
    //   gameControlls.moveUp();
    //   break;
    // case consoleBtn.btnDown:
    //   gameControlls.moveDown();
    //   break;
    case consoleBtn.btnActionA:
      startGame();
      break;
    case consoleBtn.btnActionB:
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