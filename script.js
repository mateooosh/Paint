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
let active=[false,false,false,false,false,false,false,false];

let paint = {
mode: 		1,
//1 - PENCIL
//2 - FILLRECT 
//3 - RECT
//4 - ERASER
//5 - TEXT
//6 - LINE
//7 - TRIANGLE
//8 - CIRCLE

fillStyle:   'black',

lineCap:     'round',  // butt, square, round
lineJoin:    'round',  // bevel, round, miter 
lineWidth:    5,

strokeStyle: 'black',

};

function resetColor(){
	for(let i=1; i<17; i++)
		document.getElementById("color"+i).style.borderWidth='1px';
}

function changeColor(value){
	resetColor();
	switch(value){
		case 'lime':
			document.getElementById("color1").style.borderWidth='4px';
			break;

		case 'green':
			document.getElementById("color2").style.borderWidth='4px';
			break;

		case 'red':
			document.getElementById("color3").style.borderWidth='4px';
			break;

		case 'orange':
			document.getElementById("color4").style.borderWidth='4px';
			break;

		case 'yellow':
			document.getElementById("color5").style.borderWidth='4px';
			break;

		case 'brown':
			document.getElementById("color6").style.borderWidth='4px';
			break;

		case 'blue':
			document.getElementById("color7").style.borderWidth='4px';
			break;

		case 'fuchsia':
			document.getElementById("color8").style.borderWidth='4px';
			break;

		case 'navy':
			document.getElementById("color9").style.borderWidth='4px';
			break;

		case 'purple':
			document.getElementById("color10").style.borderWidth='4px';
			break;

		case 'teal':
			document.getElementById("color11").style.borderWidth='4px';
			break;

		case 'aqua':
			document.getElementById("color12").style.borderWidth='4px';
			break;

		case 'gold':
			document.getElementById("color13").style.borderWidth='4px';
			break;

		case 'silver':
			document.getElementById("color14").style.borderWidth='4px';
			break;

		case 'gray':
			document.getElementById("color15").style.borderWidth='4px';
			break;

		case 'black':
			document.getElementById("color16").style.borderWidth='4px';
			break;
	}
	paint.changeStyle(value);
}

paint.changeStyle = function (value){
	this.fillStyle = value;
	this.strokeStyle = value;
	document.getElementById('proba').innerHTML = value;
	main();
}


paint.changeLineCap = function (value) {
	this.lineCap = value;
}


paint.changeLineJoin = function (value) {
	this.lineJoin = value;
}



function changeSize(){
	let value=document.getElementById("width").value;
	if(value<1)
		value=1;
	paint.changeLineWidth(value);
}

paint.changeLineWidth = function (value) {
	this.lineWidth = value;
	document.getElementById('proba').innerHTML = this.lineWidth;
	main();
}



function change(v){
	paint.changeMode(v);
}

paint.changeMode = function (value) {
	this.mode = value;
	document.getElementById('proba').innerHTML = this.mode;
	main();
}


function setActive(v){
	for(let i=1; i<9; i++)
		active[i-1] = false;
	active[v-1] = true;
}

