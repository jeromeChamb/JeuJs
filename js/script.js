window.onload = init;
let canvas
let ctx
let game = true;
let assets;
let etatJeu = "MenuPrincipal";
let musiqueCourante;

function init() {
  
    loadAssets(startGame);
  }
  
  function startGame(assetsLoaded) {  
    assets = assetsLoaded;
    console.log("Page Chargée ! DOM ready ! Toutes les ressources de la page sont utilisables.");

    // On récupère grace à la selector API un pointeur dans le canvas
    canvas = document.querySelector("#myCanvas");
    
    //Listener
    canvas.onmousedown = traiteMouseDown;
    canvas.onmouseup = traiteMouseUp;
    canvas.onmousemove = traiteMouseMove;
    document.onkeydown = traiteKeyDown;
    document.onkeyup = traiteKeyUp;

    ctx = canvas.getContext("2d");

    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    
    changeMusique(assets.home);
    creerDesGhost(5);
    start(2);
    requestAnimationFrame(animationLoop);
   
  }

function afficheInfoJeu() {
    
    ctx.save();
    ctx.font = "40px Verdana";
    ctx.textBaseline = 'middle';
    ctx.textAlign = "left";
    ctx.fillText('Record: '+record, 20, 30);
    ctx.fillText('Niveau: '+niveau, 20, 80);
    if(vie==3){
        ctx.drawImage(assets.vieImg,canvas.width-50,20,48.4,46);
        ctx.drawImage(assets.vieImg,canvas.width-100,20,48.4,46);
        ctx.drawImage(assets.vieImg,canvas.width-150,20,48.4,46);
    }else if(vie == 2){
        ctx.drawImage(assets.vieImg,canvas.width-50,20,48.4,46);
        ctx.drawImage(assets.vieImg,canvas.width-100,20,48.4,46);
        ctx.drawImage(assets.deadImg,canvas.width-150,20,48.4,46);
    }else{
        ctx.drawImage(assets.vieImg,canvas.width-50,20,48.4,46);
        ctx.drawImage(assets.deadImg,canvas.width-100,20,48.4,46);
        ctx.drawImage(assets.deadImg,canvas.width-150,20,48.4,46);
    }
    ctx.restore();

}
// animation à 60 images/s
function animationLoop() {
  // 1 on efface le canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  afficheInfoJeu(); // scores, niveau etc.

  switch (etatJeu) {
    case "MenuPrincipal":
      afficheMenuPrincipal();
      break;
    case "JeuEnCours":
      updateJeu();
      break;
    case "EcranChangementNiveau":
      afficheEcranChangementNiveau();
      break;
    case "GameOver":
      afficheEcranGameOver();
  }
  requestAnimationFrame(animationLoop);
}


function afficheMenuPrincipal() {
    ctx.save();
    ctx.fillStyle = 'rgba(0,0,0,0.75)';
    ctx.rect(0,0, window.innerWidth,window.innerHeight);
    ctx.fill();

    ctx.font = "60px Koara";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText("MENU PRINCIPAL",window.innerWidth/2,window.innerHeight/2 - 150);
    ctx.font = "40px Verdana";
    ctx.drawImage(assets.ghost,window.innerWidth/2,window.innerHeight/2-125,67.5,105);
    ctx.fillText("Manger tous les fantômes pour finir un niveau.",window.innerWidth/2,window.innerHeight/2);
    ctx.drawImage(assets.player,window.innerWidth/2,window.innerHeight/2+50,67.5,105);
    ctx.fillText("Attention si vous touchez un CupHead, vous perdez une vie.",window.innerWidth/2,window.innerHeight/2+200);
    ctx.fillText("Cliquez pour démarrer",window.innerWidth/2,window.innerHeight/2+250);
    ctx.restore();
}

