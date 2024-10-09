import { ARCHER_ANIMS, ARCHER_IDLE_DIRECTIONS, ARCHER_WALK_DIRECTIONS } from '../utils/constants';

export default class Archer extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'archer', 0);
    this.scene = scene;
    this.createAnimations();
    this.scene.add.existing(this);
  }

  createAnimations() {
    this.scene.anims.create({
      key: ARCHER_ANIMS.IDLE_DOWN,
      frames: this.scene.anims.generateFrameNumbers('archer', { start: 0, end: 1 }),
      frameRate: 1,
      repeat: -1
    });

    this.scene.anims.create({ 
      key: ARCHER_ANIMS.IDLE_LEFT,
      frames: this.scene.anims.generateFrameNumbers('archer', { start: 4, end: 7 }),
      frameRate: 2,
      repeat: -1
    });

    this.scene.anims.create({
      key: ARCHER_ANIMS.IDLE_RIGHT,
      frames: this.scene.anims.generateFrameNumbers('archer', { start: 8, end: 11 }),
      frameRate: 2,
      repeat: -1
    });
    
    this.scene.anims.create({
      key: ARCHER_ANIMS.WALK_DOWN,
      frames: this.scene.anims.generateFrameNumbers('archer', { start: 2, end: 3 }),
      frameRate: 5,
      repeat: -1
    });

    this.scene.anims.create({
      key: ARCHER_ANIMS.WALK_LEFT,
      frames: this.scene.anims.generateFrameNumbers('archer', { start: 6, end: 7 }),
      frameRate: 5,
      repeat: -1
    });

    this.scene.anims.create({
      key: ARCHER_ANIMS.WALK_RIGHT,
      frames: this.scene.anims.generateFrameNumbers('archer', { start: 49, end: 51 }),
      frameRate: 5,
      repeat: -1
    });

    this.scene.anims.create({
      key: ARCHER_ANIMS.WALK_UP,
      frames: this.scene.anims.generateFrameNumbers('archer', { start: 14, end: 15 }),
      frameRate: 5,
      repeat: -1
    });
  }

  playIdle(direction) {
    const anim = ARCHER_IDLE_DIRECTIONS[direction];

    this.play(anim);
  }

  playWalk(direction) {
    const anim = ARCHER_WALK_DIRECTIONS[direction];

    this.play(anim);
  }
}
