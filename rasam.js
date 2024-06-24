var canvaa = document.getElementById('canvaa');
var context = canvaa.getContext('2d');
var colorPicker = document.getElementById('colorPicker');
var brushSize = document.getElementById('brushSize');
var clearCanvasButton = document.getElementById('clearCanvasButton');
var eraseLastLineButton = document.getElementById('eraseLastLineButton');
var saveImageButton = document.getElementById('saveImageButton');
var canvasWidthInput = document.getElementById('canvasWidth');
var canvasHeightInput = document.getElementById('canvasHeight');
var canvasBackgroundSelect = document.getElementById('canvasBackground');

var bokis = [];
var isDrawing = false;

canvaa.addEventListener('touchstart', startPosition);
canvaa.addEventListener('touchmove', draw);
canvaa.addEventListener('touchend', endPosition);
eraseLastLineButton.addEventListener('click', eraseLastLine);
clearCanvasButton.addEventListener('click', clearCanvas);
saveImageButton.addEventListener('click', saveImage);
canvasWidthInput.addEventListener('input', updateCanvasSize);
canvasHeightInput.addEventListener('input', updateCanvasSize);
canvasBackgroundSelect.addEventListener('change', updateCanvasBackground);

function startPosition(e) {
  e.preventDefault();
  isDrawing = true;
  var rect = canvaa.getBoundingClientRect();
  var x = e.touches[0].clientX - rect.left;
  var y = e.touches[0].clientY - rect.top;
  bokis.push({ points: [{ x: x, y: y }], color: colorPicker.value, size: brushSize.value });
  drawPoint(x, y);
}

function draw(e) {
  e.preventDefault();
  if (!isDrawing) return;

  var rect = canvaa.getBoundingClientRect();
  var x = e.touches[0].clientX - rect.left;
  var y = e.touches[0].clientY - rect.top;
  var currentLine = bokis[bokis.length - 1];

  var lastPoint = currentLine.points[currentLine.points.length - 1];
  var distance = Math.sqrt(Math.pow(x - lastPoint.x, 2) + Math.pow(y - lastPoint.y, 2));
  if (distance >= brushSize.value / 2) {
    currentLine.points.push({ x: x, y: y });
    redraw();
    drawPoint(x, y);
  }
}

function endPosition() {
  isDrawing = false;
}

function eraseLastLine() {
  if (bokis.length > 0) {
    bokis.pop();
    redraw();
  }
}

function clearCanvas() {
  bokis = [];
  context.clearRect(0, 0, canvaa.width, canvaa.height);
}

function saveImage() {
  var image = canvaa.toDataURL("image/png").replace("image/png", "image/octet-stream");
  var link = document.createElement('a');
  link.href = image;
  link.download = 'canvas_image.png'; // اسم الملف
  link.click();
}

function updateCanvasSize() {
  canvaa.width = canvasWidthInput.value;
  canvaa.height = canvasHeightInput.value;
  redraw();
}

function updateCanvasBackground() {
  canvaa.style.background = canvasBackgroundSelect.value;
}

function redraw() {
  context.clearRect(0, 0, canvaa.width, canvaa.height);

  bokis.forEach(function(line) {
    context.strokeStyle = line.color;
    context.lineWidth = line.size;
    context.lineCap = 'round';
    context.beginPath();
    context.moveTo(line.points[0].x, line.points[0].y);

    line.points.forEach(function(point) {
      context.lineTo(point.x, point.y);
    });
    context.stroke();
  });
}

function drawPoint(x, y) {
  context.fillStyle = colorPicker.value;
  context.fillRect(x - brushSize.value / 2, y - brushSize.value / 2, brushSize.value, brushSize.value);
}

function resizeCanvas() {
  canvaa.width = window.innerWidth;
  canvaa.height = window.innerHeight;
}

window.addEventListener('load', resizeCanvas);
window.addEventListener('resize', resizeCanvas);






