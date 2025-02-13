import Phaser from 'phaser';
import { SCREEN } from '../config/constants';

export default class WindEffect {
  constructor(scene) {
    this.scene = scene;
    this.particles = null;
  }

  create() {
    const windParticle = this.scene.make.graphics({ x: 0, y: 0, add: false });
    windParticle.fillStyle(0xffffff, 1);
    windParticle.fillCircle(4, 4, 4);
    windParticle.generateTexture('wind', 8, 8);

    this.particles = this.scene.add
      .particles(0, 0, 'wind', {
        frame: { frames: [0], cycle: true },
        blendMode: 'ADD',
        scale: { start: 0.3, end: 0.1 },
        alpha: { start: 0.6, end: 0.2 },
        speed: { min: 20, max: 100 },
        angle: { min: -10, max: 10 },
        lifespan: { min: 4000, max: 8000 },
        frequency: 20,
        gravityY: -2,
        x: { min: -100, max: SCREEN.WIDTH + 100 },
        y: { min: -100, max: SCREEN.HEIGHT + 100 },
        emitZone: {
          type: 'random',
          source: new Phaser.Geom.Rectangle(-100, -100, SCREEN.WIDTH + 200, SCREEN.HEIGHT + 200),
        },
      })
      .setDepth(100);

    return this;
  }

  destroy() {
    if (this.particles) {
      this.particles.destroy();
      this.particles = null;
    }
  }
}
