import Phaser from 'phaser';

export default class DialogueBox extends Phaser.GameObjects.Container {
  constructor(scene, x, y, width, height) {
    super(scene, x, y);

    this.box = scene.add.rectangle(0, 0, width, height, 0x0000ff).setOrigin(0).setAlpha(0.8);
    this.border = scene.add.rectangle(0, 0, width, height).setOrigin(0).setStrokeStyle(4, 0xffffff);

    this.text = scene.add.text(10, 10, '', {
      fontFamily: '"Press Start 2P", "Courier", monospace',
      fontSize: '20px',
      color: '#ffffff',
      wordWrap: { width: width - 20 },
      lineSpacing: 10,
    });

    this.continueIndicator = scene.add
      .text(width - 30, height - 30, '▼', {
        fontFamily: '"Press Start 2P", "Courier", monospace',
        fontSize: '16px',
        color: '#ffffff',
      })
      .setOrigin(0.5);

    this.continueIndicator.setVisible(false);

    this.choices = {
      container: scene.add.container(width - 150, height - 50),
      buttons: [],
    };

    this.add([this.box, this.border, this.text, this.continueIndicator, this.choices.container]);
    scene.add.existing(this);

    this.setVisible(false);
    this.setAlpha(0);
  }

  showDialogue(dialogueItem, onComplete) {
    this.setVisible(true);
    this.text.setText('');
    this.continueIndicator.setVisible(false);
    this.hideChoices();

    this.scene.tweens.add({
      targets: this,
      alpha: 1,
      duration: 250,
      ease: 'Linear',
    });

    const text = dialogueItem.text;
    let i = 0;
    const timer = this.scene.time.addEvent({
      delay: 50,
      callback: () => {
        this.text.text += text[i];
        i++;
        if (i === text.length) {
          timer.remove();
          if (dialogueItem.type === 'question') {
            this.showChoices(dialogueItem.choices, (choiceIndex) => {
              const choice = dialogueItem.choices[choiceIndex];
              const response = dialogueItem.responses[choice];
              if (onComplete) onComplete(response);
            });
          } else {
            this.startBlinkingIndicator();
            this.scene.input.once('pointerdown', () => {
              this.stopBlinkingIndicator();
              if (onComplete) onComplete();
            });
          }
        }
      },
      repeat: text.length - 1,
    });
  }

  startBlinkingIndicator() {
    this.continueIndicator.setVisible(true);
    this.blinkTween = this.scene.tweens.add({
      targets: this.continueIndicator,
      alpha: { from: 1, to: 0 },
      duration: 500,
      ease: 'Power2',
      yoyo: true,
      repeat: -1,
    });
  }

  stopBlinkingIndicator() {
    if (this.blinkTween) {
      this.blinkTween.stop();
      this.blinkTween = null;
    }
    this.continueIndicator.setVisible(false);
  }

  showChoices(choices, onSelect) {
    this.hideChoices();
    this.stopBlinkingIndicator();

    const dividerText = ' / ';

    // Create three separate text objects
    const yesButton = this.scene.add
      .text(0, 0, choices[0], {
        fontFamily: '"Press Start 2P", "Courier", monospace',
        fontSize: '16px',
        color: '#ffffff',
      })
      .setInteractive();

    const divider = this.scene.add.text(yesButton.width + 5, 0, dividerText, {
      fontFamily: '"Press Start 2P", "Courier", monospace',
      fontSize: '16px',
      color: '#ffffff',
    });

    const noButton = this.scene.add
      .text(yesButton.width + divider.width + 10, 0, choices[1], {
        fontFamily: '"Press Start 2P", "Courier", monospace',
        fontSize: '16px',
        color: '#ffffff',
      })
      .setInteractive();

    // Add hover effects
    yesButton
      .on('pointerover', () => {
        yesButton.setStyle({ color: '#42f5d1' });
      })
      .on('pointerout', () => {
        yesButton.setStyle({ color: '#ffffff' });
      })
      .on('pointerdown', () => {
        this.hideChoices();
        onSelect(0);
      });

    noButton
      .on('pointerover', () => {
        noButton.setStyle({ color: '#42f5d1' });
      })
      .on('pointerout', () => {
        noButton.setStyle({ color: '#ffffff' });
      })
      .on('pointerdown', () => {
        this.hideChoices();
        onSelect(1);
      });

    this.choices.buttons = [yesButton, divider, noButton];
    this.choices.buttons.forEach((button) => this.choices.container.add(button));
  }

  hideChoices() {
    this.choices.buttons.forEach((button) => button.destroy());
    this.choices.buttons = [];
  }
}
