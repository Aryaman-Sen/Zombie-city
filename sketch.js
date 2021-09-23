var bg,bgImg;

var shooter,shooterImg,shooterImg2,shooterImg3
var zombie1, zombie2,zombie3,zombie4;
var zombie1I, zombie2I,zombie3I,zombie4I,player_zom

var bullet,bulletImg;
var alert,alertImg;


var barricade,barricadeImg;
var heart1,heart2,heart3,heart1Img,heart2Img,heart3Img;

var score = 0;
var life= 3;
var bullets = 80;

var gameState= "fight";


var zombieGroup;

function preload(){
  bgImg=loadImage("assets/zombiebg.jpg");
  shooterImg=loadImage("assets/shooter_1.png");
  shooterImg2=loadImage("assets/shooter_2.png");
  shooterImg3=loadImage("assets/shooter_3.png");
  zombie1I=loadImage("assets/zombie.png");
  zombie2I=loadImage("assets/zombie2.png");
  zombie3I=loadImage("assets/zombie3.png");
  zombie4I=loadImage("assets/zommbie1.png");
  alertImg=loadImage("assets/zombiealert.png");
  barricadeImg=loadImage("assets/barricade.png");
  bulletImg=loadImage("assets/bullet.png");
  heart1Img=loadImage("assets/heart_1.png");
  heart2Img=loadImage("assets/heart_2.png");
  heart3Img=loadImage("assets/heart_3.png");
player_zom=loadImage("assets/funnyzombie.png");
  lose = loadSound("assets/lose.mp3");
  winning = loadSound("assets/win.mp3");
  explosionSound = loadSound("assets/explosion.mp3");
}


function setup() {

  createCanvas(windowWidth,windowHeight);
  createSprite(400, 200, 50, 50);

  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20);
  bg.addImage(bgImg);
  bg.scale = 2.5;

  shooter = createSprite(displayWidth+300, displayHeight-300, 50, 50);
  shooter.addImage(shooterImg);
  shooter.scale = 0.4
  shooter.debug = false
  shooter.setCollider("rectangle",0,0,300,300);

      heart1 = createSprite(displayWidth-150,40,20,20)
      heart1.visible = false
      heart1.addImage("heart1",heart1Img)
      heart1.scale = 0.4

      heart2 = createSprite(displayWidth-100,40,20,20)
      heart2.visible = false
      heart2.addImage("heart2",heart2Img)
      heart2.scale = 0.4

      heart3 = createSprite(displayWidth-150,40,20,20)
      heart3.addImage("heart3",heart3Img)
      heart3.scale = 0.4
   
      zombieGroup = new Group();
      bulletGroup = new Group();



}

function draw() {
  background(0);  


  if (gameState === "fight"){
    if(life===3){
      heart3.visible = true
      heart1.visible = false
      heart2.visible = false
    }
    if(life===2){
      heart2.visible = true
      heart1.visible = false
      heart3.visible = false
    }
    if(life===1){
      heart1.visible = true
      heart3.visible = false
      heart2.visible = false
    }
  }

  if(keyDown ("UP_ARROW")){
  shooter.y= shooter.y-20;
  }

  if(keyDown ("DOWN_ARROW")){
    shooter.y= shooter.y+20;
  }
  
  if(keyWentDown("SPACE")){
    shooter.addImage(shooterImg3)
    if(keyWentDown("space")){
      bullet = createSprite(displayWidth-10,shooter.y-30,20,10);
      bullet.velocityX = -100

      

      bulletGroup.add(bullet)
     bullet.addImage(bulletImg);
     bullet.scale=0.2;
      shooter.depth = bullet.depth
      shooter.depth = shooter.depth+2
      shooter.addImage(shooterImg3)
      bullets = bullets-1
      //explosionSound.play();
    }
  }else if (keyWentUp("SPACE")){
    shooter.addImage(shooterImg2);
  }

  if(zombieGroup.isTouching(bulletGroup)){
    for(var i=0;i<zombieGroup.length;i++){     
        
     if(zombieGroup[i].isTouching(bulletGroup)){
          zombieGroup[i].destroy()
          bulletGroup.destroyEach()
          explosionSound.play();
   
          score = score+2
          } 
    
    }
  }

  if(life === 0){
    gameState = "lost";
  }

  if(score==100){
    gameState = "won"
    winning.play(false);
  }
  if(bullets==0){
    gameState="bullet";
    lose.play(false);
  }

  if(zombieGroup.isTouching(shooter)){
 
    lose.play();
  
 
  for(var i=0;i<zombieGroup.length;i++){     
       
   if(zombieGroup[i].isTouching(shooter)){
        zombieGroup[i].destroy()
       
       life=life-1
        } 
  
  }
 }

 drawSprites();

 if(gameState == "lost"){
  
  textSize(100)
  fill("red")
  text("You Lost ",400,400)
  zombieGroup.destroyEach();
  shooter.addImage(player_zom);
  shooter.scale=1;
  //player.destroy();

}else if(gameState == "won"){
 
  textSize(100)
  fill("yellow")
  text("You Won ",400,400)
  zombieGroup.destroyEachX();
  shooter.destroy();

}


else if(gameState == "bullet"){
 
  textSize(50)
  fill("yellow")
  text("You ran out of bullets!!!",470,410)
  zombieGroup.destroyEachX();
  shooter.destroy();
  bulletGroup.destroyEachX();

}


  spawnZombies();
    drawSprites();
    textSize(30);
fill("white");
text("Bullets = " + bullets,displayWidth-210,displayHeight/2-150)
text("Score = " + score,displayWidth-200,displayHeight/2-220)
text("Lives = " + life,displayWidth-200,displayHeight/2-180)

}

function spawnZombies(){
  if(frameCount%50===0){

    //giving random x and y positions for zombie to appear
    zombie = createSprite(random(50,200),random(50,500),40,40)

    var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: zombie.addImage(zombie1I);
      zombie.scale=0.2
              break;
      case 2: zombie.addImage(zombie2I);
      zombie.scale=0.6
              break;
      case 3:  zombie.addImage(zombie3I);
      zombie.scale=0.6
              break;
      case 4:  zombie.addImage(zombie4I);
      zombie.scale=0.3
              break;
       default: break;
    }
    
    zombie.velocityX = +3
    //zombie.debug= true
    //zombie.setCollider("rectangle",0,0,400,400)
   
    zombie.lifetime = 500
   zombieGroup.add(zombie)
  }

}
