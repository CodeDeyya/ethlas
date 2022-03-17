import * as React from 'react';
import { useLayoutEffect } from '@/hooks/useSSREffect.js';
import { useRouter } from 'next/router';

const Game = ({
  tagName: Tag = 'div',
  setOpen,
  setStart,
  fade,
  setFade,
  setOpenMessage,
  children,
}) => {
  const parent = React.useRef();
  const canvas = React.useRef();
  const game = React.useRef();
  const router = useRouter();
  const Phaser = React.useMemo(() => {
    if (
      typeof window !== 'undefined' &&
      typeof window.navigator !== 'undefined'
    ) {
      return require('phaser');
    }
  }, []);

  const Clouds = React.useMemo(() => {
    if (
      typeof window !== 'undefined' &&
      typeof window.navigator !== 'undefined'
    ) {
      return require('./Clouds');
    }
  }, []);

  const Button = React.useMemo(() => {
    if (
      typeof window !== 'undefined' &&
      typeof window.navigator !== 'undefined'
    ) {
      return require('./Button');
    }
  }, []);

  const gameScene = React.useCallback(
    (width, height) => {
      var scene = new Phaser.Scene('game');
      let fauna;

      scene.preload = function () {
        scene.load.scenePlugin(
          'AnimatedTiles',
          'https://raw.githubusercontent.com/nkholski/phaser-animated-tiles/master/dist/AnimatedTiles.js',
          'animatedTiles',
          'animatedTiles',
        );
        scene.load.plugin(
          'rexmousewheelscrollerplugin',
          'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexmousewheelscrollerplugin.min.js',
          true,
        );
      };

      scene.create = function () {
        this.cameras.main.setBounds(0, 0, 1024, 1024);
        const map = this.make.tilemap({ key: 'dungeon' });
        const tileset = map.addTilesetImage('dungeons', 'tiles');

        const floor = map.createLayer('Floor', tileset);
        map.createLayer('Flora', tileset);
        map.createLayer('Buildings', tileset);
        this.animatedTiles.init(map);
        var fadeCam = this.cameras.main;
        fadeCam.fadeIn(1000, 0, 0, 0);

        console.log(scene.animatedTiles, 'SCENE');

        this.cameras.main.setZoom(1);
        this.cameras.main.centerOn(0, 0);
        this.input.on('pointermove', function (p) {
          var cam = this.cameras.main;
          if (!p.isDown) return;
          cam.scrollX -= (p.x - p.prevPosition.x) / cam.zoom;
          cam.scrollY -= (p.y - p.prevPosition.y) / cam.zoom;
        });
        if (fade) {
          setOpenMessage(false);
          fadeCam.fadeOut(1000, 0, 0, 0);
        }
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

        let button = new Button.default({ scene: this, x: 400, y: 190 });
        button.setInteractive();
        button.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
          setOpenMessage(true);
        });

        let cloud1 = new Clouds.default({
          scene: this,
          x: 700,
          y: 300,
          object: 'cloud1',
        });
        let cloud2 = new Clouds.default({
          scene: this,
          x: 750,
          y: 330,
          object: 'cloud3',
        });
        fadeCam.once(
          Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,
          (cam, effect) => {
            router.push('/map');
          },
        );
        this.input.on(
          'wheel',
          function (pointer, gameObjects, deltaX, deltaY, deltaZ) {
            console.log(deltaY);
            if (deltaY < 0) {
              var cam = this.cameras.main;
              cam.pan(pointer.position.x, pointer.position.y, 500, 'Linear');
              cam.zoomTo(2, 500);
            }
            if (deltaY > 0) {
              var cam = this.cameras.main;
              cam.pan(pointer.position.x, pointer.position.y, 500, 'Linear');
              cam.zoomTo(1, 500);
            }
          },
        );
      };

      return scene;
    },
    [fade],
  );

  const preload = React.useCallback((width, height) => {
    var scene = new Phaser.Scene('Preload');
    scene.preload = function () {
      this.load.image('tiles', 'tiles/atlas.png');
      this.load.tilemapTiledJSON('dungeon', 'assets/tiles/map.json');
      this.load.image('button', 'assets/ui/button.png');
      this.load.image('cloud1', 'assets/clouds/Cloud 1.png');
      this.load.image('cloud2', 'assets/clouds/Cloud 2.png');
      this.load.image('cloud3', 'assets/clouds/Cloud 3.png');
      this.load.image('cloud4', 'assets/clouds/Cloud 4.png');
      this.load.atlas('fauna', 'assets/character/fauna.png');
    };

    scene.create = function () {
      this.scene.start('game');
    };
    return scene;
  }, []);

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
        width: 1000,
        height: 1000,
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
