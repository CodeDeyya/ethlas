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
    scene.preload = function () {};

    scene.create = function () {
      const map = this.make.tilemap({ key: 'dungeon' });
      const tileset = map.addTilesetImage('dungeons', 'tiles');
      map.createLayer('Floor', tileset);
      map.createLayer('Flora', tileset);
      map.createLayer('Buildings', tileset);
      button = this.add.image(390, 200, 'button');
      button.setInteractive();
      button.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
        setOpenMessage(true);
      });
    };

    scene.update = function () {};

    return scene;
  }, []);

  const preload = React.useCallback(
    (width, height) => {
      var scene = new Phaser.Scene('Preload');
      scene.preload = function () {
        this.load.image('tiles', 'tiles/atlas.png');
        this.load.tilemapTiledJSON('dungeon', 'assets/tiles/map.json');
        this.load.image('button', 'assets/ui/button.png');
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
