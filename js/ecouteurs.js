let mousePos = {};

function traiteMouseDown(event){
   // console.log("Souris clické dans le canvas");
   switch (etatJeu) {
    case "MenuPrincipal":
      assets.start.play();
      changeMusique(assets.jeuAudio);
      etatJeu = "JeuEnCours";
      break;
    case "EcranChangementNiveau":
      niveauSuivant();
      break;
    case "GameOver":
      game=false;
      record =0;
      niveau=1;
      vie=3;
      if(tableauDesTassesChercheuse) tableauDesTassesChercheuse = [];
      if (tableauDeslife) tableauDeslife = [];
      changeMusique(assets.jeuAudio);
      etatJeu = "JeuEnCours";
      break;
  }
}

function traiteMouseUp(event){
    //console.log("Souris relache dans le canvas");
}

function traiteMouseMove(event){
   // console.log("Souris bouge dans le canvas");
   if (etatJeu=="GameOver" && musiqueCourante != assets.end){changeMusique(assets.end);}
   var rect = canvas.getBoundingClientRect();

    mousePos.x = event.clientX - rect.left;
     mousePos.y = event.clientY - rect.top;
     
           //console.log("Souris en x = " + mousePos.x + " y = " + mousePos.y);
     
     diable.setPos(mousePos.x,mousePos.y);
     if(tableauDesTassesChercheuse){
      tableauDesTassesChercheuse.forEach((tasse) =>{
        tasse.setTarget(mousePos.x,mousePos.y);
    });
     }
}


function traiteKeyDown(event){
   // console.log("clavier clické dans le canvas "+event.key);
    switch (event.key){
        case "ArrowLeft" :
            diable.vitessex -= 5;
            break;
        case "ArrowRight" :
            diable.vitessex += 5;
            break;
        case "ArrowUp" :
            diable.vitessey -=5;
            break;
        case "ArrowDown" :
            diable.vitessey +=5;
            break;
    }
    
}

function traiteKeyUp(event){
    //console.log("clavier relaché dans le canvas "+event.key);
    switch (event.key) {
        case "ArrowLeft":
        case "ArrowRight":
          diable.vitesseX = 0;
          break;
        case "ArrowUp":
        case "ArrowDown":
          diable.vitesseY = 0;
          break;
      }
}