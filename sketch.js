var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkey_running, sadMonkey;
var banana ,bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup;
var bananaScore;
var ground, groundImage, invisibleGround;
var gameOverImage,restartImage;
var jumpSound , checkPointSound, dieSound;
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  groundImage = loadImage("Background png.jpg");
   restartImage = loadImage("restart.png");
  gameOverImage = loadImage("gameOver.png");
  sadMonkey = loadAnimation("sprite_8.png");
}



function setup() {
  createCanvas(600,400);
  
ground = createSprite(100,100,600,600);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.scale = 4.5;
  
  monkey = createSprite(50,340,20,50);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;
  monkey.addAnimation("sad monkey",sadMonkey)
  gameOver = createSprite(300,200);
  gameOver.addImage(gameOverImage);

  
  restart = createSprite(300,240);
  restart.addImage(restartImage);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;
  invisibleGround = createSprite(300,360,600,10);
  invisibleGround.visible = false;
  
   obstaclesGroup = createGroup();
  bananaGroup = createGroup();
  
  score = 0;
}


function draw() {
  
if(gameState === PLAY){

   gameOver.visible = false;
    restart.visible = false;
    
    ground.velocityX = -(6 + 3*score/100);
  
    
    
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
     text("Score: "+ score, 500,50);
  textSize(30);
    //jump when the space key is pressed
    if(keyDown("space")&&monkey.y>320) {
        monkey.velocityY = -14;
    }
    
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.5
  
    //spawn the bananas
    spawnBananas();
  if(monkey.isTouching(bananaGroup)){
   bananaScore=score+1
  }
    //spawn obstacles on the ground
   spawnObstacles();
    
    if(obstaclesGroup.isTouching(monkey)){
        monkey.velocityY = -12;
        gameState = END;
      
      
    }
}
   if (gameState === END) {
      gameOver.visible = true;
      restart.visible = true;
    monkey.changeAnimation("sad monkey", sadMonkey);
   
    
      if(mousePressedOver(restart)) {
      reset();
      }
      ground.velocityX = 0;
      monkey.velocityY = 0;
     
     obstaclesGroup.setLifetimeEach(-1);
   bananaGroup.setLifetimeEach(-1);
      obstaclesGroup.setVelocityXEach(0);
     bananaGroup.setVelocityXEach(0);    
   
   } 

  monkey.collide(invisibleGround);

  drawSprites();

}
function reset(){
 gameState = PLAY; 
gameOver.visible = false;
  restart.visible = false;
  obstaclesGroup.destroyEach();
  bananaGroup.destroyEach();
  monkey.changeAnimation("running", monkey_running);
  score=0;
}
function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(600,340,10,40);
   obstacle.velocityX = -6;
   obstacle.scale=0.2
   obstacle.addImage(obstacleImage);
   obstaclesGroup.add(obstacle);
 }
}
function spawnBananas(){
  if (frameCount % 80 === 0) {

    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(200,320));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //add each cloud to the group
    bananaGroup.add(banana);
  }


}
