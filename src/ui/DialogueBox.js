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

    this.add([this.box, this.border, this.text]);

    scene.add.existing(this);

    this.setVisible(false);
    this.setAlpha(0); // Set initial alpha to 0
  }

  showDialogue(dialogue, onComplete) {
    this.setVisible(true);
    this.text.setText('');

    // Fade in effect
    this.scene.tweens.add({
      targets: this,
      alpha: 1,
      duration: 250,
      ease: 'Linear',
    });

    let i = 0;
    const timer = this.scene.time.addEvent({
      delay: 50,
      callback: () => {
        this.text.text += dialogue[i];
        i++;
        if (i === dialogue.length) {
          timer.remove();
          this.scene.input.once('pointerdown', () => {
            this.setVisible(false);
            this.setAlpha(1); // Reset alpha for next use
            if (onComplete) onComplete();
          });
        }
      },
      repeat: dialogue.length - 1,
    });
  }
}
