

var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var survivalTime

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(500, 500);
  monkey=createSprite(100, 480, 300, 300);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale=0.1;
 
  ground=createSprite(300, 480, 1200, 10);
  ground.velocityX=-5;
  ground.x = ground.width/2;

  FoodGroup=new Group();
  obstacleGroup=new Group();
}


function draw() {
  
   spawnbanana();
  
  spawnobstacle();
  
background("green");
  
  console.log(monkey.y);
  
  monkey.collide(ground);
  
  stroke("white");
  textSize(20);
  fill("white");
  text("score:"+score,500,50);
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate())
  text("Survival Time: "+ survivalTime, 100,50);
  
  

  if(keyDown("space") && monkey.y<=444.8){
    monkey.velocityY=-10;
  }
   
    monkey.velocityY=monkey.velocityY+1;

  if(ground.x<0){
     ground.x = ground.width/2;
  }
  
  if(obstacleGroup.isTouching(monkey)){
    ground.velocityX=0;
    monkey.velocityY=0;
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
  }
  
  drawSprites();
  
}

function spawnbanana(){
  if(frameCount%80===0){
  banana=createSprite(500, Math.round(random(120, 200 )), 30, 30);
  banana.addImage(bananaImage);
  banana.scale=0.1;
  banana.velocityX=-8;
  banana.lifetime= 65 ; 
  monkey.depth = banana.depth + 1;
  FoodGroup .add(banana);  
}
}

function spawnobstacle(){
  if(frameCount%300===0){
  obstacle=createSprite(500, 460, 20, 20);
  obstacle.addImage(obstacleImage);
  obstacle.scale=0.1;
  obstacle.velocityX=-8;
  obstacle.lifetime= 65; 
  obstacleGroup.add(obstacle);  
}
}