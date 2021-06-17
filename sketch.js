var dog, happyDog;
var database;
var foodS, foodStock;
var dogImg, dogHappyImg;

function preload(){
dogImg = loadImage("Dog.png");
dogHappyImg = loadImage("happydog.png");
}

function setup() {
  database = firebase.database();
	createCanvas(500, 500);

  dog = createSprite(250,250,10,10);
  dog.addImage(dogImg)
  dog.scale = 0.15

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  foodStock.set(20);
  
}

function draw() {
  background("green");

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogHappyImg);

  }

  if(foodS == 0){
    dog.addImage(dogImg);
    foodS = 20;

  }

  drawSprites();
  textSize(17);
  fill("black");
  stroke("red");
  text("Note: Press UP_ARROW Key To Feed Lucky",78,50);
  fill("black");
  stroke("red");
  text("Milk Bottles Remaining: "+foodS,150,440);

}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){

  if(x<=0){
    x = 0;
  }
  else{
    x=x-1
  }

  database.ref('/').update({
    Food:x
  })
}



