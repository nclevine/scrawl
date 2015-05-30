ownsDrawing = function(userId, drawing){
  return drawing && _.contains(drawing.drawers, userId);
}