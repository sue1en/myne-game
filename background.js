function Bg(ctx, img, type){
  this.x = 0;
  this.y = 0;
  this.type = type
  if(this.type == "image"){
    this.bgImage = new Image()
    this.bgImage.src = img
  }
  this.width = Number(ctx.canvas.width);
  this.height = Number(this.bgImage.naturalHeight);
  // this.height = Number(ctx.canvas.height);
  // this.update = function(){
  //   pattern = ctx.createPattern(this.bgImage, "repeat-y");
  //   ctx.fillStyle = pattern;
  //   ctx.fillRect(this.x, this.y, this.width, this.height);
  // };
  this.update = function(){
    ctx.drawImage(this.bgImage, this.x, this.y, this.width, this.height);
    ctx.drawImage(this.bgImage, this.x, this.y+this.height, this.width, this.height);
    ctx.drawImage(this.bgImage, this.x, this.y+this.height*2, this.width, this.height);
  }
}

export {
  Bg
}