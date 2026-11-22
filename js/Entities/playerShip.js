define([
  '../constants',
  '../../lib/gameEngine/sceneObject',
  './bullet'
], function (Constants, SceneObject, Bullet) {
  function PlayerShip(image) {
    this.x = Constants.PLAYER_START_X;
    this.y = Constants.PLAYER_START_Y;
    this.width = Constants.SHIP_WIDTH;
    this.height = Constants.SHIP_HEIGHT;
    this.type = 'Ship';
    this.image = image;
    this.rect = Constants.SHIP_SPRITE;
  }
  PlayerShip.prototype = new SceneObject();
  PlayerShip.prototype.draw = function(c) {
    c.drawImage(this.image, this.rect.x, this.rect.y,
      this.rect.width, this.rect.height,
      this.x, this.y, this.width, this.height);
  };
  PlayerShip.prototype.update = function() {
    var held = window.__heldKeys || {};
    var left = !!held[37], right = !!held[39];
    if (left !== right) {
      if (left) this.x -= Constants.SHIP_SPEED;
      if (right) this.x += Constants.SHIP_SPEED;
    }
    this.x = Math.max(0, Math.min(Constants.WINDOW_WIDTH - this.width, this.x));
  };
  PlayerShip.prototype.keyDown = function(key) {
    if (key === 32 && this.scene) {
      this.scene.addObject(new Bullet(this.x + 5, this.y));
      this.scene.addObject(new Bullet(this.x + this.width - 5, this.y));
      this.scene.game.soundManager.play(Constants.FIRING_SOUND);
    }
  };
  return PlayerShip;
});