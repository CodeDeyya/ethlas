import * as React from 'react';
import { useLayoutEffect } from '@/hooks/useSSREffect.js';

const Game = ({
  tagName: Tag = 'div',
  setScore,
  setOpen,
  start,
  setStart,
  setOpenMessage,
  children,
}) => {
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
    var scene = new Phaser.Scene('game');
    let button;
    let fauna;
    scene.preload = function () {};
    let up = false;

    class Bee extends Phaser.GameObjects.Image {
      constructor(config) {
        super(config.scene, config.x, config.y, 'button');
        config.scene.add.existing(this);
        config.scene.physics.add.existing(this);
        this.x = config.x;
        this.y = config.y;
        this.body.allowGravity = false;
        config.scene.tweens.add({
          targets: this.body.velocity,
          y: { from: -50, to: 50 },
          ease: Phaser.Math.Easing.Quadratic.InOut,
          yoyo: true,
          repeat: -1,
          duraton: 1000,
          delay: 100,
        });
      }
    }

    scene.create = function () {
      const map = this.make.tilemap({ key: 'dungeon' });
      const tileset = map.addTilesetImage('dungeons', 'tiles');
      map.createLayer('Floor', tileset);
      map.createLayer('Flora', tileset);
      map.createLayer('Buildings', tileset);

      fauna = this.add.sprite(300, 300, 'fauna', 'run-down-3.png');
      this.anims.create({
        key: 'faune-idle-down',
        frames: [{ key: 'fauna', frame: 'walk-down-3.png' }],
      });
      this.anims.create({
        key: 'faune-idle-up',
        frames: [{ key: 'fauna', frame: 'walk-up-3.png' }],
      });
      this.anims.create({
        key: 'faune-run-down',
        frames: this.anims.generateFrameNames('fauna', {
          start: 1,
          end: 8,
          prefix: 'run-down-',
          suffix: '.png',
        }),
        repeat: -1,
        frameRate: 60,
      });
      this.anims.create({
        key: 'faune-run-up',
        frames: this.anims.generateFrameNames('fauna', {
          start: 1,
          end: 8,
          prefix: 'run-up-',
          suffix: '.png',
        }),
        repeat: -1,
        frameRate: 60,
      });
      this.anims.create({
        key: 'faune-run-side',
        frames: this.anims.generateFrameNames('fauna', {
          start: 1,
          end: 8,
          prefix: 'run-side-',
          suffix: '.png',
        }),
        repeat: -1,
        frameRate: 60,
      });
      fauna.anims.play('faune-run-side');

      let bee = new Bee({ scene: this, x: 400, y: 190 });
      bee.setInteractive();
      bee.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
        setOpenMessage(true);
      });
    };

    scene.update = function (t, dt) {};
    return scene;
  }, []);

  const preload = React.useCallback(
    (width, height) => {
      var scene = new Phaser.Scene('Preload');
      scene.preload = function () {
        this.load.image('tiles', 'tiles/atlas.png');
        this.load.tilemapTiledJSON('dungeon', 'assets/tiles/map.json');
        this.load.image('button', 'assets/ui/button.png');
        this.load.atlas('fauna', 'assets/character/fauna.png');
      };

      scene.create = function () {
        this.scene.start('game');
      };
      return scene;
    },
    [start],
  );

  useLayoutEffect(() => {
    let g;
    var scenes = [];
    const ratio = Math.max(
      window.innerWidth / window.innerHeight,
      window.innerHeight / window.innerWidth,
    );
    const height = 600;
    const width = ratio * height;
    scenes.push(preload(width, height));
    scenes.push(gameScene(width, height));

    if (Phaser && parent.current && canvas.current) {
      const config = {
        type: Phaser.Canvas,
        parent: parent.current,
        canvas: canvas.current,
        width: window.innerWidth,
        height: window.innerHeight,
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
    }
    return () => g.destroy();
  }, [Phaser, preload, parent, canvas, gameScene]);

  return Phaser ? (
    <Tag ref={parent}>
      <canvas ref={canvas} />
      {children}
    </Tag>
  ) : null;
};

export default Game;
