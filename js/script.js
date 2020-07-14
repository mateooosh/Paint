let canvas1 = document.getElementById('canvas1');
canvas1.height = window.innerHeight - 102;
canvas1.width = window.innerWidth-2;
let ctx1 = canvas1.getContext("2d");

let canvas2 = document.getElementById('canvas2');
let ctx2 = canvas2.getContext("2d");
canvas2.height = window.innerHeight - 102;
canvas2.width = window.innerWidth-2;

let canvas3 = document.getElementById('canvas3');
let ctx3 = canvas3.getContext("2d");
canvas3.height = window.innerHeight - 102;
canvas3.width = window.innerWidth-2;

$("#setHeight").val(window.innerHeight - 102);
$("#setWidth").val(window.innerWidth - 2);

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


paint.changeStyle = function (value){
	this.fillStyle = value;
	this.strokeStyle = value;
	main();
}


const changeSize = () =>{
	let value = $("#width").val();
	if(value<1){
		$("#width").val(1);
		value=1;
		alert(`The value entered is less than 0, Size = 1`);
	}

	paint.changeLineWidth(value);
}

paint.changeLineWidth = function (value) {
	this.lineWidth = value;
	main();
}

const changeCap = () =>{
	// let value = document.getElementById("setLineCap").value;
	let value = $("#setLineCap").val(); 
	paint.changeLineCap(value);
}

paint.changeLineCap = function (value) {
	this.lineCap = value;
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
		document.getElementById(`option${i}`).setAttribute('class', 'tools inactive');
	}
	active[v-1] = true;
	document.getElementById(`option${v}`).setAttribute('class', 'tools active');
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

const getImage = () =>{ //DOWNLOAD
	let imgData = canvas1.toDataURL('image/png'),
		a = document.createElement("a"),
		img = document.createElement("img");
	a.href = imgData;
	a.download = `image${new Date().toLocaleTimeString()}.png`;
	a.click();
}


const clear = () =>{
	ctx1.clearRect(0,0,canvas1.width, canvas1.height);
	ctx2.clearRect(0,0,canvas2.width, canvas2.height);
	ctx3.clearRect(0,0,canvas3.width, canvas3.height);
}

const setCanvasSize = () =>{
	if ($("#setHeight").val() <100){
		alert(`The value entered is less than 100, Canvas Height = 100`);
		$("#setHeight").val(100);
	}

	if ($("#setWidth").val() < 100){
		alert(`The value entered is less than 100, Canvas Width = 100`);
		$("#setWidth").val(100)
	}

	canvas1.height = $("#setHeight").val();
	canvas1.width = $("#setWidth").val();

	canvas2.height = $("#setHeight").val();
	canvas2.width = $("#setWidth").val();

	canvas3.height = $("#setHeight").val();
	canvas3.width = $("#setWidth").val();

	main();
}
$("#setHeight").on("change", setCanvasSize);
$("#setWidth").on("change", setCanvasSize);
$("#setLineCap").on("change", changeCap);


$("#width").on("change", changeSize); 
$("#clear").on("click", clear); 
$("#download").on("click", getImage);
$(window).on("load", main);




$("#pick-color").on("change", function(event) {
	$('.currentColor').css('background-color', `${event.target.value}`);
	paint.changeStyle(`${event.target.value}`);
	main();	
})
