import * as React from 'react';
import { useLayoutEffect } from '@/hooks/useSSREffect.js';

const Game = ({ tagName: Tag = 'div', setScore, setOpen }) => {
  const parent = React.useRef();
  const canvas = React.useRef();
  const game = React.useRef();

  const Phaser = React.useMemo(() => {
    if (
      typeof window !== 'undefined' &&
      typeof window.navigator !== 'undefined'
    ) {
      return require('phaser');
    }
  }, []);

  const gameScene = React.useCallback((width, height) => {
    var scene = new Phaser.Scene('Game');
    var score = 0;
    var scoreText;
    var platforms;
    var cursors;
    var player;
    var stars;
    var bombs;
    var gameOver = false;

    scene.preload = function () {
      this.load.image('sky', 'assets/img/sky.png');
      this.load.image('ground', 'assets/img/platform.png');
      this.load.image('star', 'assets/img/star.png');
      this.load.image('bomb', 'assets/img/bomb.png');
      this.load.spritesheet('dude', 'assets/img/dude.png', {
        frameWidth: 32,
        frameHeight: 48,
      });
    };

    scene.create = function () {
      this.add.image(400, 300, 'sky');

      platforms = this.physics.add.staticGroup();

      platforms
        .create(width / 2, height, 'ground')
        .setScale(2)
        .refreshBody();

      platforms.create(600, 400, 'ground');
      platforms.create(50, 250, 'ground');
      platforms.create(750, 220, 'ground');

      player = this.physics.add.sprite(0, height - 100, 'dude');

      player.setBounce(0.2);
      player.setCollideWorldBounds(true);
      player.body.setGravityY(300);

      stars = this.physics.add.group({
        key: 'star',
        repeat: (width - 12) / 70,
        setXY: { x: 12, y: 0, stepX: 70 },
      });

      stars.children.iterate(function (child) {
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
      });

      bombs = this.physics.add.group();

      this.physics.add.collider(player, platforms);
      this.physics.add.collider(stars, platforms);
      this.physics.add.collider(bombs, platforms);

      this.physics.add.collider(player, bombs, hitBomb, null, this);
      this.physics.add.overlap(player, stars, collectStar, null, this);

      this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1,
      });

      this.anims.create({
        key: 'turn',
        frames: [{ key: 'dude', frame: 4 }],
        frameRate: 20,
      });

      this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1,
      });

      scoreText = this.add.text(16, 16, 'score: 0', {
        fontSize: '32px',
        fill: '#000',
      });

      cursors = this.input.keyboard.createCursorKeys();
    };

    scene.update = function () {
      'use strict';
      if (gameOver) {
        return;
      }

      if (cursors.left.isDown) {
        player.setVelocityX(-160);

        player.anims.play('left', true);
      } else if (cursors.right.isDown) {
        player.setVelocityX(160);

        player.anims.play('right', true);
      } else {
        player.setVelocityX(0);

        player.anims.play('turn');
      }

      if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-500);
      }
    };

    function collectStar(player, star) {
      star.disableBody(true, true);

      score += 10;
      scoreText.setText('Score: ' + score);
      setScore(score);

      if (stars.countActive(true) === 0) {
        stars.children.iterate(function (child) {
          child.enableBody(true, child.x, 0, true, true);
        });

        var x =
          player.x < 400
            ? Phaser.Math.Between(400, 800)
            : Phaser.Math.Between(0, 400);

        var bomb = bombs.create(x, 16, 'bomb');
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
        bomb.allowGravity = false;
      }
    }
    function hitBomb(player, bomb) {
      this.physics.pause();

      player.setTint(0xff0000);

      player.anims.play('turn');

      setTimeout(() => {
        this.scene.restart();
        score = 0;
        setOpen(true);
      }, 3000);
    }

    return scene;
  }, []);

  const preload = React.useCallback((width, height) => {
    var scene = new Phaser.Scene('Preload');

    scene.preload = function () {
      this.load.spritesheet(
        'button',
        'assets/img/Button/button_sprite_sheet.png',
        { frameWidth: 193, frameHeight: 71 },
      );
      this.load.image('logo', 'assets/logo.png');
    };

    scene.create = function () {
      var logo = this.add.image(400, 300, 'logo');
      var headingText = this.add.text(
        width / 2 - 130,
        height - 30,
        'Click To Start',
        { fontSize: '32px', fill: '#FFF' },
      );

      this.input.once(
        'pointerdown',
        function () {
          this.scene.start('Game');
        },
        this,
      );
    };

    scene.update = function () {
      'use strict';

      // ...
    };

    return scene;
  }, []);

  useLayoutEffect(() => {
    let g;
    var scenes = [];
    const width = 800;
    const height = 600;
    scenes.push(preload(width, height));
    scenes.push(gameScene(width, height));

    if (Phaser && parent.current && canvas.current) {
      const config = {
        type: Phaser.CANVAS,
        parent: parent.current,
        canvas: canvas.current,
        scale: {
          mode: Phaser.Scale.FIT,
          autoCenter: Phaser.Scale.CENTER_BOTH,
          width: 800,
          height: 600,
        },
        autoCenter: true,
        backgroundColor: '#000000',
        physics: {
          default: 'arcade',
          arcade: {
            gravity: { y: 200 },
          },
        },
        scene: scenes,
      };
      g = game.current = new Phaser.Game(config);
      console.log('game', game.current);
    }
    return () => g.destroy();
  }, [Phaser, preload, parent, canvas]);

  return Phaser ? (
    <Tag
      ref={parent}
      style={{
        height: '80vh',
        marginTop: '30px',
      }}
    >
      <canvas ref={canvas} />
    </Tag>
  ) : null;
};

export default Game;
