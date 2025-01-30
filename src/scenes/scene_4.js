import Phaser from "../lib/phaser.js";

export class scene_4 extends Phaser.Scene {
  constructor() {
    super({ key: "scene_4" });
  }

  preload() {
    this.cameras.main.fadeIn(100);
    const fxCamera = this.cameras.main.postFX.addPixelate(40);
    this.add.tween({
      targets: fxCamera,
      duration: 700,
      amount: -1,
    });
    this.load.image("ciudad_plano", "assets/ciudad_plano.png");
    // this.load.image("blue", "assets/blue.png");
    this.load.image("dialogue", "assets/dialogue.png");
    this.load.image("dialogue_blue", "assets/dialogue_blue.png");
    this.load.spritesheet("yellow", "assets/spritesheet_yellow.png", {
      frameWidth: 53, // Ancho de cada frame
      frameHeight: 97, // Altura de cada frame
    });
  }

  create() {
    let auxiliar = false;
    const pixelated = this.cameras.main.postFX.addPixelate(-1);

    //CIELO
    this.add
      .image(0, 0, "ciudad_plano")
      .setOrigin(0, 0)
      .setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);

    // Centra el texto en el canvas
    const centerX = this.sys.game.config.width / 2;
    const centerY = this.sys.game.config.height / 2;

    // PERSONAJES
    // Crear animaciones
    this.anims.create({
      key: "idle",
      frames: [{ key: "yellow", frame: 0 }],
      frameRate: 1,
      repeat: -1,
    });

    this.anims.create({
      key: "walk-down",
      frames: this.anims.generateFrameNumbers("yellow", {
        start: 0,
        end: 2,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "walk-left",
      frames: this.anims.generateFrameNumbers("yellow", {
        start: 3,
        end: 5,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "walk-right",
      frames: this.anims.generateFrameNumbers("yellow", {
        start: 3,
        end: 5,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "walk-up",
      frames: this.anims.generateFrameNumbers("yellow", {
        start: 6,
        end: 8,
      }),
      frameRate: 10,
      repeat: -1,
    });

    // Agregar personaje al juego
    this.yellow = this.physics.add.sprite(100, 200, "yellow");
    this.yellow.play("idle");

    // // Habilitar teclas de movimiento
    this.cursors = this.input.keyboard.createCursorKeys();
  }
  update() {
    if (this.cursors.left.isDown) {
      this.yellow.setVelocityX(-100);
      this.yellow.play("walk-left", true);
      this.yellow.flipX = false; // No voltear (los frames ya son correctos)
    } else if (this.cursors.right.isDown) {
      this.yellow.setVelocityX(100);
      this.yellow.play("walk-right", true);
      this.yellow.flipX = true; //Espejo para caminar a la derecha
    } else if (this.cursors.up.isDown) {
      this.yellow.setVelocityY(-100);
      this.yellow.play("walk-up", true);
    } else if (this.cursors.down.isDown) {
      this.yellow.setVelocityY(100);
      this.yellow.play("walk-down", true);
    } else {
      this.yellow.setVelocity(0);
      this.yellow.play("idle", true);
    }
    // if (cursors.up.isDown && yellow.body.touching.down) {
    //   yellow.setVelocityY(-330);
    // }
  }
}
