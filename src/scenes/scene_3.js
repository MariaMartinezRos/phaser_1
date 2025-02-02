import Phaser from "../lib/phaser.js";

export class scene_3 extends Phaser.Scene {
  constructor() {
    super({ key: "scene_3" });
  }

  preload() {
    this.cameras.main.fadeIn(100);
    const fxCamera = this.cameras.main.postFX.addPixelate(40);
    this.add.tween({
      targets: fxCamera,
      duration: 700,
      amount: -1,
    });
    this.load.image("good_sky", "assets/good_sky.jpg");
    this.load.image("blue", "assets/blue.png");
    this.load.image("dialogue", "assets/dialogue.png");
    this.load.image("dialogue_blue", "assets/dialogue_blue.png");
  }

  create() {
    let auxiliar = false;
    const pixelated = this.cameras.main.postFX.addPixelate(-1);

    //CIELO
    this.add
      .image(0, 0, "good_sky")
      .setOrigin(0, 0)
      .setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);

    // Centra el texto en el canvas
    const centerX = this.sys.game.config.width / 2;
    const centerY = this.sys.game.config.height / 2;

    // PERSONAJES
    const blue = this.add.image(centerX + 400, centerY - 50, "blue");
    blue.setScale(1);
    blue.setAngle(0);
    blue.setAlpha(0);
    blue.setDepth(10);

    // DIALOGO
    const dialogue_blue = this.add.image(
      centerX,
      centerY + 200,
      "dialogue_blue"
    );
    dialogue_blue.setScale(1.6);
    dialogue_blue.setAlpha(0); // Initially hide the dialogue_blue
    dialogue_blue.setDepth(20);

    // Interactive Text
    const next = this.add.text(centerX + 400, centerY + 250, "Next", {
      fontFamily: "Arial",
      fontSize: "32px",
      color: "#ff0000",
    });
    next.setOrigin(0.5);
    next.setAlpha(0); // Initially hide the text
    next.setInteractive();
    next.setDepth(30);

    // Change text color on hover
    next.on("pointerover", () => {
      next.setColor("#00ff00");
    });

    next.on("pointerout", () => {
      next.setColor("#ff0000");
    });

    // Interactive Text
    const back = this.add.text(centerX - 400, centerY + 250, "Back", {
      fontFamily: "Arial",
      fontSize: "32px",
      color: "#0000ff",
    });
    back.setOrigin(0.5);
    back.setAlpha(0); // Initially hide the text
    back.setInteractive();
    back.setDepth(30);

    // Change text color on hover
    back.on("pointerover", () => {
      back.setColor("#00ff00");
    });

    back.on("pointerout", () => {
      back.setColor("#0000ff");
    });

    // Show the dialogue_blue and interactive text after 1 seconds
    setTimeout(() => {
      dialogue_blue.setAlpha(1);
      next.setAlpha(1);
      auxiliar = true;
    }, 1500);

    const textArray = [" ", "I'm so sorry! Are you okay??"];

    let currentTextIndex = 0;

    const text = this.add.text(
      centerX,
      centerY + 200,
      textArray[currentTextIndex],
      {
        fontFamily: "Arial",
        fontSize: "32px",
        color: "#ffff00",
        padding: { x: 20, y: 20 },
        align: "center",
      }
    );
    text.setOrigin(0.5);
    text.setAlpha(0);
    text.setDepth(30);

    next.on("pointerdown", () => {
      text.setAlpha(1);
      currentTextIndex = (currentTextIndex + 1) % textArray.length;
      text.setText(textArray[currentTextIndex]);
      if (currentTextIndex === 1) {
        back.setAlpha(0);
      } else {
        back.setAlpha(1);
        blue.setAlpha(1); //BLUE APPEARS
      }

      if (currentTextIndex === 0) {
        next.setAlpha(0);
        blue.setAlpha(1); //BLUE APPEARS
        setTimeout(() => {
          this.add.tween({
            targets: pixelated,
            duration: 700,
            amount: 40,
            onComplete: () => {
              this.cameras.main.fadeOut(100);
              blue.setAlpha(0);
              this.scene.start("scene_4");
            },
          });
          // this.scene.start("scene_4");
        }, 1300);
      } else {
        next.setAlpha(1);
      }
    });

    back.on("pointerdown", () => {
      text.setAlpha(1);
      currentTextIndex =
        (currentTextIndex - 1 + textArray.length) % textArray.length;
      text.setText(textArray[currentTextIndex]);

      if (currentTextIndex === 1) {
        back.setAlpha(0);
      } else {
        back.setAlpha(1);
      }
      if (currentTextIndex === 0) {
        next.setAlpha(0);
      } else {
        next.setAlpha(1);
      }
    });
  }
}
