class TasseChercheurse{
    x=0;
    y=0;
    l;
    h;
    vitesse =2;
    target = {};
    angle = 0;
    constructor(x,y,l,h,vitesse){
        this.x = x;
        this.y = y;
        this.l = l;
        this.h=h;
        this.vitesse=vitesse;
    }

    draw(ctx){
        ctx.save();
        
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.drawImage(assets.fake,0,0,this.l,this.h);
        
        
        ctx.restore();
    }
    setTarget(x, y) {
        this.target.x = x;
        this.target.y = y;
      }
    
      distanceToTarget() {
        let dx = this.target.x - this.x;
        let dy = this.target.y - this.y;
    
        return Math.sqrt(dx * dx + dy * dy);
      }
    
      move() {
        // si aucune cible n'est définie, on ne fait rien
        if (this.target.x === undefined) return;
    
        // on se dirige vers la cible
        // 1 - on calcule l'angle entre la position courante de la balle
        // et la cible
        let dx = this.target.x - this.x;
        let dy = this.target.y - this.y;
        this.angle = Math.atan2(dy, dx);
    
        if (this.distanceToTarget() < 3) return;

        this.x += this.vitesse * Math.cos(this.angle);
        this.y += this.vitesse * Math.sin(this.angle)

      }
}


let tableauDesTassesChercheuse =[];

function creerChercheurse(speed){
    let x = Math.random()*canvas.width;
    let y = unOuZero()*canvas.height;
    let n = Math.random();

    let l = new TasseChercheurse(x,y,192,124.5,speed);
    tableauDesTassesChercheuse.push(l);
}

function dessinerLesChercheuses(){
    tableauDesTassesChercheuse.forEach((tasseChercheuse) =>{
        tasseChercheuse.draw(ctx);
        traiteCollisionLifeAvecBords(tasseChercheuse);
        tasseChercheuse.move();
    });
    tableauDesTassesChercheuse.forEach((tasseChercheuse) =>{
    traiteCollisionChercheuse(tasseChercheuse);});
}