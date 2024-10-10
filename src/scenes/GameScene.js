import Phaser from 'phaser';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  preload() {
    console.log('GameScene preload');
    this.load.image('background', 'assets/background.png');
    this.load.spritesheet('archer', 'assets/sprites/Archer-Green.png', {
      frameWidth: 64,
      frameHeight: 64,
      startFrame: 0,
      endFrame: 8,
    });
  }

  create() {
    console.log('GameScene create');

    // Add background
    let backgroundImg = this.add.image(400, 300, 'background');
    backgroundImg.setDisplaySize(800, 600);

    // Create archer sprite
    this.archer = this.add.sprite(400, 300, 'archer');

    // Scale the archer if needed (adjust these values as necessary)
    this.archer.setScale(2);

    // Create animations
    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers('archer', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    // Play the idle animation
    this.archer.play('idle');
  }

  update() {
    // console.log('update');
  }
}
