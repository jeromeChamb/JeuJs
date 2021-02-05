let record = 0;
let niveau = 1;
let vie = 3;


function traiteCollisionAvecBords (){
    if(diable.x > canvas.width - diable.l){
        diable.x = canvas.width - diable.l;
        diable.vitessex = - diable.vitessex;
    }else if (diable.x<0){
        diable.x = 0;
        diable.vitessex = -diable.vitessex;
    }
    if (diable.y <10){
        diable.y = 10;
        diable.vitessey = -diable.vitessey;
    }else if (diable.y + diable.h +10> canvas.height){
        diable.y = canvas.height - diable.h-10;
        diable.vitessey = -diable.vitessey;
    }

}


// Fonctions génériques de collision cercle-cercle, rectangle-rectangle et cercle-rectangle
// pour les curieux, polygone-polygone convexes existe aussi voir algorithme SAT
// (Separation Axis Theorem)
// Collisions between rectangle and circle
// Collisions between aligned rectangles
function circleCollide(x1, y1, r1, x2, y2, r2) {
    var dx = x1 - x2;
    var dy = y1 - y2;
    return dx * dx + dy * dy < (r1 + r2) * (r1 + r2);
  }
  
  function rectsOverlap(x1, y1, w1, h1, x2, y2, w2, h2) {
   
    if ((x1 > (x2 + w2)) || ((x1 + w1) < x2))
       return false; // No horizontal axis projection overlap
    if ((y1 > (y2 + h2)) || ((y1 + h1) < y2))
       return false; // No vertical axis projection overlap
    return true; // If previous tests failed, then both axis projections
                 // overlap and the rectangles intersect
  }
  
  function circRectsOverlap(x0, y0, w0, h0, cx, cy, r) {
     var testX=cx;
     var testY=cy;
     if (testX < x0) testX=x0;
     if (testX > (x0+w0)) testX=(x0+w0);
     if (testY < y0) testY=y0;
     if (testY > (y0+h0)) testY=(y0+h0);
     return (((cx-testX)*(cx-testX)+(cy-testY)*(cy-testY))< r*r);
  }



  function traiteCollisionTasse(tasse){
      if (rectsOverlap(diable.x+70,diable.y,diable.l-140,
        diable.h,tasse.x,tasse.y,tasse.width,tasse.height)){
            let index = characters.indexOf(tasse);
            characters.splice(index, 1);
            assets.pop.play();
            vie--;
        }

  }

  function traiteCollisionGhostAvecBords(b){
    if (b.x + b.l > canvas.width ){
        //console.log("Collision à Droite");
        b.x = canvas.width - b.l;
        b.vitesseX = -b.vitesseX;
    }
    else if (b.x  < 0){
        //console.log("Collision à Gauche");
        b.x =0;
        b.vitesseX = -b.vitesseX;
    }
    
    if (b.y < 0){
        //collision haut
        b.y = 0;
        b.vitesseY = - b.vitesseY;
    }
    else if (b.y + b.h > canvas.height){
        b.y = canvas.height - b.h;
        b.vitesseY = - b.vitesseY;
        
    }
}

function traiteCollisionLifeAvecBords(b){
    if (b.x + b.l > canvas.width ){
        //console.log("Collision à Droite");
        b.x = canvas.width - b.l;
        b.vitesseX = -b.vitesseX;
    }
    else if (b.x  < 0){
        //console.log("Collision à Gauche");
        b.x =0;
        b.vitesseX = -b.vitesseX;
    }
    
    if (b.y < 0){
        //collision haut
        b.y = 0;
        b.vitesseY = - b.vitesseY;
    }
    else if (b.y + b.h > canvas.height){
        b.y = canvas.height - b.h;
        b.vitesseY = - b.vitesseY;
        
    }
}

function traiteCollisionGhost(ghost){
    if (rectsOverlap(diable.x+70,diable.y,diable.l-130,
      diable.h,ghost.x,ghost.y,ghost.l,ghost.h)){
          let index = tableauDesGhost.indexOf(ghost);
          tableauDesGhost.splice(index, 1);
          assets.bruit.play();
          record++;
      }

}

function traiteCollisionLife(life){
    if (rectsOverlap(diable.x+70,diable.y,diable.l-130,
      diable.h,life.x,life.y,life.l,life.h)){
          let index = tableauDeslife.indexOf(life);
          tableauDeslife.splice(index, 1);
          assets.lifeSound.play();
          if (vie <3 ) vie++;
      }

}

function traiteCollisionChercheuse(chercheuse){
    if (rectsOverlap(diable.x+70,diable.y,diable.l-130,
      diable.h,chercheuse.x,chercheuse.y,chercheuse.l,chercheuse.h)){
          let index = tableauDesTassesChercheuse.indexOf(chercheuse);
          tableauDesTassesChercheuse.splice(index, 1);
          assets.pop.play();
          vie--;
      }

}