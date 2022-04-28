export function Text(ctx, y,fontWeight, fontSize,fontFamily, color, message){
  this.x = ctx.canvas.width/2;
  this.y = y;
  this.font = `${fontWeight} ${fontSize} ${fontFamily}`;
  this.textAlign = "center";
  this.textBaseline = "middle";
  this.color = color;

  this.drawItem = function(){
    ctx.font = this.font;
    ctx.textAlign = this.textAlign;
    ctx.textBaseline = this.textBaseline
    ctx.fillStyle = this.color;
    ctx.fillText(message, this.x, this.y)
    ctx.strokeText(message, this.x, this.y)
  }
};




