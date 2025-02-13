import { SCREEN, FONTS } from '../config/constants';

export default class Title {
  constructor(scene) {
    this.scene = scene;
    this.title = null;
    this.clickText = null;
  }

  create(titleText = 'Bananas:The Game', clickText = 'Click to start') {
    this.title = this.scene.add
      .text(SCREEN.CENTER_X, 200, `🍌 ${titleText} 🍌`, {
        fontSize: FONTS.TITLE.size,
        fontFamily: FONTS.TITLE.family,
        fontStyle: 'bold',
        color: FONTS.TITLE.color,
        stroke: '#000000',
        strokeThickness: 6,
        shadow: { offsetX: 2, offsetY: 2, color: '#000000', blur: 4, stroke: true, fill: true },
      })
      .setOrigin(0.5);

    this.title.setTint(0xffaaaa, 0xffffaa, 0xaaaaff, 0xffaaff);

    this.clickText = this.scene.add
      .text(SCREEN.CENTER_X, 400, `🍌 ${clickText} 🍌`, {
        fontSize: FONTS.SUBTITLE.size,
        fontFamily: FONTS.SUBTITLE.family,
        fontStyle: 'bold',
        color: FONTS.SUBTITLE.color,
        stroke: '#000000',
        strokeThickness: 4,
      })
      .setOrigin(0.5);

    this.startBlinking();
    return this;
  }

  startBlinking() {
    this.scene.tweens.add({
      targets: this.clickText,
      alpha: { from: 0.5, to: 1 },
      duration: 1000,
      ease: 'Power2',
      yoyo: true,
      repeat: -1,
    });
  }

  fadeOut(onComplete) {
    this.scene.tweens.add({
      targets: [this.title, this.clickText],
      alpha: 0,
      duration: 1000,
      ease: 'Power2',
      onComplete: () => {
        this.destroy();
        if (onComplete) onComplete();
      },
    });
  }

  destroy() {
    if (this.title) {
      this.title.destroy();
      this.title = null;
    }
    if (this.clickText) {
      this.clickText.destroy();
      this.clickText = null;
    }
  }
}
