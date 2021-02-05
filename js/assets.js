/* Les assets, on pourra plus tard ajouter des sons et des musiques */
const assetsToLoadURLs = {
    vieImg: { url: "../assets/image/vie.png" },
    deadImg: { url: "../assets/image/dead.png" },
    ghost: { url: "../assets/image/ghost.png" },
    diableImg: { url: "../assets/image/diable.png" },
    lifeImg: { url: "../assets/image/life.png" },
    fake: {url: "../assets/image/fake.png"},
    player: {url: "../assets/image/player.png"},
    bruit: {
        url:
          "../assets/audio/coin.wav",
        buffer: false,
        loop: false,
        volume: 1.0,
      },lifeSound: {
        url:
          "../assets/audio/vie.wav",
        buffer: false,
        loop: false,
        volume: 1.0,
      },
      touch: {
        url:
          "../assets/audio/touch.mp3",
        buffer: false,
        loop: false,
        volume: 1.0,
      },
      end: {
        url:
          "../assets/audio/fake.mp3",
        buffer: false,
        loop: false,
        volume: 1.0,
      },
      pop: {
        url:
            "../assets/audio/pop.wav",
          buffer: false,
          loop: false,
          volume: 1.0,
        },
        start: {
            url:
                "../assets/audio/start.wav",
              buffer: false,
              loop: false,
              volume: 1.0,
            },
      home : {
        url:
        "../assets/audio/accueil.mp3",
      buffer: true,
      loop: true,
      volume: 1.0,
      },
      jeuAudio : {
        url:
        "../assets/audio/jeu.mp3",
      buffer: true,
      loop: true,
      volume: 1.0,
      }
  };
  
  function loadAssets(callback) {
    // here we should load the souds, the sprite sheets etc.
    // then at the end call the callback function
    loadAssetsUsingHowlerAndNoXhr(assetsToLoadURLs, callback);
  }
  
  // You do not have to understand in details the next lines of code...
  // just use them!
  
  /* ############################
      BUFFER LOADER for loading multiple files asyncrhonously. The callback functions is called when all
      files have been loaded and decoded 
   ############################## */
  function isImage(url) {
    return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
  }
  
  function isAudio(url) {
    return url.match(/\.(mp3|ogg|wav)$/) != null;
  }
  
  function loadAssetsUsingHowlerAndNoXhr(assetsToBeLoaded, callback) {
    var assetsLoaded = {};
    var loadedAssets = 0;
    var numberOfAssetsToLoad = 0;
  
    // define ifLoad function
    var ifLoad = function () {
      if (++loadedAssets >= numberOfAssetsToLoad) {
        callback(assetsLoaded);
      }
      console.log("Loaded asset " + loadedAssets);
    };
  
    // get num of assets to load
    for (var name in assetsToBeLoaded) {
      numberOfAssetsToLoad++;
    }
  
    console.log("Nb assets to load: " + numberOfAssetsToLoad);
  
    for (name in assetsToBeLoaded) {
      var url = assetsToBeLoaded[name].url;
      console.log("Loading " + url);
      if (isImage(url)) {
        assetsLoaded[name] = new Image();
  
        assetsLoaded[name].onload = ifLoad;
        // will start async loading.
        assetsLoaded[name].src = url;
      } else {
        // We assume the asset is an audio file
        console.log(
          "loading " + name + " buffer : " + assetsToBeLoaded[name].loop
        );
        assetsLoaded[name] = new Howl({
            src: [url],
          buffer: assetsToBeLoaded[name].buffer,
          loop: assetsToBeLoaded[name].loop,
          autoplay: false,
          volume: assetsToBeLoaded[name].volume,
          onload: function () {
            if (++loadedAssets >= numberOfAssetsToLoad) {
              callback(assetsLoaded);
            }
            console.log("Loaded asset " + loadedAssets);
          },
        }); // End of howler.js callback
      } // if
    } // for
  } // function
