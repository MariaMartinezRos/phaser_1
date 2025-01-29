import Phaser from "../lib/phaser.js";

export class scene_2 extends Phaser.Scene {
  constructor() {
    super({ key: "scene_2" });
  }

  preload() {
    this.cameras.main.fadeIn(100);
    const fxCamera = this.cameras.main.postFX.addPixelate(40);
    this.add.tween({
      targets: fxCamera,
      duration: 700,
      amount: -1,
    });
    this.load.image("ciudad", "assets/ciudad.png");
    this.load.image("dialogue", "assets/dialogue.png");
  }

  create() {
    let auxiliar = false;
    const pixelated = this.cameras.main.postFX.addPixelate(-1);

    //CIELO
    this.add
      .image(0, 0, "ciudad")
      .setOrigin(0, 0)
      .setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);

    // Centra el texto en el canvas
    const centerX = this.sys.game.config.width / 2;
    const centerY = this.sys.game.config.height / 2;

    // DIALOGO
    const dialogue = this.add.image(centerX, centerY + 200, "dialogue");
    dialogue.setScale(1.6);
    dialogue.setAlpha(0); // Initially hide the dialogue

    // Interactive Text
    const next = this.add.text(centerX + 400, centerY + 250, "Next", {
      fontFamily: "Arial",
      fontSize: "32px",
      color: "#ff0000",
    });
    next.setOrigin(0.5);
    next.setAlpha(0); // Initially hide the text
    next.setInteractive();

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

    // Change text color on hover
    back.on("pointerover", () => {
      back.setColor("#00ff00");
    });

    back.on("pointerout", () => {
      back.setColor("#0000ff");
    });

    // Show the dialogue and interactive text after 1 seconds
    setTimeout(() => {
      dialogue.setAlpha(1);
      next.setAlpha(1);
      auxiliar = true;
    }, 1500);

    // Array of text strings
    const textArray = [
      "'  CRASH   '",
      "You take a short walk around the town.",
      "This is the last day of the summer, before classes start.",
      "...",
      "Parents, teachers, government - they all teach you",
      "how to live the dreary, deadening life of a slave,",
      "but nobody teaches you how to live normally.",
    ];

    // Current text index
    let currentTextIndex = 0;

    const text = this.add.text(
      centerX,
      centerY + 200,
      textArray[currentTextIndex],
      {
        fontFamily: "Arial",
        fontSize: "32px",
        color: "#ffff00",
        backgroundColor: "#000000",
        padding: { x: 20, y: 20 },
        align: "center",
      }
    );
    text.setOrigin(0.5);
    text.setAlpha(0); // Initially hide the text

    // Show the text when the next button is clicked
    next.on("pointerdown", () => {
      text.setAlpha(1);
      currentTextIndex = (currentTextIndex + 1) % textArray.length;
      text.setText(textArray[currentTextIndex]);
      // Show the back button if currentTextIndex is greater than 1
      if (currentTextIndex === 1) {
        back.setAlpha(0);
      } else {
        back.setAlpha(1);
      }

      // Hide the next button if currentTextIndex is the last index
      if (currentTextIndex === 0) {
        next.setAlpha(0);
        setTimeout(() => {
          this.scene.start("scene_3");
        }, 1000);
      } else {
        next.setAlpha(1);
      }
    });

    // Show the text when the back button is clicked
    back.on("pointerdown", () => {
      text.setAlpha(1);
      currentTextIndex =
        (currentTextIndex - 1 + textArray.length) % textArray.length;
      text.setText(textArray[currentTextIndex]);

      // Hide the back button if currentTextIndex is 1
      if (currentTextIndex === 1) {
        back.setAlpha(0);
      } else {
        back.setAlpha(1);
      }

      // Show the next button if currentTextIndex is not the last index
      if (currentTextIndex === 0) {
        next.setAlpha(0);
      } else {
        next.setAlpha(1);
      }

      // If the text Array is in position 0, then the scene changes
      // if (currentTextIndex === 0) {
      //   this.add.tween({
      //     targets: pixelated,
      //     duration: 700,
      //     amount: 40,
      //     onComplete: () => {
      //       this.cameras.main.fadeOut(100);
      //       this.scene.start("scene_3");
      //     },
      //   });
      // }
    });

