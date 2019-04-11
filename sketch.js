
/*
*/
let FDX = 15;
let FDY = 15;
let barX = 110;
let barY = 160;
let FW = 0;
let timeL;
let waitTime;
let arr = [];
let fl = 0;
let img;
let img2;
let img3;
let xc = 35;
let yc = 30;
let mode = 0;
let over = 0;
let TMO;
let timer3;
let timer2;
let timer;
let WT = 150;
let cookie = 0;
var vid;
var vid2;
var vid3;
var g = 0
function preload() {
  mySound = loadSound('assets/fireoff.wav');
}
function setup() {
	
  vid = createVideo(['assets/Cartoon_213.webm'],vidLoad)
	img = loadImage('assets/dronetr.png');
	img2 = loadImage('assets/house.png');
	img3 = loadImage('assets/watertank.png');
	length = 400
	drx = length / 2;
	dry = 375;
	frameRate(45);
}
let tttt;
function vidLoad() {
  vid.play();
  tttt = setInterval(function(){
    g = 1;
    createCanvas(600,600);
    vid.hide();
    mode = 0
  },6500)
}

function vidLoad2() {
vid2 = createVideo(['assets/win_1.webm'])
  vid2.play();
 setTimeout(function() {
   vid2.hide();
   mode = 0;
    document.getElementById('defaultCanvas0').style.display = 'block';
 },1500)
}

function vidLoad3() {
 vid3.play();
   setTimeout(function() {
   vid3.hide();
   mode = 0;
    document.getElementById('defaultCanvas0').style.display = 'block';
 },1000)
}

function draw() {
  if (g){
    clearInterval(tttt);
  //background(150);
  image(vid, height, width);
  print(cookie);
	background(220);
	image(img2, 0, 0, height, width);

	if (mode === 0){
		menu();
	}

	if (mode === 3){
		gameR();
	}
	if (mode === 4) {
		if (about === "true") {
			strokeWeight(0);
			fill(0,255,255,255);
			rect(0,0,600,600);
            fill(0,0,0,255);
			strokeWeight(5);
			let allx = 15
			textSize(19);
			text('О нет! Какой-то плохой человек поджег дом!', allx, 25);
			text('Останови пожар и спаси дом!', allx, 50);
			text('Управляй дроном при помощи стрелочек на клавиатуре',allx,100);
			text('Попробуй сейчас!',allx,125);
			text('При выборе первого режима ты должен потушить дом',allx,175);
			text('Если будет много огня,то ты проиграешь!',allx,200);
			text('При выборе второго режима,',allx,250)
			text('Ты должен потушить дом за определенное время,а то он сгорит!',allx,275);
			text('При выборе третьего режима,',allx,350);
			text('Ты должен смотреть за количеством воды в дроне,',allx,375);
			text('И потушить дом за определенное время!',allx,400);			
			text('Но учти, огни ростут!',allx,425);
			text('Чем больше огонь,тем больше воды потребуется!',allx,450);
			text('Для выхода нажмите ПРОБЕЛ', allx,550);
			text('И помните, НИКОГДА не играйте с огнем!',allx,575);
		}
	}

	if (mode > 0) {
		image(img, drx, dry, 61, 41);
		for (let i = 0; i < arr.length; i++) {
			image(arr[i].img, arr[i].x - arr[i].fdx / 2, arr[i].y - arr[i].fdx / 2, arr[i].fdx, arr[i].fdx);
			}
		gravity();
		ground();
		keyChange();
		isCollision();
		turnLR();
		cursor(CROSS);
		if (TMO === 'true') {
			textSize(32);
			text('TIME MODE', 65, 30);
			textSize(32);
			text(timeL, 10, 30);
		}
	}
}
}
function fmc() { //fire massive create
	for (let i = 0; i < 5; i++) {
		pushFire();
	}
}

function gameR() {
	fill(0, 255, 255, 255);
	rect(549, 599, 30, -WT);
  fill(0,0,0,255);
  image(img3, 0, 440, barX, barY);
  refill();
}
function keyPressed() {
	if(keyCode == 32 && mode == 4) {
		mode = 0;
		strokeWeight(1);
	}
}
function pushFire(){
	arr.push({
		img: loadImage('assets/fire.png'),
		x: random(50, 560),
		y: random(50, 560),
		fdx: 25
	});
}

function mouseClicked() {
	if (mode === 0){
		if (mouseX > height / 2 - 100 && mouseX < height / 2 + 100 && mouseY > width / 2 - 30 && mouseY < width / 2 + 30) {
			print("mode1");
			mode = 1;
			timer = setInterval(pushFire, 1000);
			arr.length = 0;
			fmc();
            for (let i = 0; i < arr.length; i++) {
				arr[i].fdx = 45;
			}
		} else if (mouseX > height / 2 - 100 && mouseX < height / 2 + 100 && mouseY > width / 2 + 31 && mouseY < width / 2 + 90) {
			print('mode2');
			mode = 2;
			timer2 = setInterval(KP, 1000);
			timer = setInterval(pushFire, 1200);
			arr.length = 0;
			fmc();
			timeL = 60
			for (let i = 0; i < arr.length; i++) {
				arr[i].fdx = 45;
			}
		} else if (mouseX > height / 2 - 100 && mouseX < height / 2 + 100 && mouseY > width / 2 + 70 && mouseY < width / 2 + 120) {
			print('mode3');
			mode = 3;
			WT = 150;
			timer3 = setInterval(fb, 100)
			timer2 = setInterval(KP, 1000);
			timer = setInterval(pushFire, 1500);
			arr.length = 0;
			fmc();
			timeL = 120
		} else if (mouseX > height / 2 - 100 && mouseX < height / 2 + 100 && mouseY > width / 2 + 155 && mouseY < width / 2 + 195) {
			about = "true";
			mode = 4
			}
	}
}

