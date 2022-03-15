import Phaser from 'phaser';

class Button extends Phaser.GameObjects.Image {
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

export default Button;
