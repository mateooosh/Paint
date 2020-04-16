let canvas1 = document.getElementById('canvas1');
canvas1.height = document.getElementById('setHeight').value;
canvas1.width = document.getElementById('setWidth').value;
let ctx1 = canvas1.getContext("2d");

let canvas2 = document.getElementById('canvas2');
let ctx2 = canvas2.getContext("2d");
canvas2.height = document.getElementById('setHeight').value;
canvas2.width = document.getElementById('setWidth').value;

let canvas3 = document.getElementById('canvas3');
let ctx3 = canvas3.getContext("2d");
canvas3.height = document.getElementById('setHeight').value;
canvas3.width = document.getElementById('setWidth').value;

let painting = false;
let startX, startY;
let active=[false,false,false,false,false,false,false];

let paint = {
mode: 		1,
//1 - PENCIL
//2 - FILLRECT 
//3 - RECT
//4 - ERASER
//5 - LINE
//6 - TRIANGLE
//7 - CIRCLE

fillStyle:   'black',

lineCap:     'round',  // butt, square, round
lineJoin:    'round',  // bevel, round, miter 
lineWidth:    5,

strokeStyle: 'black',

};

const resetColor = () =>{
	for(let i=1; i<17; i++)
		$("#color"+i).css('border-width', '1px');
}

const changeColor = (value) =>{
	paint.changeStyle(value);
	resetColor();
	switch(value){
		case 'lime':
			$('.currentColor').css('background-color','lime');
			break;

		case 'green':
			$('.currentColor').css('background-color','green');
			break;

		case 'red':
			$('.currentColor').css('background-color','red');
			break;

		case 'orange':
			$('.currentColor').css('background-color','orange');
			break;

		case 'yellow':
			$('.currentColor').css('background-color','yellow');
			break;

		case 'brown':
			$('.currentColor').css('background-color','brown');
			break;

		case 'blue':
			$('.currentColor').css('background-color','blue');
			break;

		case 'fuchsia':
			$('.currentColor').css('background-color','fuchsia');
			break;

		case 'navy':
			$('.currentColor').css('background-color','navy');
			break;

		case 'purple':
			$('.currentColor').css('background-color','purple');
			break;

		case 'teal':
			$('.currentColor').css('background-color','teal');
			break;

		case 'aqua':
			$('.currentColor').css('background-color','aqua');
			break;

		case 'gold':
			$('.currentColor').css('background-color','gold');
			break;

		case 'silver':
			$('.currentColor').css('background-color','silver');
			break;

		case 'gray':
			$('.currentColor').css('background-color','gray');
			break;

		case 'black':
			$('.currentColor').css('background-color','black');
			break;
	}
}

paint.changeStyle = function (value){
	this.fillStyle = value;
	this.strokeStyle = value;
	main();
}


const changeSize = () =>{
	let value = document.getElementById("width").value;
	if(value<1){
		alert(`The value entered is less than 0, Size = 1`);
		value=1;
	}

	paint.changeLineWidth(value);
}

paint.changeLineWidth = function (value) {
	this.lineWidth = value;
	$('#proba').html('Size changed to: '+this.lineWidth);
	main();
}

const changeCap = () =>{
	let value = document.getElementById("setLineCap").value;
	paint.changeLineCap(value);
}

paint.changeLineCap = function (value) {
	this.lineCap = value;
	$('#proba').html('Line Cap changed to: '+this.lineCap);
	main();
}



const change = (v) =>{
	paint.changeMode(v);
}

paint.changeMode = function (value) {
	this.mode = value;
	main();
}


const setActive = (v) =>{
	for(let i=1; i<8; i++){
		active[i-1] = false;
		document.getElementById('option'+i).setAttribute('class', 'tools inactive');
	}
	active[v-1] = true;
	document.getElementById('option'+v).setAttribute('class', 'tools active');
}

const offListeners = () =>{
	$("#canvas1").off("mousedown", startPencil); 
	$("#canvas1").off("mouseup", finishPencil); 
	$("#canvas1").off("mousemove", drawPencil);

	$("#canvas1").off("mousedown", startFillrect); 
	$("#canvas1").off("mouseup", finishFillrect); 
	$("#canvas1").off("mousemove", drawFillrect);

	$("#canvas1").off("mousedown", startRect); 
	$("#canvas1").off("mouseup", finishRect); 
	$("#canvas1").off("mousemove", drawRect);

	$("#canvas1").off("mousedown", startEraser); 
	$("#canvas1").off("mouseup", finishEraser); 
	$("#canvas1").off("mousemove", drawEraser);

	$("#canvas1").off("mousedown", startLine); 
	$("#canvas1").off("mouseup", finishLine); 
	$("#canvas1").off("mousemove", drawLine);

	$("#canvas1").off("mousedown", startTriangle); 
	$("#canvas1").off("mouseup", finishTriangle); 
	$("#canvas1").off("mousemove", drawTriangle);

	$("#canvas1").off("mousedown", startCircle); 
	$("#canvas1").off("mouseup", finishCircle); 
	$("#canvas1").off("mousemove", drawCircle);
}