function refill() {
  if((drx > 0) && (drx < 100) && (dry > 440) && (dry < 540)){
    WT = WT + 15
    print('Заполняюсь');
    if(WT > 300) {
      WT = 300;
      print('переполнение контейнера!');
    }
  }
}

function menu() {
	if (mouseX > height / 2 - 100 && mouseX < height / 2 + 100 && mouseY > width / 2 - 30 && mouseY < width / 2 + 30) {
		fill(0, 255, 0, 255);
		rect(height / 2 - 112, width / 2 - 30, 225, 60);
	}

	if (mouseX > height / 2 - 100 && mouseX < height / 2 + 100 && mouseY > width / 2 + 31 && mouseY < width / 2 + 90) {
		fill(0, 255, 0, 255);
		rect(height / 2 - 112, width / 2 + 30, 225, 60);
		timeL = 60;
	}
	if (mouseX > height / 2 - 100 && mouseX < height / 2 + 100 && mouseY > width / 2 + 70 && mouseY < width / 2 + 120) {
		fill(0, 255, 0, 255);
		rect(height / 2 - 112, width / 2 + 90, 225, 60);
	}
    if (mouseX > height / 2 - 100 && mouseX < height / 2 + 100 && mouseY > width / 2 + 155 && mouseY < width / 2 + 195) {
		fill(0, 255, 0, 255);
		rect(height / 2 - 112, width / 2 + 150, 225, 60);

	}


	fill(255, 255, 0, 255);
	rect(height / 2 - 100, width / 2 - 20, 200, 40);
	fill(0, 0, 0, 255);
	textSize(20);
	text('Обычная игра', height / 2 - 70, width / 2 + 5);
	fill(255, 0, 0, 255);
	rect(height / 2 - 100, width / 2 + 40, 200, 40);
	fill(0, 0, 0, 255);
	text('Игра на скорость', height / 2 - 80, width / 2 + 65);
	fill(255, 225, 225, 225);
	rect(height / 2 - 100, width / 2 + 100, 200, 40);
	fill(0, 0, 0, 255);
	text('Реалистичная игра', height / 2 - 85, width / 2 + 128);
    fill(0,144,255,255);
    rect(height / 2 - 100, width / 2 + 160, 200, 40);
	fill(0, 0, 0, 255);
	text('Об игре', height / 2 - 40, width / 2 + 185);
}

function fb() {
  for (let i = 0; i < arr.length; i++) {
	arr[i].fdx = arr[i].fdx + random(0,0.5);
  }
}

function isCollision() {
	let k = -1;
	for (let i = 0; i < arr.length; i++) {
		if (WT > 1) {

			if ((drx > (arr[i].x - arr[i].fdx / 2 - xc)) && (drx < (arr[i].x - arr[i].fdx / 2 + xc)) && (dry > (arr[i].y - arr[i].fdx / 2 - yc)) && (dry < (arr[i].y  - arr[i].fdx / 2 + yc))) {
				if (WT > 1) {
					k = i;
					print('FW++');
					FW++
					mySound.play();
					if (mode == 3) {
						WT = WT - (arr[i].fdx - 14);
            print(arr[i].fdx - 14);
					}
				}
			}
		}
		if (k >= 0) {
			arr.splice(k, 1);
			k = -1;
		}

		if (arr.length == 0 && !fl) {
			alert('Ты победил(-а)!');
			clearInterval(timer);
			clearInterval(timer2);
			clearInterval(timer3);
			arr.length = 0;
			fl = 1;
			mode = 0;
      vidLoad2();
      document.getElementById('defaultCanvas0').style.display = 'none';
			print(FW);
		} else if (arr.length > 75 && !fl) {
			alert("Ты проиграл(-а)");
			clearInterval(timer);
			clearInterval(timer2);
			clearInterval(timer3);
			arr.length = 0;
			fl = 1;
			print(FW);
            vid3 = createVideo(['assets/lose_1.webm'])
            vid3.show();
	        document.getElementById('defaultCanvas0').style.display = 'none';
            vidLoad3();
            
		}
	}
}

function keyChange(){
	if (keyIsPressed){
		if (keyIsDown(UP_ARROW)) {
			dry = dry - 15
		}

		if (keyIsDown(DOWN_ARROW)) {
			dry = dry + 1
		}

		if (keyIsDown(LEFT_ARROW)) {
			drx = drx - 15
		}

		if (keyIsDown(RIGHT_ARROW)) {
			drx = drx + 15
		}
	}
}

function ground() {
	if (dry > 563) {
		dry = 563;
	} else if (dry < 0) {
		dry = 20;
	}
}

function gravity() {
	dry = dry + 5;
}

function KP() {
	TMO = 'true';
	timeL--;
	if (timeL == 0) {
		clearInterval(timer);
		clearInterval(timer2);
		clearInterval(timer3);
		arr.length = 0;
		print('TIME OUT!');
		alert('Ты проиграл(-а)');
		mode = 0;
	}
}

function turnLR() {
	if (drx >= 600) {
		drx = 40;
	} else if (drx <= 0) {
		drx = 600
	}
}