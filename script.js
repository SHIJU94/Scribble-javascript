document.addEventListener('DOMContentLoaded', function() {
  const canvas = document.getElementById('canvas');
  const context = canvas.getContext('2d');

  // Set canvas size
  canvas.width = 500;
  canvas.height = 500;

  // Set initial stroke color and line width
  let strokeColor = '#000000';
  let lineWidth = 1;

  let isDrawing = false;

  let prevX = 0;
  let prevY = 0;
  let currX = 0;
  let currY = 0;

  function handleMouseMove(event) {
    const rect = canvas.getBoundingClientRect();
    currX = event.clientX - rect.left;
    currY = event.clientY - rect.top;

    if (isDrawing && isWithinCanvas(currX, currY)) {
      drawLine();
    }
  }

  function isWithinCanvas(x, y) {
    return x >= 0 && x <= canvas.width && y >= 0 && y <= canvas.height;
  }

  function drawLine() {
    context.beginPath();
    context.moveTo(prevX, prevY);
    context.lineTo(currX, currY);
    context.strokeStyle = strokeColor;
    context.lineWidth = lineWidth;
    context.lineJoin = 'round';
    context.lineCap = 'round';
    context.stroke();
    context.closePath();

    prevX = currX;
    prevY = currY;
  }

  function handleMouseDown(event) {
    const rect = canvas.getBoundingClientRect();
    prevX = currX = event.clientX - rect.left;
    prevY = currY = event.clientY - rect.top;

    isDrawing = true;
  }

  function handleMouseUp() {
    isDrawing = false;
    prevX = currX;
    prevY = currY;
  }

  function handleStrokeColorChange(event) {
    strokeColor = event.target.value;
  }

  function handleLineWidthChange(event) {
    const newLineWidth = event.target.value;
    
    // Map the input value from the range of 1 to 100 to the range of 1 to 5
    const mappedLineWidth = mapValue(newLineWidth, 1, 100, 1, 5);
    
    // Set the line width
    lineWidth = mappedLineWidth;
  
    // Update the input value to match the adjusted line width
    event.target.value = newLineWidth;
  }
  function mapValue(value, fromLow, fromHigh, toLow, toHigh) {
    return (value - fromLow) * (toHigh - toLow) / (fromHigh - fromLow) + toLow;
  }
  
  function handleClearButtonClick() {
    context.clearRect(0, 0, canvas.width, canvas.height);
  }

  canvas.addEventListener('mousemove', handleMouseMove);
  canvas.addEventListener('mousedown', handleMouseDown);
  canvas.addEventListener('mouseup', handleMouseUp);
  canvas.addEventListener('mouseout', handleMouseUp);

  const strokeInput = document.getElementById('stroke');
  strokeInput.addEventListener('input', handleStrokeColorChange);

  const lineWidthInput = document.getElementById('lineWidth');
  lineWidthInput.addEventListener('input', handleLineWidthChange);

  const clearButton = document.getElementById('clear');
  clearButton.addEventListener('click', handleClearButtonClick);
});
