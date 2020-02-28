//PENCIL
function startPencil(e){
	painting = true;
	if(active[0]==false) return;
	ctx1.beginPath();
	ctx1.strokeStyle=paint.strokeStyle;
	ctx1.moveTo(e.pageX, e.pageY);
	ctx1.lineTo(e.pageX, e.pageY);
	ctx1.stroke();
}

function drawPencil(e){
	if((painting == false)||(active[0] == false)) return;
	ctx1.lineTo(e.pageX, e.pageY);
	ctx1.stroke();
}

function finishPencil(){
	painting = false;
	ctx1.closePath();
}



//FILLRECT
function startFillrect(e){
	painting = true;
	if(active[1] == false) return;
	startX = e.pageX;
	startY = e.pageY;
	ctx1.fillRect(startX, startY, 0, 1);
	ctx3.drawImage(canvas1,0,0);
	ctx1.clearRect(0,0,canvas2.width, canvas2.height);
		
}

function drawFillrect(e){
	if((painting == false)||(active[1]==false)) return;
	ctx2.clearRect(0,0,canvas2.width, canvas2.height);
	ctx2.fillRect(startX, startY, e.pageX-startX, e.pageY-startY);
}

function finishFillrect(e){
	painting = false;
	ctx1.drawImage(canvas3,0,0);
	ctx1.drawImage(canvas2,0,0);

	ctx2.clearRect(0,0,canvas2.width, canvas2.height);
	ctx3.clearRect(0,0,canvas3.width, canvas3.height);
}



//RECT
function startRect(e){
	painting = true;
	if(active[2] == false) return;
	startX = e.pageX;
	startY = e.pageY;
	ctx2.beginPath();
	ctx2.moveTo(e.pageX, e.pageY);
	ctx2.lineTo(e.pageX, e.pageY);
	ctx2.stroke();
	ctx3.drawImage(canvas1,0,0);
	ctx1.clearRect(0,0,canvas2.width, canvas2.height);
}

function drawRect(e){
	if((painting == false)||(active[2] == false)) return;
	ctx2.clearRect(0,0,canvas2.width, canvas2.height);

	ctx2.beginPath();
	ctx2.moveTo(startX, startY);
	ctx2.lineTo(startX, e.pageY);
	ctx2.lineTo(e.pageX, e.pageY);
	ctx2.lineTo(e.pageX, startY);
	ctx2.lineTo(startX, startY);
	ctx2.stroke();
}

function finishRect(e){
	painting = false;
	ctx1.drawImage(canvas3,0,0);
	ctx1.drawImage(canvas2,0,0);

	ctx2.clearRect(0,0,canvas2.width, canvas2.height);
	ctx3.clearRect(0,0,canvas3.width, canvas3.height);
}



//ERASER
function startEraser(e){
	painting = true;
	if(active[3]==false) return;
	ctx1.strokeStyle = 'white';
	ctx1.beginPath();
	ctx1.moveTo(e.pageX, e.pageY);
	ctx1.lineTo(e.pageX, e.pageY);
	ctx1.stroke();
}

function drawEraser(e){
	if((painting == false)||(active[3] == false)) return;
	ctx1.lineTo(e.pageX, e.pageY);
	ctx1.stroke();
}

function finishEraser(){
	painting = false;
	ctx1.strokeStyle = paint.strokeStyle;
}




//LINE
function startLine(e){
	painting = true;
	if(active[4]==false) return;
	startX = e.pageX;
	startY = e.pageY;

	ctx1.beginPath();
	ctx1.moveTo(e.pageX, e.pageY);
	ctx1.lineTo(e.pageX, e.pageY);
	ctx1.stroke();

	ctx3.drawImage(canvas1,0,0);
	ctx1.clearRect(0,0,canvas2.width, canvas2.height);

}

function drawLine(e){
	if((painting == false)||(active[4] == false)) return;
	ctx2.clearRect(0,0,canvas2.width, canvas2.height);
	ctx2.beginPath();
	ctx2.moveTo(startX, startY);
	ctx2.lineTo(e.pageX, e.pageY);
	ctx2.stroke();
}

function finishLine(e){
	painting = false;

	ctx1.drawImage(canvas3,0,0);
	ctx1.drawImage(canvas2,0,0);

	ctx1.drawImage(canvas2,0,0);
	ctx2.clearRect(0,0,canvas2.width, canvas2.height);
}




//TRIANGLE
function startTriangle(e){
	painting = true;
	if(active[5]==false) return;
	startX = e.pageX;
	startY = e.pageY;

	ctx3.drawImage(canvas1,0,0);
	ctx1.clearRect(0,0,canvas2.width, canvas2.height);
}

function drawTriangle(e){
	if((painting == false)||(active[5]==false)) return;
	ctx2.clearRect(0,0,canvas2.width, canvas2.height);

	ctx2.beginPath();
	ctx2.moveTo(startX, e.pageY);
	ctx2.lineTo((e.pageX+startX)/2, startY);
	ctx2.lineTo(e.pageX, e.pageY);
	ctx2.lineTo(startX, e.pageY);
	ctx2.stroke();
}

function finishTriangle(e){
	painting = false;
	
	ctx1.drawImage(canvas3,0,0);
	ctx1.drawImage(canvas2,0,0);

	ctx2.clearRect(0,0,canvas2.width, canvas2.height);
	ctx3.clearRect(0,0,canvas2.width, canvas2.height);
}




//CIRLCE
function startCircle(e){
	painting = true;
	if(active[6]==false) return;
	startX = e.pageX;
	startY = e.pageY;

	ctx3.drawImage(canvas1,0,0);
	ctx1.clearRect(0,0,canvas2.width, canvas2.height);
}

function drawCircle(e){
	if((painting == false)||(active[6] == false)) return;
	ctx2.clearRect(0,0,canvas2.width, canvas2.height);
	ctx2.beginPath();
	ctx2.arc((e.pageX-startX)/2+startX,(e.pageY-startY)/2+startY,
		Math.abs(((e.pageX-startX)/2+(e.pageY-startY)/2)/2), 0,10*Math.PI);
	ctx2.stroke();
}

function finishCircle(e){
	painting = false;
	
	ctx1.drawImage(canvas3,0,0);
	ctx1.drawImage(canvas2,0,0);

	ctx2.clearRect(0,0,canvas2.width, canvas2.height);
	ctx3.clearRect(0,0,canvas3.width, canvas3.height);
}