function afficheEcranChangementNiveau() {
  ctx.save();
  if (niveau == 1){
    ctx.fillStyle = 'rgba(0,0,0,0.75)';
    ctx.rect(0,0, window.innerWidth,window.innerHeight);
    ctx.fill();

    ctx.font = "60px Koara";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText("Changement niveau",window.innerWidth/2,window.innerHeight/2 - 150);
    ctx.font = "40px Verdana";
    ctx.drawImage(assets.fake,window.innerWidth/2-100,window.innerHeight/2-50,192,124.5);
    ctx.fillText("Attention ce CupHead est attiré par vous. S'il vous touche, vous perdez une vie.",window.innerWidth/2,window.innerHeight/2+130);
    ctx.fillText("Cliquez pour niveau suivant",window.innerWidth/2,window.innerHeight/2+200);

  }else if (niveau == 2){
    ctx.fillStyle = 'rgba(0,0,0,0.75)';
    ctx.rect(0,0, window.innerWidth,window.innerHeight);
    ctx.fill();

    ctx.font = "60px Koara";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText("Changement niveau",window.innerWidth/2,window.innerHeight/2 - 150);
    ctx.font = "40px Verdana";
    ctx.drawImage(assets.lifeImg,window.innerWidth/2-70,window.innerHeight/2-120,139,124);
    ctx.fillText("Attraper le coeur pour récuperer une vie.",window.innerWidth/2,window.innerHeight/2+40);
    ctx.fillText("Cliquez pour niveau suivant",window.innerWidth/2,window.innerHeight/2+100);
  }else{
    ctx.fillStyle = 'rgba(0,0,0,0.75)';
    ctx.rect(0,0, window.innerWidth,window.innerHeight);
    ctx.fill();

    ctx.font = "60px Koara";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText("Changement niveau",window.innerWidth/2,window.innerHeight/2 - 150);
    ctx.fillText("Cliquez pour niveau suivant",window.innerWidth/2,window.innerHeight/2);
  }
    ctx.restore();
}

function afficheEcranGameOver() {
    game = false;
    ctx.save();
    ctx.fillStyle = 'rgba(0,0,0,0.75)';
    ctx.rect(0,0, window.innerWidth,window.innerHeight);
    ctx.fill();

    ctx.font = "60px Verdana";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER",window.innerWidth/2,window.innerHeight/2 - 150);
    ctx.fillText("RECORD : "+record,window.innerWidth/2,window.innerHeight/2);
    ctx.fillText("Cliquez pour démarrer",window.innerWidth/2,window.innerHeight/2+100);
    ctx.restore();
}

function niveauSuivant() {
    if(tableauDesGhost.length == 0){
        niveau++;
        if(tableauDesTassesChercheuse) tableauDesTassesChercheuse=[];
        if (tableauDeslife) tableauDeslife=[];
        creerDesGhost(5);
        if (niveau >3 && niveau <6){
            start(niveau*2);
        }else if (niveau ==2){
            creerChercheurse(3);
            start(niveau*2);
        }else if (niveau ==3){
            creerLife();
            start(niveau*2);
        }else if(niveau >5 && niveauFini<9){
          start(niveau*2);
        }else if (niveau == 9){
          start(10);
          creerChercheurse(5);
          creerChercheurse(4);
        }else if (niveau == 10){
          start(18);
          creerLife();
        }else if (niveau >10 && niveau <15){
          start(25);
        }else if (niveau == 15){
            start(25);
            creerLife();
        }else if (niveau >15 && niveau <19){
          start(25);
        }else if(niveau == 19){
          start(20);
          creerChercheurse(3);
          creerChercheurse(5);
        }else if (niveau == 20){
          creerLife();
          start(25);
        }else if (niveau >20){
          start(25);
        }
       
    }
  etatJeu = "JeuEnCours";
}

function updateJeu() {
    if (!game){
        if(record == 0){
            rafraichirGosht();
            creerDesGhost(5); 
            start(1);
            game=true;
        }
    }
    
   //Ghost
   dessinerLesGhost();
    
   //Tasse
   animate();
   
   //Diable
   diable.draw(ctx);
   diable.move();;

   //Test collision
   traiteCollisionAvecBords();

   if (tableauDeslife) dessinerLesLife();

    if(tableauDesTassesChercheuse) dessinerLesChercheuses();

  if (niveauFini()) {
    etatJeu = "EcranChangementNiveau";
  }
  if(gameOver()){
    etatJeu = "GameOver";
  }
}

function niveauFini() {
  return tableauDesGhost.length == 0;
}

function gameOver(){
    return vie==0;
}

window.addEventListener('resize', function(){
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
});
