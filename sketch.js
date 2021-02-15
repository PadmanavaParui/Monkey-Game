//global variable declaration
var PLAY = 0;
var END = 1;
var gameState = PLAY;
var monkey , monkey_running, monkey_collided;
var ground;
var banana ,bananaImage;
var obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score, lives;
var gameOver, restart;
var gameOverImage, restartImage;

//the preload function
function preload(){
  //loading the monkey animation
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  //loading the banana image
  bananaImage = loadImage("banana.png");
  
  //loading the obstacles image
  obstacleImage = loadImage("obstacle.png");
  
  //loading the monkey collided image
  monkey_collided = loadImage("sprite_0.png");
  
  //loading the gameOver image
  gameOverImage = loadImage("gameOver.png");
  
  //loading the restart image
  restartImage = loadImage("restart.png");
}

//the function setup
function setup() {
  //creating the canvas
  createCanvas(600, 600);
  
  //creating the ground
  ground = createSprite(300, 590, 1200, 20);
  ground.shapeColor="brown";
  ground.velocityX=-4;
  ground.x = ground.width/2; 

  //making the monkey
  monkey = createSprite(50, 570, 20, 40);
  monkey.addAnimation("running", monkey_running);
  monkey.addAnimation("collided", monkey_collided);
  
  //scaling the monkey animation
  monkey.scale = 0.1;
  
  //initializing the score to zero
  score = 0;
  
  //initializing the lives to 3
  lives = 3;
  
  //the gameOver sprite
  gameOver = createSprite(300 ,300, 50, 50);
  gameOver.addImage(gameOverImage);
  
  //the restart sprite
  restart = createSprite(300, 350, 50, 50);
  restart.addImage(restartImage);
  restart.scale = 0.5;
  
  //creating the groups
  obstacleGroup = createGroup();
  foodGroup = createGroup();
}

//the draw function
function draw(){
  //clearing the screen and giving a background colour
  background("white");
  
  //what will happen if the gamestate is play
  if(gameState === PLAY) {
    //making the restart sprite visibility false
    restart.visible = false;
    
    //making the gameOver sprite visibility false
    gameOver.visible = false;
    
    //changing the monkey animation
    monkey.changeAnimation("running", monkey_running);
  
    //making the moneky touch the ground
    monkey.collide(ground);
  
    //making the ground infinite
    if(ground.x < 0) {
      ground.x = ground.width/2;
    }
  
    //making the monkey jump
    if(keyDown("space") && monkey.y > 525) {
      monkey.velocityY = -8;
    }
  
    //adding gravity to the monkey
    monkey.velocityY = monkey.velocityY + 0.8;
  
    //survival time
    score = score + Math.round(getFrameRate()/60);
  
    //the spawn fruit
    spawnFruits();
  
    //the spawn obstacles
    spawnObstacles();
    
    //reducing the number of lives
    if(monkey.isTouching(obstacleGroup)) {
      obstacleGroup.destroyEach();
      lives-=1;
    }
    
    //changing the gamestate to end
    if(lives == 0) {
      gameState = END
    }
  }
  
  //what will happen if the gamestate is END
  if(gameState === END) {
    //making the restart sprite visibility true
    restart.visible = true;
    
    //making the gameOver sprite visibility true
    gameOver.visible = true;
    
    //changing the monkey animation
    monkey.changeAnimation("collided", monkey_collided);
    
    //setting the monkey velocity to zero
    monkey.velocityY = 0;
    
    //setting the ground velocity to zero
    ground.velocityX = 0;
    
    //setting the obstacles velocity to zero
    obstacleGroup.setVelocityXEach = 0;
    
    //setting the food velocity to zero
    foodGroup.setVelocityXEach = 0;
    
    //destroying the obstacles
    obstacleGroup.destroyEach();
    
    //destroying the foods
    foodGroup.destroyEach();
    
    //restarting the game
    if(mousePressedOver(restart)) {
      //the restart function
      restartFunc();
    }
  }
  
  
  //displaying the survival time or score
  fill("black");
  textSize(20);
  text("Survival Time: " + score, 250, 50);
  
  //displaying the lives
  fill("red");
  text("lives: " + lives, 450, 50);
  
  //displaying the sprites
  drawSprites();
}

//spawnning the fruits
function spawnFruits() {
  //spawnning the fruits after 80 frames
  if(frameCount % 80 == 0) {
    //creating the banana sprites
    banana = createSprite(600, (Math.round(random(490,550))), 50, 50);
    
    //adding the banana image
    banana.addImage(bananaImage);
    
    //scaling the banana image
    banana.scale = 0.1;
    
    //setting the banana velocity
    banana.velocityX = -8;
    
    //giving lifetime to the bananas
    banana.lifetime = 75;
    
    //adding the bananas to the food group
    foodGroup.add(banana);
  }
}

//spawning the obstacles
function spawnObstacles() {
  //spawnning the obstacles after 300 frameCount
  if(frameCount % 300 == 0) {
    //creating the obstacle sprites
    obstacle = createSprite(600, 570, 50, 50);
    
    //adding image to the obstacles
    obstacle.addImage(obstacleImage);
    
    //scaling the obstacle image
    obstacle.scale = 0.1;
    
    //giving the obstacles a velocity
    obstacle.velocityX = -6;
    
    //giving the obstacles lifetime
    obstacle.lifetime = 100;
    
    //adding the obstacle to the obstacles group
    obstacleGroup.add(obstacle);
  }
}

//the restart function
function restartFunc() {
  //setting the score to zero
  score = 0;
  
  //setting the number of lives to zero
  lives = 3;
  
  //changing the gameState to play state
  gameState = PLAY;
}