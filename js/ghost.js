class Ghost{
    x;
    y;
    l;
    h;
    vitesseX =0;
    vitesseY =0;

    constructor(x,y,l,h,vitesseX,vitesseY){
        this.x = x;
        this.y = y;
        this.l = l;
        this.h=h;
        if (vitesseX) this.vitesseX = vitesseX;
        if (vitesseY) this.vitesseY = vitesseY;

    }

    draw(ctx){
        ctx.drawImage(assets.ghost,this.x,this.y,this.l,this.h);
    }

    move(){
        this.x += this.vitesseX;
        this.y += this.vitesseY;
        
    }
}

let tableauDesGhost =[];


function creerDesGhost(nb){

    for (let i=0; i < nb; i++){

        let x = Math.random()*canvas.width;
        let y = unOuZero()*canvas.height;

        let vx = -5 + Math.random()*10;
        let vy =  -5 + Math.random()*10;

        let n = Math.random();
        let g = new Ghost(x,y,67.5+67.5*n,105+105*n,vx,vy);

        
        tableauDesGhost.push(g);
    }

}

function dessinerLesGhost(){
    tableauDesGhost.forEach((ghost) =>{
        ghost.draw(ctx);
        traiteCollisionGhostAvecBords(ghost);
        ghost.move();
    });
    tableauDesGhost.forEach((ghost) =>{
    traiteCollisionGhost(ghost);});
}

function rafraichirGosht(){
    tableauDesGhost = [];
}