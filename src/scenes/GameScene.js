import Phaser from 'phaser';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  preload() {
    console.log('GameScene preload');
    this.load.image('background', 'assets/background.png');
  }
  
  create() {
    console.log('GameScene create');
  }

  update() {
    // console.log('update');
  }
}
