import {randomColor, randomArrayIndx, po} from "./utils.basicfunctions.js";
import { obstCarsImgs } from "./obstacle.list.js";

export function Obstacles(ctx, x, y, type){
  ctx;
  if(type == "image"){
    let arrItem = randomArrayIndx(obstCarsImgs)

    this.carImage = new Image();
    this.carImage.src = arrItem.imgSrc;
    this.height = arrItem.height;
  }else{
    this.color = randomColor();
    this.height = 70;
  };

  this.width = 35;
  this.x = x;
  this.y = y;
  this.type = type;
  // this.speed = speed;

  this.drawItem = function(){
    if(type == "image"){
      ctx.drawImage(this.carImage, this.x, this.y, this.width, this.height);
    } else {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  };

  this.restore = function(){
    this.x = x;
    this.y = y;
  };
};