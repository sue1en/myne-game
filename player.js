import { po } from "./utils.basicfunctions.js"

export function PlayerCar(ctx, img, type){
  this.width = 35;
  this.height = 70;
  this.angle = 0;
  this.positionX = 0;
  this.positionY = 0;
  this.x = Number((ctx.canvas.width / 2) - (this.width / 2));
  this.y = Number(ctx.canvas.height - this.height)-20;
  this.crash = false;
  this.type = type;
  if(type == "image"){
    this.carImg = new Image();
    this.carImg.src = img
  };
  this.drawItem = function(){
    ctx;
    if(type == "image"){
      ctx.save()
      ctx.translate((this.x + this.width/2), (this.y + (this.height-this.height/4)))
      ctx.rotate(this.angle)
      ctx.translate(-(this.x + this.width/2),-(this.y + (this.height-this.height/4)))
      ctx.drawImage(this.carImg, this.x, this.y, this.width, this.height)
      ctx.restore()

    } else {
      ctx.save()
      ctx.translate((this.x + this.width/2), (this.y + (this.height-this.height/4)))
      ctx.rotate(this.angle)
      ctx.translate(-(this.x + this.width/2),-(this.y + (this.height-this.height/4)))
      ctx.fillStyle = "#0000ff";
      ctx.fillRect(this.x, this.y, this.width, this.height);
      ctx.restore()
    }
  };

  this.newPosition = function(){
    this.x += this.positionX;
    this.y += this.positionY;
    this.x = Math.min(Math.max(this.x, 0), ctx.canvas.width - this.width);
    this.y = Math.min(Math.max(this.y, 0), ctx.canvas.height - this.height);
    // this.x = Math.min(Math.max(this.x, Number((ctx.canvas.width*10)/100)), ctx.canvas.width - (this.width + Number((ctx.canvas.width*10)/100)));
    // this.y = Math.min(Math.max(this.y, 0), ctx.canvas.height - this.height);
  };

  this.carCrash = function(obstacle){
    var playerLeft = this.x;
    var playerRight = this.x + (this.width);
    var playerTop = this.y;
    var playerBottom = this.y + (this.height);
    var obstacleLeft = obstacle.x;
    var obstacleRight = obstacle.x + (obstacle.width);
    var obstacleTop = obstacle.y;
    var obstacleBotton = obstacle.y + (obstacle.height);
    var crash = true;
    if((playerTop > obstacleBotton) || (playerBottom < obstacleTop) || (playerLeft > obstacleRight) || (playerRight < obstacleLeft)){
      crash = this.crash;
    }
    return crash;
  };

  this.restore = function(){
    this.x = Number((ctx.canvas.width / 2) - (this.width / 2));
    this.y = Number(ctx.canvas.height - this.height)-10;
    this.angle = 0;
  };
};