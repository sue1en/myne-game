export function Shape(ctx, x, y, width, height, color, stroke){
  this.ctx = ctx;
  this.x = x;
  this.y= y;
  this.width = width;
  this.height = height;
  this.color = color;
  this.stroke = stroke;
}

Shape.prototype.drawItem = function(){
  this.ctx.fillStyle = this.color;
  this.ctx.fillRect(this.x, this.y, this.width, this.height);
  if(this.stroke == "strokeOn"){
    this.ctx.strokeStyle = "rgba(0, 0, 0, 0.55)";
    this.ctx.lineWidth = 3;
    this.ctx.strokeRect(this.x, this.y, this.width, this.height);
  }
  this.ctx.beginPath();
};