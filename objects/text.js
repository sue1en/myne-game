export function Text(ctx, y,fontWeight, fontSize, fontFamily, color, message, stroke, background){
  this.ctx = ctx;
  this.x = ctx.canvas.width/2;
  this.y = y;
  this.font = `${fontWeight} ${fontSize} ${fontFamily}`;
  this.textAlign = "center";
  this.textBaseline = "middle";
  this.color = color;
  this.stroke = stroke;
  this.message = message;
  // square
  this.background = background;
  this.width = 10;
  this.height = 10;
};

Text.prototype.drawItem = function(){
  this.ctx.font = this.font;
  this.ctx.textAlign = this.textAlign;
  this.ctx.textBaseline = this.textBaseline
  this.ctx.fillStyle = this.color;
  this.ctx.fillText(this.message, this.x, this.y)
  if(this.stroke == "strokeON"){
    this.ctx.strokeText(this.message, this.x, this.y)
  }
  if(this.background == "bgON"){
    this.ctx.fillStyle = "#0000ff";
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
  }
};