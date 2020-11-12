var PLAY=1;
var END=0;
var gameState=1;

var sword, swordImage;

var fruit, fruitImage;
var monster, monsterImage;
var fruitGroup, fruit1, fruit2, fruit3, fruit4;

var monsterGroup, alien1, alien2;

var gameOver;

var score;

var KnifeSwooshSound, gameOverSound;
 

function preload(){
  swordImage = loadImage("sword.png");
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  
  monsterImage = loadImage("alien1.png");
  monsterImage = loadImage("alien2.png");
  
  gameOver = loadImage("gameover.png");
  
  KnifeSwooshSound = loadSound("knifeSwooshSound.mp3");
  gameOverSound = loadSound("gameover.mp3");
 
}

function setup(){
  createCanvas(600,600);
  
  sword = createSprite(40,200,20,20);
  sword.addImage(swordImage);
  sword.scale = 0.5;
  
  sword.setCollider("rectangle", 0, 0, 40, 40);
  
  
  
  
  score = 0;
  fruitGroup = createGroup();
  enemyGroup = createGroup();
  
}


function draw(){
  background("lightblue");
  
   text("Score: "+ score, 500,50);
  
  

  if (gameState === PLAY){
    
    
  sword.y = World.mouseY;
  sword.x = World.mouseX;
     
  if(fruitGroup.isTouching(sword)){
    fruitGroup.destroyEach();
    KnifeSwooshSound.play();
    score = score + 2;
  }
    if(sword.isTouching(enemyGroup)){
       sword.addImage(gameOver);
       sword.x = 200;
       sword.y = 200;
    gameOverSound.play();
      
      gameState = END;
      
    }
 
  }
  
  if (gameState === END){
    
    fruitGroup.setVelocityXEach(0);
    enemyGroup.setVelocityXEach(0);
    
    fruitGroup.setLifetimeEach(-1);
    enemyGroup.setLifetimeEach(-1);
    
    
     
  
     
  
  }
    fruit();
    Enemy();
  
  
  
  
  
  
  drawSprites();

}

function fruit(){
  if(World.frameCount%80===0){
    var fruit = createSprite(600,200,20,20);
    fruit.scale = 0.2;
    fruit.debug = false;
    r = Math.round(random(1,4));
    if (r == 1){
      fruit.addImage(fruit1);
    }else if (r == 2){
      fruit.addImage(fruit2);
    }else if (r == 3){
      fruit.addImage(fruit3);
    }else{
      fruit.addImage(fruit4);
    }

    fruit.y = Math.round(random(50,340));
    
    fruit.velocityX = -7;
    fruit.setLifetime = 100;
    
    fruitGroup.add(fruit);
  }
}
    
function Enemy(){
  if(World.frameCount % 200 === 0){
    monster = createSprite(600,200,20,20);
    monster.addAnimation("moving", monsterImage);
    monster.y = Math.round(random(100,300));
    monster.velocityX = -8;
    monster.setLifetime = 50;
    
    enemyGroup.add(monster);
  }
}
  
 