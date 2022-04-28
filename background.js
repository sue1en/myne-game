import {po} from "./utils.basicfunctions.js";

export function Bg(ctx, y, img, type){
  this.type = type
  if(type == "image"){
    this.bgImage = new Image()
    this.bgImage.src = img
  }
  this.width = ctx.canvas.width;
  this.height = ctx.canvas.height;
  this.x = 0;
  this.y = y;

  
  this.drawItem = function(){
    ctx;
    ctx.drawImage(this.bgImage, this.x, this.y, this.width, this.height);
  }

  this.update = function(array, score){
    for(let i = 0; i < array.length; i++){
      if(array[i].y < ctx.canvas.height + 20){
        array[i].y += score.speed - 0.5
        array[i].drawItem()
      } else {
        array.splice(i, 1);
        i--
      };
    }
  }
}