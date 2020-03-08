let canvas1 = document.getElementById('canvas1');
canvas1.height = window.innerHeight*4/5;
canvas1.width = window.innerWidth*2/3;
let ctx1 = canvas1.getContext("2d");

let canvas2 = document.getElementById('canvas2');
let ctx2 = canvas2.getContext("2d");
canvas2.height = window.innerHeight*4/5;
canvas2.width = window.innerWidth*2/3;

let canvas3 = document.getElementById('canvas3');
let ctx3 = canvas3.getContext("2d");
canvas3.height = window.innerHeight*4/5;
canvas3.width = window.innerWidth*2/3;

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

function resetColor(){
	for(let i=1; i<17; i++)
		$("#color"+i).css('border-width', '1px');
}

function changeColor(value){
	paint.changeStyle(value);
	resetColor();
	switch(value){
		case 'lime':
			//document.getElementById("color1").style.borderWidth='4px';
			$('#color1').css('border-width','4px');
			break;

		case 'green':
			//document.getElementById("color2").style.borderWidth='4px';
			$('#color2').css('border-width','4px');
			break;

		case 'red':
			//document.getElementById("color3").style.borderWidth='4px';
			$('#color3').css('border-width','4px');
			break;

		case 'orange':
			//document.getElementById("color4").style.borderWidth='4px';
			$('#color4').css('border-width','4px');
			break;

		case 'yellow':
			//document.getElementById("color5").style.borderWidth='4px';
			$('#color5').css('border-width','4px');
			break;

		case 'brown':
			//document.getElementById("color6").style.borderWidth='4px';
			$('#color6').css('border-width','4px');
			break;

		case 'blue':
			//document.getElementById("color7").style.borderWidth='4px';
			$('#color7').css('border-width','4px');
			break;

		case 'fuchsia':
			//document.getElementById("color8").style.borderWidth='4px';
			$('#color8').css('border-width','4px');
			break;

		case 'navy':
			//document.getElementById("color9").style.borderWidth='4px';
			$('#color9').css('border-width','4px');
			break;

		case 'purple':
			//document.getElementById("color10").style.borderWidth='4px';
			$('#color10').css('border-width','4px');
			break;

		case 'teal':
			//document.getElementById("color11").style.borderWidth='4px';
			$('#color11').css('border-width','4px');
			break;

		case 'aqua':
			//document.getElementById("color12").style.borderWidth='4px';
			$('#color12').css('border-width','4px');
			break;

		case 'gold':
			//document.getElementById("color13").style.borderWidth='4px';
			$('#color13').css('border-width','4px');
			break;

		case 'silver':
			//document.getElementById("color14").style.borderWidth='4px';
			$('#color14').css('border-width','4px');
			break;

		case 'gray':
			//document.getElementById("color15").style.borderWidth='4px';
			$('#color15').css('border-width','4px');
			break;

		case 'black':
			//document.getElementById("color16").style.borderWidth='4px';
			$('#color16').css('border-width','4px');
			break;
	}
}

paint.changeStyle = function (value){
	this.fillStyle = value;
	this.strokeStyle = value;
	//document.getElementById('proba').innerHTML = value;
	main();
}


/*paint.changeLineCap = function (value) {
	this.lineCap = value;
}


paint.changeLineJoin = function (value) {
	this.lineJoin = value;
}*/



function changeSize(){
	let value=document.getElementById("width").value;
	if(value<1){
		alert("Podana wartość jest mniejsza od 0, Size = 1");
		value=1;
	}

	if(isNaN(value)){
		alert("Wprowadzona wartość nie jest liczbą!");
		return;
	}
	paint.changeLineWidth(value);
}

paint.changeLineWidth = function (value) {
	this.lineWidth = value;
	//document.getElementById('proba').innerHTML = 'Size: '+this.lineWidth;
	$('#proba').html('Size changed to: '+this.lineWidth);
	main();
}



function change(v){
	paint.changeMode(v);
}