function reset(value){
	let msg='option';
	for(let i=1; i<9; i++){
		msg='option';
		msg+=i;
		document.getElementById(msg).style.backgroundColor='#4444FF';
		document.getElementById(msg).style.color='white';
	}
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
			reset();
			document.getElementById('option1').style.backgroundColor='white';
			document.getElementById('option1').style.color='#4444FF';

			setActive(1);

			function start1(e){
				painting = true;
				if(active[0]==false) return;
				ctx1.beginPath();
				ctx1.strokeStyle=paint.strokeStyle;
				ctx1.moveTo(e.clientX, e.clientY);
				ctx1.lineTo(e.clientX, e.clientY);
				ctx1.stroke();
			}

			function draw1(e){
				if((painting == false)||(active[0] == false)) return;
				ctx1.lineTo(e.clientX, e.clientY);
				ctx1.stroke();
			}

			function finish1(){
				painting = false;
				ctx1.closePath();
			}

			canvas1.addEventListener('mousedown', start1);
			canvas1.addEventListener('mouseup', finish1);
			canvas1.addEventListener('mousemove', draw1);

			break;

		case 2: //FILLRECT
			reset();
			document.getElementById('option2').style.backgroundColor='white';
			document.getElementById('option2').style.color='#4444FF';
			setActive(2);

			function start2(e){
				painting = true;
				if(active[1] == false) return;
				startX = e.clientX;
				startY = e.clientY;
				ctx1.fillRect(startX, startY, 0, 1);
				ctx3.drawImage(canvas1,0,0);
				ctx1.clearRect(0,0,canvas2.width, canvas2.height);
					
			}

			function draw2(e){
				if((painting == false)||(active[1]==false)) return;
				ctx2.clearRect(0,0,canvas2.width, canvas2.height);
				ctx2.fillRect(startX, startY, e.clientX-startX, e.clientY-startY);
			}

			function finish2(e){
				painting = false;
				ctx1.drawImage(canvas3,0,0);
				ctx1.drawImage(canvas2,0,0);

				ctx2.clearRect(0,0,canvas2.width, canvas2.height);
				ctx3.clearRect(0,0,canvas3.width, canvas3.height);
			}

			canvas1.addEventListener('mousedown', start2);
			canvas1.addEventListener('mouseup', finish2);
			canvas1.addEventListener('mousemove', draw2);
			break;

		case 3: //RECT
			reset();
			document.getElementById('option3').style.backgroundColor='white';
			document.getElementById('option3').style.color='#4444FF';
			setActive(3);

			function start3(e){
				painting = true;
				if(active[2] == false) return;
				startX = e.clientX;
				startY = e.clientY;
				ctx2.beginPath();
				ctx2.moveTo(e.clientX, e.clientY);
				ctx2.lineTo(e.clientX, e.clientY);
				ctx2.stroke();
				ctx3.drawImage(canvas1,0,0);
				ctx1.clearRect(0,0,canvas2.width, canvas2.height);
			}

			function draw3(e){
				if((painting == false)||(active[2] == false)) return;
				ctx2.clearRect(0,0,canvas2.width, canvas2.height);

				ctx2.beginPath();
				ctx2.moveTo(startX, startY);
				ctx2.lineTo(startX, e.clientY);
				ctx2.lineTo(e.clientX, e.clientY);
				ctx2.lineTo(e.clientX, startY);
				ctx2.lineTo(startX, startY);
				ctx2.stroke();
			}

			function finish3(e){
				painting = false;
				ctx1.drawImage(canvas3,0,0);
				ctx1.drawImage(canvas2,0,0);

				ctx2.clearRect(0,0,canvas2.width, canvas2.height);
				ctx3.clearRect(0,0,canvas3.width, canvas3.height);
			}

			canvas1.addEventListener('mousedown', start3);
			canvas1.addEventListener('mouseup', finish3);
			canvas1.addEventListener('mousemove', draw3);
			break;
		
		case 4: //ERASER
			reset();
			document.getElementById('option4').style.backgroundColor='white';
			document.getElementById('option4').style.color='#4444FF';
			setActive(4);
			
			function start4(e){
				painting = true;
				if(active[3]==false) return;
				ctx1.strokeStyle = 'white';
				ctx1.beginPath();
				ctx1.moveTo(e.clientX, e.clientY);
				ctx1.lineTo(e.clientX, e.clientY);
				ctx1.stroke();
			}

			function draw4(e){
				if((painting == false)||(active[3] == false)) return;
				ctx1.lineTo(e.clientX, e.clientY);
				ctx1.stroke();
			}

			function finish4(){
				painting = false;
				ctx1.strokeStyle = paint.strokeStyle;
			}

			canvas1.addEventListener('mousedown', start4);
			canvas1.addEventListener('mouseup', finish4);
			canvas1.addEventListener('mousemove', draw4);
			break;

		case 5:
			document.getElementById('option5').style.backgroundColor='white';
			document.getElementById('option5').style.color='#4444FF';
			reset();
			setActive(5);

			break;

		case 6: // LINE
			reset();
			document.getElementById('option6').style.backgroundColor='white';
			document.getElementById('option6').style.color='#4444FF';
			setActive(6);

			function start6(e){
				painting = true;
				if(active[5]==false) return;
				startX = e.clientX;
				startY = e.clientY;

				ctx1.beginPath();
				ctx1.moveTo(e.clientX, e.clientY);
				ctx1.lineTo(e.clientX, e.clientY);
				ctx1.stroke();

				ctx3.drawImage(canvas1,0,0);
				ctx1.clearRect(0,0,canvas2.width, canvas2.height);

			}

			function draw6(e){
				if((painting == false)||(active[5] == false)) return;
				ctx2.clearRect(0,0,canvas2.width, canvas2.height);
				ctx2.beginPath();
				ctx2.moveTo(startX, startY);
				ctx2.lineTo(e.clientX, e.clientY);
				ctx2.stroke();
			}

			function finish6(e){
				painting = false;

				ctx1.drawImage(canvas3,0,0);
				ctx1.drawImage(canvas2,0,0);

				ctx1.drawImage(canvas2,0,0);
				ctx2.clearRect(0,0,canvas2.width, canvas2.height);
			}

			canvas1.addEventListener('mousedown', start6);
			canvas1.addEventListener('mouseup', finish6);
			canvas1.addEventListener('mousemove', draw6);
			break;

		case 7: // TRIANGLE
			reset();
			document.getElementById('option7').style.backgroundColor='white';
			document.getElementById('option7').style.color='#4444FF';
			setActive(7);

			function start7(e){
				painting = true;
				if(active[6]==false) return;
				startX = e.clientX;
				startY = e.clientY;

				ctx3.drawImage(canvas1,0,0);
				ctx1.clearRect(0,0,canvas2.width, canvas2.height);
			}

			function draw7(e){
				if((painting == false)||(active[6]==false)) return;
				ctx2.clearRect(0,0,canvas2.width, canvas2.height);

				ctx2.beginPath();
				ctx2.moveTo(startX, e.clientY);
				ctx2.lineTo((e.clientX+startX)/2, startY);
				ctx2.lineTo(e.clientX, e.clientY);
				ctx2.lineTo(startX, e.clientY);
				ctx2.stroke();
			}

			function finish7(e){
				painting = false;
				
				ctx1.drawImage(canvas3,0,0);
				ctx1.drawImage(canvas2,0,0);

				ctx2.clearRect(0,0,canvas2.width, canvas2.height);
				ctx3.clearRect(0,0,canvas2.width, canvas2.height);
			}

			canvas1.addEventListener('mousedown', start7);
			canvas1.addEventListener('mouseup' , finish7);
			canvas1.addEventListener('mousemove' , draw7);
			break;

		case 8: //CIRCLE
			reset();
			document.getElementById('option8').style.backgroundColor='white';
			document.getElementById('option8').style.color='#4444FF';
			setActive(8);

			function start8(e){
				painting = true;
				if(active[7]==false) return;
				startX = e.clientX;
				startY = e.clientY;

				ctx3.drawImage(canvas1,0,0);
				ctx1.clearRect(0,0,canvas2.width, canvas2.height);
			}

			function draw8(e){
				if((painting == false)||(active[7] == false)) return;
				ctx2.clearRect(0,0,canvas2.width, canvas2.height);
				ctx2.beginPath();
				ctx2.arc((e.clientX-startX)/2+startX,(e.clientY-startY)/2+startY,
					Math.abs(((e.clientX-startX)/2+(e.clientY-startY)/2)/2), 0,10*Math.PI);
				ctx2.stroke();
			}

			function finish8(e){
				painting = false;
				
				ctx1.drawImage(canvas3,0,0);
				ctx1.drawImage(canvas2,0,0);

				ctx2.clearRect(0,0,canvas2.width, canvas2.height);
				ctx3.clearRect(0,0,canvas3.width, canvas3.height);
			}

			canvas1.addEventListener('mousedown', start8);
			canvas1.addEventListener('mouseup', finish8);
			canvas1.addEventListener('mousemove', draw8);
		break;
	}
}

function clear(){
	ctx1.clearRect(0,0,canvas1.width, canvas1.height);
	ctx2.clearRect(0,0,canvas2.width, canvas2.height);
	ctx3.clearRect(0,0,canvas3.width, canvas3.height);
}

let temp = document.getElementById('submit');
temp.addEventListener('click', changeSize);

let temp2 = document.getElementById('clear');
temp2.addEventListener('click', clear);

let temp3 = document.getElementById("download");
temp3.addEventListener('click', getImage);


function getImage(){
	var imgData = canvas1.toDataURL('image/png'),
		//list = document.getElementById("generatedImageList"),
		a = document.createElement("a"),
		img = document.createElement("img");
	a.href = imgData;
	a.download = "paint"+new Date().toLocaleTimeString()+".png";
	a.click();
}

