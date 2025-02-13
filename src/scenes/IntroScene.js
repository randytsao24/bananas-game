import BaseScene from './base/BaseScene';
import Archer from '../characters/Archer';
import DialogueBox from '../ui/DialogueBox';
import WindEffect from '../effects/WindEffect';
import Title from '../ui/Title';
import { INTRO_DIALOGUES } from '../data/dialogues';
import { DIALOGUE } from '../config/constants';
import { ARCHER_SPRITE } from '../config/archer';

export default class IntroScene extends BaseScene {
  constructor() {
    super({ key: 'IntroScene' });
    this.hasClicked = false;
    this.title = null;
    this.dialogueBox = null;
    this.windEffect = null;
    this.archer = null;
  }

  preload() {
    super.preload();
    this.load.image('background', 'assets/background/background-two.png');
    this.load.spritesheet(ARCHER_SPRITE.key, ARCHER_SPRITE.path, {
      frameWidth: ARCHER_SPRITE.frameWidth,
      frameHeight: ARCHER_SPRITE.frameHeight,
    });
  }

  create() {
    this.setBackground('background');

    this.windEffect = new WindEffect(this).create();
    this.title = new Title(this).create();
    this.dialogueBox = new DialogueBox(
      this,
      DIALOGUE.BOX.X,
      DIALOGUE.BOX.Y,
      DIALOGUE.BOX.WIDTH,
      DIALOGUE.BOX.HEIGHT
    );

    this.input.once('pointerdown', this.startIntro.bind(this));
  }

  startIntro() {
    if (this.hasClicked) return;

    this.hasClicked = true;
    this.title.fadeOut(() => {
      this.archer = new Archer(this, -50, 500);
      this.archer.setScale(3);
      this.archer.playWalk('right');

      this.tweens.add({
        targets: this.archer,
        x: 200,
        duration: 2000,
        ease: 'Linear',
        onComplete: () => {
          this.archer.playIdle('down');
          this.startDialogue();
        },
      });
    });
  }

  startDialogue() {
    const showNextDialogue = (index) => {
      if (index < INTRO_DIALOGUES.sequence.length) {
        const dialogueId = INTRO_DIALOGUES.sequence[index];
        const dialogueItem = INTRO_DIALOGUES.items[dialogueId];

        this.dialogueBox.showDialogue(dialogueItem, (response) => {
          if (response) {
            const nextDialogue = INTRO_DIALOGUES.items[response.nextDialogue];
            this.dialogueBox.showDialogue(nextDialogue, () => {
              if (response.action) {
                this.handleAction(response.action);
              }
            });
          } else {
            showNextDialogue(index + 1);
          }
        });
      }
    };

    showNextDialogue(0);
  }

  handleAction(action) {
    switch (action) {
      case 'START_GAME':
        // TODO: Transition to game scene
        console.log('Starting the game...');
        break;
      case 'RESTART':
        this.scene.restart();
        break;
    }
  }

  shutdown() {
    super.shutdown();
    this.windEffect?.destroy();
    this.archer?.destroy();
  }
}
