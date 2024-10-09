import Phaser from 'phaser';

import IntroScene from './scenes/IntroScene.js';
import GameScene from './scenes/GameScene.js';

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: [IntroScene, GameScene],
};

new Phaser.Game(config);

console.log('Starting game...');