const main = () =>{
	ctx1.lineCap = paint.lineCap;
	ctx1.lineJoin = paint.lineJoin;
	ctx1.lineWidth = paint.lineWidth;
	ctx1.strokeStyle = paint.strokeStyle;

	ctx2.lineCap = paint.lineCap;
	ctx2.lineJoin = paint.lineJoin;
	ctx2.lineWidth = paint.lineWidth;
	ctx2.strokeStyle = paint.strokeStyle;

	ctx3.lineCap = paint.lineCap;
	ctx3.lineJoin = paint.lineJoin;
	ctx3.lineWidth = paint.lineWidth;
	ctx3.strokeStyle = paint.strokeStyle;

	ctx1.fillStyle = paint.fillStyle;
	ctx2.fillStyle = paint.fillStyle;
	ctx3.fillStyle = paint.fillStyle;

	switch(paint.mode){
		case 1: //PENCIL
			setActive(1);
			offListeners();

			$("#canvas1").on("mousedown", startPencil); 
			$("#canvas1").on("mouseup", finishPencil); 
			$("#canvas1").on("mousemove", drawPencil); 

			break;

		case 2: //FILLRECT
			setActive(2);
			offListeners();

			$("#canvas1").on("mousedown", startFillrect); 
			$("#canvas1").on("mouseup", finishFillrect); 
			$("#canvas1").on("mousemove", drawFillrect);
			break;

		case 3: //RECT
			setActive(3);
			offListeners();

			$("#canvas1").on("mousedown", startRect); 
			$("#canvas1").on("mouseup", finishRect); 
			$("#canvas1").on("mousemove", drawRect);


			break;
		
		case 4: //ERASER
			setActive(4);
			offListeners();

			$("#canvas1").on("mousedown", startEraser); 
			$("#canvas1").on("mouseup", finishEraser); 
			$("#canvas1").on("mousemove", drawEraser);
			break;

		case 5: // LINE
			setActive(5);
			offListeners();

			$("#canvas1").on("mousedown", startLine); 
			$("#canvas1").on("mouseup", finishLine); 
			$("#canvas1").on("mousemove", drawLine);
			break;

		case 6: // TRIANGLE
			setActive(6);
			offListeners();

			$("#canvas1").on("mousedown", startTriangle); 
			$("#canvas1").on("mouseup", finishTriangle); 
			$("#canvas1").on("mousemove", drawTriangle);
			break;

		case 7: //CIRCLE
			setActive(7);
			offListeners();

			$("#canvas1").on("mousedown", startCircle); 
			$("#canvas1").on("mouseup", finishCircle); 
			$("#canvas1").on("mousemove", drawCircle);
		break;
	}
}

$("#width").on("change", changeSize); 
$("#clear").on("click", clear); 
$("#download").on("click", getImage);
$(window).on("load", main);


function getImage(){ //DOWNLOAD
	let imgData = canvas1.toDataURL('image/png'),
		a = document.createElement("a"),
		img = document.createElement("img");
	a.href = imgData;
	a.download = "obrazek"+new Date().toLocaleTimeString()+".png";
	a.click();
}


function clear(){
	ctx1.clearRect(0,0,canvas1.width, canvas1.height);
	ctx2.clearRect(0,0,canvas2.width, canvas2.height);
	ctx3.clearRect(0,0,canvas3.width, canvas3.height);
}

function setCanvasSize(){
	canvas1.height = document.getElementById('setHeight').value;
	canvas1.width = document.getElementById('setWidth').value;

	canvas2.height = document.getElementById('setHeight').value;
	canvas2.width = document.getElementById('setWidth').value;

	canvas3.height = document.getElementById('setHeight').value;
	canvas3.width = document.getElementById('setWidth').value;

	$('#proba').html(`Width: ${canvas1.width}`);
	$('#proba2').html(`Height: ${canvas1.height}`);

	main();
}

$("#setHeight").on("change", setCanvasSize);
$("#setWidth").on("change", setCanvasSize);
$("#setLineCap").on("change", changeCap);



