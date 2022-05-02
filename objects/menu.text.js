export function MenuText(ctx, y,fontWeight, fontSize,fontFamily, color, message){
  this.ctx = ctx;
  this.x = ctx.canvas.width/2;
  this.y = y;
  this.font = `${fontWeight} ${fontSize} ${fontFamily}`;
  this.textAlign = "center";
  this.textBaseline = "middle";
  this.color = color;
  this.message = message
  // square
  this.width = 150;
  this.height = 25;
};

MenuText.prototype.drawItem = function(){
  this.ctx.font = this.font;
  this.ctx.textAlign = this.textAlign;
  this.ctx.textBaseline = this.textBaseline
  this.ctx.fillStyle = this.color;
  this.ctx.fillText(this.message, this.x, this.y)
};

MenuText.prototype.update = function(){
  // this.ctx.fillStyle = "rgba(0, 0, 0, 0.20)";
  // this.ctx.fillRect(this.x-(this.width/2), this.y-(this.height/2), this.width, this.height);
  this.ctx.strokeStyle = "rgba(255, 255, 255, 0.90)";
  this.ctx.lineWidth = 1;
  this.ctx.strokeRect(this.x-(this.width/2), this.y-(this.height/2), this.width, this.height);
  this.ctx.font = this.font;
  this.ctx.textAlign = this.textAlign;
  this.ctx.textBaseline = this.textBaseline;
  this.ctx.fillStyle = "rgba(255, 255, 255, 0.90)";
  this.ctx.fillText(this.message, this.x, this.y);
};