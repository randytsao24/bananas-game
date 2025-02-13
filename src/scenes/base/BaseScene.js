import Phaser from 'phaser';
import { SCREEN } from '../../config/constants';

export default class BaseScene extends Phaser.Scene {
  constructor(config) {
    super(config);
    this.screenCenter = {
      x: SCREEN.CENTER_X,
      y: SCREEN.CENTER_Y,
    };
  }

  preload() {
    this.load.on('loaderror', (file) => {
      console.error('Error loading asset:', file.src);
    });
  }

  setBackground(key) {
    const backgroundImg = this.add.image(SCREEN.CENTER_X, SCREEN.CENTER_Y, key);
    backgroundImg.setDisplaySize(SCREEN.WIDTH, SCREEN.HEIGHT);
    return backgroundImg;
  }

  shutdown() {
    this.input.removeAllListeners();
    this.tweens.killAll();
  }
}
