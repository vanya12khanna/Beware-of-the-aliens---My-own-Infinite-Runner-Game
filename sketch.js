var PLAY = 1;
var END = 0;
var gameState = PLAY;

var spaceShuttleBoy, spaceShuttleBoyImage;
var score;
var background_Image, galaxyLandBackground;

var obstacle1, obstacle4;
var obstaclesGroup;
var gameOverImg,restartImg;

function preload(){
  spaceShuttleBoyImage = loadImage("spaceShuttleBoy.png");
  background_Image = loadImage("galaxyLandBackground.png");
  obstacle1 = loadImage("obstacle1.png");
  obstacle4 = loadImage("obstacle4.png");
  restartImg = loadImage("restart.png");
  gameOverImg = loadImage("gameOver.png");  
}

function setup() {
    createCanvas(800,400)
  
  spaceShuttleBoy = createSprite(80,350,20,20);
  spaceShuttleBoy.addImage(spaceShuttleBoyImage);
  spaceShuttleBoy.scale = 0.25;

  ground = createSprite(400,350,900,10);
  ground.velocityX = -4;
  ground.scale = 1.4;
  ground.x = ground.width/2;
  ground.visible = false;
  
  background = createSprite(0,270,800,300);
  background.scale = 2;
  background.velocityX = -4;
  background.addImage(background_Image);
  background.x = background.width/2;
  
  obstaclesGroup = createGroup();
  
  gameOver = createSprite(400,200);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.2;
  
  restart = createSprite(400,270);
  restart.addImage(restartImg);
  restart.scale = 0.3;
  
  score=0;
 
}

function draw() {
  
    score = score + Math.round(getFrameRate()/60);
  
  if(gameState === PLAY){
      gameOver.visible = false;
      restart.visible = false;
      obstacle1.visible = true;
      obstacle4.visible = true;

      background.velocityX = -4;
   
  background.velocityX = -(4 + 3* score/100) 
  score = score + Math.round(getFrameRate()/60);
    
       if (ground.x < 0){
          ground.x = ground.width/2;
       }

       if (background.x < 0){
          background.x = background.width/2;
       }

       if (keyDown("space")&&spaceShuttleBoy.y>=200){
        spaceShuttleBoy.velocityY = -20;
       }

       if(obstaclesGroup.isTouching(spaceShuttleBoy)){
       gameState = END;
       } 

  } else if (gameState === END) {
      gameOver.visible = true;
      restart.visible = true;
      score=0;
      ground.velocityX = 0;
      background.velocityX = 0;
      obstacle1.visible = false;
      obstacle4.visible = false;

      obstaclesGroup.destroyEach();
      obstaclesGroup.setVelocityXEach(0);
      obstaclesGroup.setLifetimeEach(-1);
  }
  
  spaceShuttleBoy.velocityY = spaceShuttleBoy.velocityY + 0.9;
  spaceShuttleBoy.collide(ground);
  
  spaceShuttleBoy.depth = background.depth;
  spaceShuttleBoy.depth = spaceShuttleBoy.depth+1;
  
//  spaceShuttleBoy.depth = background.depth;
//  spaceShuttleBoy.depth = score.depth+1;
  
   
     if(mousePressedOver(restart)) {
      reset();
     }
  
  spawnObstacles()
  drawSprites();
  fill("white");
  textSize(20); 
  text("Score: "+ score,650,50);
}

function reset(){
  score=0;
  gameOver.visible = false;
  restart.visible = false
  gameState = PLAY;
  obstaclesGroup.destroyEach();
}

function  spawnObstacles(){
   if (frameCount % 60 === 0){
   var obstacle = createSprite(600,315,10,10);
     
      obstacle.velocityX = -9
     
    //generate random obstacles
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle4);
              break;
    
      default: break;
    }
   
              
    obstacle.lifetime = 300;
    obstacle.scale = 0.2;
   
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  
}
}