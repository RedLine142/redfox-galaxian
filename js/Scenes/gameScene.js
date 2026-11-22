define(['../constants',
  '../../lib/gameEngine/scene',
  '../Entities/starfield',
  '../Entities/playerShip',
  '../Entities/enemy1',
  '../Entities/movement',
  '../Entities/explosion',
  '../../lib/gameEngine/Entities/staticText'
], function(Constants, Scene, StarField, PlayerShip,
  Enemy1, Movement, Explosion, StaticText) {

  var gameScene = new Scene();

  gameScene.init = function() {
    this.game.soundManager.play(Constants.BACKGROUND_MUSIC);
    this.level = 1;
    this.lives = 2;
    this.finalScreen = false;
    this.levelClearing = false;
    this.respawnTimer = 0;
    this.bindMouseControl();
    this.startLevel(1);
  };

  gameScene.bindMouseControl = function() {
    var canvas = document.querySelector('#game canvas');
    var self = this;
    if (!canvas || canvas.__redfoxMouseBound) return;
    canvas.__redfoxMouseBound = true;
    canvas.addEventListener('mousemove', function(e) {
      if (!self.ship || self.levelClearing || self.finalScreen) return;
      var rect = canvas.getBoundingClientRect();
      if (!rect.width) return;
      var x = (e.clientX - rect.left) * self.game.width / rect.width;
      self.ship.x = Math.max(0, Math.min(
        Constants.WINDOW_WIDTH - self.ship.width,
        x - self.ship.width / 2
      ));
    });
  };

  gameScene.update = function(dt) {
    Scene.prototype.update.call(this, dt);

    if (this.levelClearing) {
      this.clearTimer -= dt;
      if (this.clearTimer <= 0) {
        this.levelClearing = false;
        if (this.level < 3) {
          this.level += 1;
          this.startLevel(this.level);
        } else {
          this.showFinalScreen();
        }
      }
    }

    if (this.respawnTimer > 0 && !this.finalScreen) {
      this.respawnTimer -= dt;
      if (this.respawnTimer <= 0 && this.lives > 0) {
        this.ship = new PlayerShip(this.game.imageManager.get(Constants.SPRITE_SHEET));
        this.addObject(this.ship);
      }
    }
  };

  gameScene.postUpdate = function() {
    if (this.levelClearing || this.finalScreen) return;
    var bullets = this.getObjectsByType('Bullet');
    var enemyBullets = this.getObjectsByType('EnemyBullet');
    var enemies = this.getObjectsByType('Enemy');
    var self = this;

    enemies.forEach(function(enemy) {
      if (self.sceneObjects.indexOf(enemy) === -1) return;
      for (var i = 0; i < bullets.length; i++) {
        var bullet = bullets[i];
        if (self.sceneObjects.indexOf(bullet) !== -1 &&
            bullet.rectangle().intersects(enemy.rectangle())) {
          var explosion = new Explosion(
            enemy.x + enemy.width / 2,
            enemy.y + enemy.height / 2,
            Constants.ENEMY_EXPLOSION_ANIMATION
          );
          self.removeObject(bullet);
          self.removeObject(enemy);
          self.addObject(explosion);
          self.game.soundManager.play(Constants.KILL_ENEMY_SOUND);
          self.noOfEnemies -= 1;
          break;
        }
      }

      if (self.sceneObjects.indexOf(enemy) !== -1 && self.ship &&
          enemy.rectangle().intersects(self.ship.rectangle())) {
        self.removeObject(enemy);
        self.noOfEnemies -= 1;
        self.playerDies();
      }
    });

    enemyBullets.forEach(function(bullet) {
      if (self.ship && bullet.rectangle().intersects(self.ship.rectangle())) {
        self.removeObject(bullet);
        self.playerDies();
      }
    });

    if (this.noOfEnemies <= 0 && !this.levelClearing) this.beginLevelClear();
  };

  gameScene.createEnemyWave = function() {
    var factor = 1 + (this.level - 1) * 0.18;
    var velocities = Constants.WAVE_MOVEMENT_VELOCITY_LIST.map(function(v) {
      return {x: v.x * factor, y: v.y * factor};
    });
    var waveMovement = new Movement(
      Constants.WAVE_MOVEMENT_TIME_LIST,
      velocities,
      Constants.WAVE_MOVEMENT_ROLLBACK
    );
    this.addObject(waveMovement);
    this.totalEnemies = Constants.WAVES.length * Constants.WAVE_COLUMNS;
    this.noOfEnemies = this.totalEnemies;

    for (var row = 0; row < Constants.WAVES.length; row++) {
      for (var col = 0; col < Constants.WAVE_COLUMNS; col++) {
        var enemy = new Enemy1(
          this.game.imageManager.get(Constants.SPRITE_SHEET),
          Constants.WAVE_START_X + col * (Constants.ENEMY_WIDTH + Constants.WAVE_PADDING),
          Constants.WAVE_START_Y + row * (Constants.ENEMY_HEIGHT + Constants.WAVE_PADDING),
          Constants.WAVES[row],
          waveMovement,
          Constants.ENEMY_MOVEMENT_SPRITES[row]
        );
        this.addObject(enemy);
      }
    }
  };

  gameScene.updateHud = function() {
    if (this.livesText) this.livesText.text = 'ЖИЗНИ: ' + this.lives;
    if (this.levelText) this.levelText.text = 'УРОВЕНЬ ' + this.level + ' / 3';
  };

  gameScene.playerDies = function() {
    if (!this.ship) return;
    var explosion = new Explosion(
      this.ship.x + this.ship.width / 2,
      this.ship.y + this.ship.height / 2,
      Constants.SHIP_EXPLOSION_ANIMATION
    );
    this.addObject(explosion);
    this.removeObject(this.ship);
    this.game.soundManager.play(Constants.SHIP_DESTROYED_SOUND);
    this.ship = null;
    this.lives -= 1;
    this.updateHud();

    if (this.lives > 0) {
      this.respawnTimer = 1200;
      return;
    }

    var gameOver = new StaticText(175, 220, 'ИГРА ОКОНЧЕНА', '#ecf0f1', '34px Georgia');
    var restart = new StaticText(145, 270, 'ПРОБЕЛ — НАЧАТЬ ЗАНОВО', '#2ecc71', '20px Georgia');
    restart.keyDown = function(key) {
      if (key === 32) this.scene.startGame();
    };
    this.addObject(gameOver);
    this.addObject(restart);
  };

  gameScene.beginLevelClear = function() {
    this.levelClearing = true;
    this.clearTimer = 1900;
    var words = ['м', 'над', 'небо'];
    this.addObject(new StaticText(285, 235, words[this.level - 1],
      '#2ecc71', '54px Georgia'));
  };

  gameScene.startLevel = function(level) {
    this.sceneObjects = [];
    this.level = level;
    this.levelClearing = false;
    this.clearTimer = 0;
    this.respawnTimer = 0;
    this.addObject(new StarField(Constants.STARFIELD_SPEED, Constants.STARFIELD_STARS));
    this.ship = new PlayerShip(this.game.imageManager.get(Constants.SPRITE_SHEET));
    this.addObject(this.ship);
    this.levelText = new StaticText(20, 34, '', '#ecf0f1', '18px Georgia');
    this.livesText = new StaticText(490, 34, '', '#2ecc71', '18px Georgia');
    this.addObject(this.levelText);
    this.addObject(this.livesText);
    this.updateHud();
    this.createEnemyWave();
  };

  gameScene.startGame = function() {
    this.lives = 2;
    this.level = 1;
    this.finalScreen = false;
    this.levelClearing = false;
    this.respawnTimer = 0;
    this.startLevel(1);
  };

  gameScene.showFinalScreen = function() {
    this.finalScreen = true;
    this.sceneObjects = [];
    this.ship = null;
    this.addObject(new StarField(Constants.STARFIELD_SPEED, Constants.STARFIELD_STARS));
    this.addObject(new StaticText(245, 215, 'небо', '#2ecc71', '58px Georgia'));
    var restart = new StaticText(150, 275, 'ПРОБЕЛ — НАЧАТЬ СНАЧАЛА',
      '#ecf0f1', '20px Georgia');
    restart.keyDown = function(key) {
      if (key === 32) this.scene.startGame();
    };
    this.addObject(restart);
  };

  return gameScene;
});