    //when the text dialogue is finished, if you click anywehere on the screen, it will change the scene
    // if (currentTextIndex === 0) {
    //   sky.on("pointerdown", () => {
    //     this.add.tween({
    //       targets: pixelated,
    //       duration: 700,
    //       amount: 40,
    //       onComplete: () => {
    //         this.cameras.main.fadeOut(100);
    //         this.scene.start("scene_3");
    //       },
    //     });
    //   });
    // }
  }
}

// // Show the text when the dialogue is clicked
// red_dot.on("pointerdown", () => {
//   text.setAlpha(1);
// });

// PERSONAJES
// const blue = this.add.image(centerX + 400, centerY - 50, "blue");
// blue.setScale(0);
// blue.setAngle(0);

// BOTON START
// const start = this.add.text(centerX, centerY, "Play Game", {
//   fontFamily: "Arial",
//   fontSize: "32px",
//   color: "#ffff00",
//   backgroundColor: "#0000ff",
//   padding: { x: 16, y: 8 },
//   align: "center",
// });

// start.setOrigin(0.5);
// start.setInteractive({ useHandCursor: true });

// start.on("pointerover", () => {
//   start.setBackgroundColor("#00ff00");
// });

// start.on("pointerout", () => {
//   start.setBackgroundColor("#0000ff");
// });

// //CAMBIAR ESCENA
// start.on("pointerdown", () => {
// this.scene.start("scene_2");
// this.add.tween({
//   targets: pixelated,
//   duration: 700,
//   amount: 40,
//   onComplete: () => {
//     this.cameras.main.fadeOut(100);
//     this.scene.start("scene_3");
//   },
// });
// });
// const red_dot = this.add.image(centerX + 400, centerY + 250, "red_circle", {
//   scale: 0,
//   alpha: 0.5,
// });
// red_dot.setOrigin(0.5);
// red_dot.setAlpha(0);

// <!-- <!doctype html>
// <html lang="en">
//   <head>
//     <meta charset="UTF-8" />
//     <title>Scene 1</title>
//     <script src="//cdn.jsdelivr.net/npm/phaser@3.11.0/dist/phaser.js"></script>
//     <style type="text/css">
//       body {
//         margin: 0;
//       }
//     </style>
//   </head>
//   <body>
//     <script type="text/javascript">
//       var config = {
//         type: Phaser.AUTO,
//         width: window.innerWidth,
//         height: window.innerHeight,
//         scene: [Scene1],
//       };

//       class Scene1 extends Phaser.Scene {
//         constructor() {
//           super({ key: "Scene1" });
//         }

//         preload() {
//           this.load.image("ciudad", "assets/ciudad.png");
//         }

//         create() {
//           this.add
//             .image(
//               this.sys.game.config.width / 2,
//               this.sys.game.config.height / 2,
//               "ciudad"
//             )
//             .setOrigin(0.5);
//         }
//       }

//       const game = new Phaser.Game(config);
//     </script>
//   </body>
// </html> -->

// <!-- <!doctype html>
// <html lang="en">
//   <head>
//     <meta charset="UTF-8" />
//     <title>Scene 1</title>
//     <script src="//cdn.jsdelivr.net/npm/phaser@3.11.0/dist/phaser.js"></script>
//     <style type="text/css">
//       body {
//         margin: 0;
//       }
//     </style>
//   </head>
//   <body>
//     <script type="text/javascript">
//       var config = {
//         type: Phaser.AUTO,
//         width: window.innerWidth,
//         height: window.innerHeight,
//         scene: [Scene1],
//       };
//       class Scene1 extends Phaser.Scene {
//         constructor() {
//           super({ key: "Scene1" });
//         }

//         preload() {
//           this.load.image("ciudad", "assets/ciudad.png");
//         }

//         create() {
//           this.add
//             .image(
//               this.sys.game.config.width / 2,
//               this.sys.game.config.height / 2,
//               "ciudad"
//             )
//             .setOrigin(0.5);
//         }
//       }

//       const game = new Phaser.Game(config);
//     </script>
//   </body>
// </html> -->
