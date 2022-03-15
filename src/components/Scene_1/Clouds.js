import Phaser from 'phaser';

class Clouds extends Phaser.GameObjects.Image {
  constructor(config) {
    console.log(config, 'CONFIG');
    super(config.scene, config.x, config.y, config.object);
    config.scene.add.existing(this);
    config.scene.physics.add.existing(this);
    this.x = config.x;
    this.y = config.y;
    this.body.allowGravity = false;
    config.scene.tweens.add({
      targets: this.body.velocity,
      x: { from: -15, to: 15 },
      ease: 'Power0',
      repeat: -1,
      duraton: 60000,
    });
  }
}

export default Clouds;