paint.changeMode = function (value) {
	this.mode = value;
	//document.getElementById('proba').innerHTML = this.mode;
	main();
}


function setActive(v){
	for(let i=1; i<8; i++){
		active[i-1] = false;
		document.getElementById('option'+i).setAttribute('class', 'option inactive');
	}
	active[v-1] = true;
	document.getElementById('option'+v).setAttribute('class', 'option active');
}

function offListeners(){
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

function main(){
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

			//canvas1.addEventListener('mousedown', startPencil);
			//canvas1.addEventListener('mouseup', finishPencil);
			//canvas1.addEventListener('mousemove', drawPencil);
			$("#canvas1").on("mousedown", startPencil); 
			$("#canvas1").on("mouseup", finishPencil); 
			$("#canvas1").on("mousemove", drawPencil); 

			break;

		case 2: //FILLRECT
			setActive(2);
			offListeners();
			
			//canvas1.addEventListener('mousedown', startFillrect);
			//canvas1.addEventListener('mouseup', finishFillrect);
			//canvas1.addEventListener('mousemove', drawFillrect);

			$("#canvas1").on("mousedown", startFillrect); 
			$("#canvas1").on("mouseup", finishFillrect); 
			$("#canvas1").on("mousemove", drawFillrect);
			break;

		case 3: //RECT
			setActive(3);
			offListeners();
			//canvas1.addEventListener('mousedown', startRect);
			//canvas1.addEventListener('mouseup', finishRect);
			//canvas1.addEventListener('mousemove', drawRect);

			$("#canvas1").on("mousedown", startRect); 
			$("#canvas1").on("mouseup", finishRect); 
			$("#canvas1").on("mousemove", drawRect);


			break;
		
		case 4: //ERASER
			setActive(4);
			offListeners();
			//canvas1.addEventListener('mousedown', startEraser);
			//canvas1.addEventListener('mouseup', finishEraser);
			//canvas1.addEventListener('mousemove', drawEraser);

			$("#canvas1").on("mousedown", startEraser); 
			$("#canvas1").on("mouseup", finishEraser); 
			$("#canvas1").on("mousemove", drawEraser);
			break;

		case 5: // LINE
			setActive(5);
			offListeners();
			//canvas1.addEventListener('mousedown', startLine);
			//canvas1.addEventListener('mouseup', finishLine);
			//canvas1.addEventListener('mousemove', drawLine);

			$("#canvas1").on("mousedown", startLine); 
			$("#canvas1").on("mouseup", finishLine); 
			$("#canvas1").on("mousemove", drawLine);
			break;

		case 6: // TRIANGLE
			setActive(6);
			offListeners();
			//canvas1.addEventListener('mousedown', startTriangle);
			//canvas1.addEventListener('mouseup' , finishTriangle);
			//canvas1.addEventListener('mousemove' , drawTriangle);

			$("#canvas1").on("mousedown", startTriangle); 
			$("#canvas1").on("mouseup", finishTriangle); 
			$("#canvas1").on("mousemove", drawTriangle);
			break;

		case 7: //CIRCLE
			setActive(7);
			offListeners();
			//canvas1.addEventListener('mousedown', startCircle);
			//canvas1.addEventListener('mouseup', finishCircle);
			//canvas1.addEventListener('mousemove', drawCircle);

			$("#canvas1").on("mousedown", startCircle); 
			$("#canvas1").on("mouseup", finishCircle); 
			$("#canvas1").on("mousemove", drawCircle);
		break;
	}
}


/*let temp = document.getElementById('submit');
temp.addEventListener('click', changeSize);

let temp2 = document.getElementById('clear');
temp2.addEventListener('click', clear);

let temp3 = document.getElementById('download');
temp3.addEventListener('click', getImage);

let temp4 = window;
temp4.addEventListener('load', main);*/

$("#width").on("keyup", changeSize); 
$("#clear").on("click", clear); 
$("#download").on("click", getImage);
$(window).on("load", main);




function getImage(){ //DOWNLOAD
	var imgData = canvas1.toDataURL('image/png'),
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



