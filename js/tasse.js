//load images
const images = {};
images.player = new Image();
images.player.src = '../assets/image/tasse.png';
const characterAction =['up', 'top right', 'right', 'down right',
'down'];
let characters = [];

function unOuZero(){
    let i =Math.random();
    if(i<0.5) return 0;
    else return 1;
}

class Character {
    constructor(){
        this.width = 103.0625;
        this.height = 113.125;
        this.frameX = 3;
        this.x =Math.random()*canvas.width;
        this.y = unOuZero()*canvas.height;
        this.speed = (Math.random()*3.5)+1.5;
        this.action = characterAction[Math.floor(Math.random()*characterAction.length)];
        if (this.action === 'up'){
            this.frameY = 0;
            this.maxFame = 15;
            this.minFrame = 4;
        }else if (this.action === 'down') {
            this.frameY = 6;
            this.maxFame = 12;
            this.minFrame = 0;
        }else if (this.action === 'right'){
            this.frameY = 3;
            this.maxFame = 13;
            this.minFrame = 3;
        }else if (this.action === 'jump'){
            this.frameY = 7;
            this.maxFame =9 ;
            this.minFrame =0 ;
        }else if (this.action === 'down right'){
            this.frameY = 4;
            this.maxFame =15 ;
            this.minFrame =4 ;
        }else if (this.action === 'top right') {
            this.frameY = 1;
            this.maxFame =14 ;
            this.minFrame =4 ;
        }
    }

    draw(){
        drawSprite(images.player, this.width*this.frameX,this.height*this.frameY,
            this.width, this.height,this.x,this.y,this.width,this.height);
           
        //animate sprite   
        if (this.frameX < this.maxFame){
            this.frameX++;
        } 
        else this.frameX = this.minFrame;
    }
    update(){
        if (this.action === 'right'){
            //move player 
            if (this.x > canvas.width+this.width) {
                this.x = 0 - this.width;
                this.y = Math.random()*(canvas.height - this.height);
            }
            else {
                this.x +=this.speed;
                
            }
        }else if (this.action === 'up'){
            if(this.y < (0-this.height)){
                this.y = canvas.height + this.height;
                this.x = Math.random()*canvas.width;
            }else{
                this.y -= this.speed;
            }
        }else if (this.action === 'down right'){
            if(this.y > (canvas.height+this.height) 
                && this.x > (canvas.width+this.width)){
                this.y = 0 - this.height;
                this.x = Math.random()*canvas.width;
            }else{
                this.x += this.speed;
                this.y += this.speed;
            }
        }else if(this.action === 'down') {
            if (this.y > canvas.height + (this.height * 5)) {
                this.y = 0 - this.height;
                this.x = Math.random() * canvas.width;
                this.speed = (Math.random() * 2) + 3;
            } else {
                this.y += this.speed;  
            }
        }else if (this.action === 'top right') {
            if (this.y < 0 - this.height && this.x > canvas.width + this.width) {
                this.y = canvas.height + this.height
                this.x = Math.random() * canvas.width;
                this.speed = (Math.random() * 2) + 3;
            } else {
                this.y -= this.speed; 
                this.x += this.speed; 
            }
        }
        
    }
}


function drawSprite(img, sX, sY, sW, sH, dX, dY,dW,dH){
    ctx.drawImage(img, sX, sY, sW, sH, dX, dY,dW,dH);
}

function animate(){
    for (i = 0; i<characters.length;i++){
        traiteCollisionTasse(characters[i]);
    }
    for (i = 0; i<characters.length;i++){
        characters[i].draw();
        characters[i].update();
    }
}


function start(nb){
    characters = [];
    const numberOfCharacters = nb;
    for (i=0; i < numberOfCharacters; i++){
        characters.push(new Character());
    }
}