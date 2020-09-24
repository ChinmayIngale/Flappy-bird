var canvas;
let bg;
let base;
let col = 10;
var w = window.innerWidth;
var h = window.innerHeight-10; 
let start = false;
let play = false;
let loadgame = false;
let highscore = 0;
let birdimg=[];
let pipeup;
let pipedown;
let Pipe = [];
let score = 0;
let time = true;//day time
var timecounter = 0;
let playb;
let pauseb;
let fsb;
let flyb;
let music;
let hit;
let wing;
let muteb;
let unmuteb;
var sound = true;

function preload(){
  bgnight = loadImage('images/background-night.png');
  bgday = loadImage('images/background-day.png');
  base = loadImage('images/base.png');
  pipeup = loadImage('images/pipeup.png');
  pipedown = loadImage('images/pipedown.png');
  for( var i =0; i <4; i++){
    birdimg[i] = loadImage('images/bird'+i+'.png');
  }
  playb = createImg('images/play.png','play');
  pauseb = createImg('images/pause.png', 'pause');
  fsb = createImg('images/fullscreen.png', 'fullscreen');
  muteb = createImg('images/mute.png', 'mute');
  unmuteb = createImg('images/unmute.png', 'unmute');
  flyb = createImg('images/fly.png', 'Click to fly');
  base = loadImage('images/base.png');
  music =loadSound('sounds/music.mp3')
  hit =loadSound('sounds/hit.mp3')
  wing =loadSound('sounds/wing.mp3')

}


function gameover(){
  //createDiv("<button>replay</button>").addClass("gameover").show();
  var replay = select(".gameover");
  replay.show();
  if(Pipe.length > highscore){
    highscore = Pipe.length;
  }
  var el = select("#score");
  el.html(score);
  play = false;
}

function setup() {
  canvas = createCanvas(w,h);
  canvas.parent('game');
  $("#loading").hide();
  $('#show').css('display', 'inline-block');
  createNewGame();
}
function createNewGame(){
  Bird = new bird();
  Pipe.push(new pipes());
  if(time){
    background(51, 165, 255);
    for (var x = 0; x < col; x++){
      image (bgday, x*bgday.width, height-bgday.height);
    }
  }else{
    background(51, 55, 108);
    for (var x = 0; x < col; x++){
      image (bgnight, x*bgnight.width, height-bgnight.height);
    }
  }
  Bird.show();
  for (var x = 0; x < col; x++){
    image (base, x*base.width, height-base.height);
  }
  start = false;
  loop();
  var replay = select(".gameover");
  replay.hide();
  play = true;
  timecounter = 0;
  Pipe.splice(0, Pipe.length);
}

function draw() {
  if(sound && !music.isPlaying()){
    music.play();
  }
  if(time){
    background(51, 165, 255);
    for (var x = 0; x < col; x++){
      image (bgday, x*bgday.width, height-bgday.height);
    }
  }else{
    background(51, 55, 108);
    for (var x = 0; x < col; x++){
      image (bgnight, x*bgnight.width, height-bgnight.height);
    }
  }
  Bird.show();
  

  if(start){
    Bird.fall();
    for( var i =Pipe.length-1; i >= 0; i--){
      Pipe[i].move();

      if(Pipe[i].checkgame(Bird)){
        gameover();
        music.stop();
        if(sound){
          hit.play();
        }
        noLoop();
        play = false;
      }
    }
    
    if (frameCount % 100 == 5) {
      Pipe.push(new pipes());

    }
  

    for( var i =Pipe.length-1; i >= 0; i--){
      Pipe[i].show();
    }
    scorefun();
    
    
  }
  else{
    textSize(60);
    textFont('Helvetica');
    fill(0);
    textStyle(BOLD);
    textAlign(CENTER);
    text("Press 'Space' or 'Arrow Up' key to fly", 0, height-250, width);
     noLoop(); 
  }
  for (var x = 0; x < col; x++){
    image (base, x*base.width, height-base.height);
  }
  textSize(40);
  textFont('Helvetica');
  fill(0);
  textStyle(BOLD);
  text("Highscore:"+highscore,200,height-50);
  setButtons()
  timecounter++;
  if(timecounter % 2000 == 0){
    if(time){
      time = false;
      timecounter = 0;
    }else{
      time= true;
      timecounter = 0;
    }
  }
}


let setButtons = function(){
  playb.position((width/2)-80,height-80);
  playb.size(60,60);
  playb.mousePressed(playgame);

  pauseb.position((width/2)+20,height-80);
  pauseb.size(60,60);
  pauseb.mousePressed(pausegame)

  flyb.position(width-140,height-80);
  flyb.size(120,60);
  flyb.mousePressed(flybird);

  fsb.position(width-70,10);
  fsb.size(60,60);
  fsb.mousePressed(fs)

  muteb.position(width-70,80);
  muteb.size(60,60);
  muteb.mousePressed(mutef);

  unmuteb.position(width-70,150);
  unmuteb.size(60,60);
  unmuteb.mousePressed(unmutef);

 
}

let scorefun = function() {
  textSize(40);
  textFont('Helvetica');
  fill(0);
  textStyle(BOLD);
  score = Pipe.length;
  text("Score:"+score,100,50);
}

function keyPressed(){
  if (key == ' ' || key =='ArrowUp'){
    flybird();
  }
}
function flybird(){
  if(play && loadgame) {
    if(sound){
      wing.play();
    }
    Bird.fly();
    start = true;
    loop();
}
}

window.onresize = function() {
    w = window.innerWidth;
    h = window.innerHeight;  
    if(h < 600){
      h = 600;
    }
    if(w < 1000){
      w = 1000;
    }
    resizeCanvas(w,h);
}

function playgame(){
  loop();
}
function pausegame(){
  noLoop();
}
function fs(){
  fullscreen(canvas);
}

function mutef(){
  music.stop();
  sound = false;
}

function unmutef(){
  if(!music.isPlaying()){
  music.play();
  }
  sound = true;
}