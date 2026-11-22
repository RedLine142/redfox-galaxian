(function() {
  var localRoot = 'https://cdn.jsdelivr.net/gh/RedLine142/redfox-galaxian@3372defd343c09991bbb885781463af5c2fc9b5/js/';
  var sourceRoot = 'https://cdn.jsdelivr.net/gh/patnaikshekhar/GalaxyInvaders@9d82210b4ca1679f492c9153657f9055ba3467fd/js/';
  requirejs.config({
    baseUrl: sourceRoot,
    urlArgs: 'v=' + Date.now(),
    paths: {
      constants: localRoot + 'constants',
      'Entities/playerShip': localRoot + 'Entities/playerShip',
      'Entities/enemy1': localRoot + 'Entities/enemy1'
    }
  });
  var dependencies = [
    '../lib/gameEngine/game',
    'constants',
    'Scenes/menuScene',
    'Scenes/gameScene'
  ];
  require(dependencies, function(Game, Constants, menuScene, gameScene) {
    var game = new Game('game', Constants.WINDOW_WIDTH,
      Constants.WINDOW_HEIGHT, Constants.FPS, 7);
    game.addScene('menu', menuScene);
    game.addScene('game', gameScene);
    var loader = document.getElementById('loader-wrapper');
    function loadImages() {
      game.imageManager.preLoad(Constants.ALL_IMAGES, function() {
        if (loader && loader.parentNode) loader.parentNode.removeChild(loader);
        game.startScene('menu');
      });
    }
    if (game.soundManager !== undefined) {
      game.soundManager.preLoad(Constants.ALL_SOUNDS, loadImages);
    } else {
      loadImages();
    }
  });
})();