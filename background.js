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

  this.hSpeed = 5;
  this.position = this.height
  
  // this.height = Number(ctx.canvas.height);
  // this.update = function(){
  //   pattern = ctx.createPattern(this.bgImage, "repeat-y");
  //   ctx.fillStyle = pattern;
  //   ctx.fillRect(this.x, this.y, this.width, this.height);
  // };
  // console.log(this.bgImage.naturalHeight)
  this.drawItem = function(){
    ctx;
    ctx.drawImage(this.bgImage, this.x, this.y, this.width, this.height);
  }

  this.update = function(){
    this.position = ((this.position + this.hSpeed)% this.height + this.height) % this.height;
    this.y++;
  }
}