let diable = {
    x:100,
    y:100,
    l:180,
    h:112,
    vitessex:0,
    vitessey:0,
    draw: function (ctx){
        
        ctx.drawImage(assets.diableImg,this.x,this.y,this.l,this.h);
    },
    setPos: function (x,y){
    this.x = x-this.l/2;
    this.y = y-this.h/2;
    },
    move: function (){
    this.x += this.vitessex;
    this.y += this.vitessey;
    this.vitessex=0;
    this.vitessey=0;
    }
};