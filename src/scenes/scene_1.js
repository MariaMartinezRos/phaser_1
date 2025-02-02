import Phaser from "../lib/phaser.js";

export class scene_1 extends Phaser.Scene {
  constructor() {
    super({ key: "scene_1" });
  }

  preload() {
    this.cameras.main.fadeIn(100);
    const fxCamera = this.cameras.main.postFX.addPixelate(40);
    this.add.tween({
      targets: fxCamera,
      duration: 700,
      amount: -1,
    });
    this.load.image("sky", "assets/sky.png");
  }

  create() {
    // ///////////////////////////////////////////////
    this.scene.start("scene_4");
    ///////////////////////////////////////////////

    const pixelated = this.cameras.main.postFX.addPixelate(-1);
    //CIELO
    this.add
      .image(0, 0, "sky")
      .setOrigin(0, 0)
      .setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);

    // Centra el texto en el canvas
    const centerX = this.sys.game.config.width / 2;
    const centerY = this.sys.game.config.height / 2;

    // BOTON START
    const start = this.add.text(centerX, centerY, "Play Game", {
      fontFamily: "Arial",
      fontSize: "32px",
      color: "#ffff00",
      backgroundColor: "#0000ff",
      padding: { x: 16, y: 8 },
      align: "center",
    });

    start.setOrigin(0.5);
    start.setInteractive({ useHandCursor: true });

    start.on("pointerover", () => {
      start.setBackgroundColor("#00ff00");
    });

    start.on("pointerout", () => {
      start.setBackgroundColor("#0000ff");
    });

    //CAMBIAR ESCENA
    start.on("pointerdown", () => {
      // this.scene.start("scene_2");
      this.add.tween({
        targets: pixelated,
        duration: 700,
        amount: 40,
        onComplete: () => {
          this.cameras.main.fadeOut(100);
          this.scene.start("scene_2");
        },
      });
    });
  }
}

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
