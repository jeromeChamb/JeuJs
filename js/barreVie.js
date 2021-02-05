//load images
const imagesBarreVie = {};
imagesBarreVie.player = new Image();
imagesBarreVie.player.src = '../assets/image/barreVie.png';

let vies = [];

class barreVie{
    constructor(){
        this.width = 123.5;
        this.height = 201;
        this.frameX = 4;
        this.frameY = 0;
        this.x =500;
        this.y =500;
    }
    draw(){
        drawSprite(imagesBarreVie.player, this.width*this.frameX,this.height*this.frameY,
            this.width, this.height,this.x,this.y,this.width,this.height);
           
        //animate sprite   
        if (this.frameX <4){
            this.frameX++;
        }else{this.frameX=0;}
    }
}

let barre = new barreVie();
function animateVie(){
    barre.draw();
}


