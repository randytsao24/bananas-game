import Phaser from 'phaser';

export default class IntroScene extends Phaser.Scene {
  constructor() {
    super({ key: 'IntroScene' });
  }

  preload() {
    console.log('IntroScene preload');
    this.load.image('background', 'assets/background/background-two.png');
  }
  
  create() {
    console.log('IntroScene create');

    let backgroundImg = this.add.image(400, 300, 'background');
    backgroundImg.setDisplaySize(800, 600);

    this.createWindEffect();

    const title = this.add.text(400, 200, 'Minty Banana Adventure', { 
      fontSize: '48px', 
      fontFamily: 'Arial, sans-serif',
      fontStyle: 'bold',
      color: '#42f5d1',
      stroke: '#000000',
      strokeThickness: 6,
      shadow: { offsetX: 2, offsetY: 2, color: '#000000', blur: 4, stroke: true, fill: true }
    }).setOrigin(0.5);

    title.setTint(0xffaaaa, 0xffffaa, 0xaaaaff, 0xffaaff);

    const clickText = this.add.text(400, 400, 'Click to start', { 
      fontSize: '32px', 
      fontFamily: 'Arial, sans-serif',
      fontStyle: 'bold',
      color: '#FFFFFF',
      stroke: '#000000',
      strokeThickness: 4
    }).setOrigin(0.5);

    this.tweens.add({
      targets: clickText,
      alpha: { from: 0.5, to: 1 },
      duration: 1000,
      ease: 'Power2',
      yoyo: true,
      repeat: -1
    });

    this.input.once('pointerdown', () => {
      this.scene.start('GameScene');
    });
  }

  createWindEffect() {
    // Create the wind particle texture
    const windParticle = this.make.graphics({ x: 0, y: 0, add: false });
    windParticle.fillStyle(0xffffff, 1);
    windParticle.fillCircle(4, 4, 4);
    windParticle.generateTexture('wind', 8, 8);

    // Create the particle emitter
    const particles = this.add.particles(0, 0, 'wind', {
      frame: { frames: [0], cycle: true },
      blendMode: 'ADD',
      scale: { start: 0.3, end: 0.1 },
      alpha: { start: 0.6, end: 0.2 },
      speed: { min: 20, max: 100 },
      angle: { min: -10, max: 10 },
      lifespan: { min: 4000, max: 8000 },
      frequency: 20,
      gravityY: -2,
      x: { min: -100, max: 900 },
      y: { min: -100, max: 700 },
      emitZone: { type: 'random', source: new Phaser.Geom.Rectangle(-100, -100, 1000, 800) }
    });
  }

  update() {
    // console.log('update');
  }
}
