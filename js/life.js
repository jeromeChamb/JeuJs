class Life{
    x;
    y;
    l;
    h;
    vitesseX =-10 + Math.random()*20;
    vitesseY =-10 + Math.random()*20;

    constructor(x,y,l,h){
        this.x = x;
        this.y = y;
        this.l = l;
        this.h=h;

    }

    draw(ctx){
        ctx.drawImage(assets.lifeImg,this.x,this.y,this.l,this.h);
    }

    move(){
        this.x += this.vitesseX;
        this.y += this.vitesseY;
        
    }
}

let tableauDeslife =[];

function creerLife(){
    let x = Math.random()*canvas.width;
    let y = unOuZero()*canvas.height;
    let n = Math.random();

    let l = new Life(x,y,69.5+69.5*n,62+62*n);
    tableauDeslife.push(l);
}

function dessinerLesLife(){
    tableauDeslife.forEach((life) =>{
        life.draw(ctx);
        traiteCollisionLifeAvecBords(life);
        life.move();
    });
    tableauDeslife.forEach((life) =>{
    traiteCollisionLife(life);});
}