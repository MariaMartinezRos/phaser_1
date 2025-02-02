import Phaser from "../lib/phaser.js";

export class scene_4 extends Phaser.Scene {
  constructor() {
    super({ key: "scene_4" });
    this.locked = true;
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
    this.load.image("ciudad_plano_arbol", "assets/ciudad_plano_arbol.png");

    // this.load.image("sprite_blue", "assets/sprite_blue.png");
    this.load.image("dialogue", "assets/dialogue.png");
    this.load.image("dialogue_sprite_blue", "assets/dialogue_sprite_blue.png");
    this.load.spritesheet("sprite_yellow", "assets/spritesheet_yellow.png", {
      frameWidth: 53, // Ancho de cada frame
      frameHeight: 97, // Altura de cada frame
    });
    this.load.spritesheet("sprite_blue", "assets/spritesheet_blue.png", {
      frameWidth: 53,
      frameHeight: 97,
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

    //sprite_blue
    this.anims.create({
      key: "idle-sprite_blue",
      frames: [{ key: "sprite_blue", frame: 0 }],
      frameRate: 1,
      repeat: -1,
    });

    //sprite_yellow
    this.anims.create({
      key: "idle",
      frames: [{ key: "sprite_yellow", frame: 0 }],
      frameRate: 1,
      repeat: -1,
    });

    this.anims.create({
      key: "walk-down",
      frames: this.anims.generateFrameNumbers("sprite_yellow", {
        start: 0,
        end: 2,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "walk-left",
      frames: this.anims.generateFrameNumbers("sprite_yellow", {
        start: 3,
        end: 5,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "walk-right",
      frames: this.anims.generateFrameNumbers("sprite_yellow", {
        start: 3,
        end: 5,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "walk-up",
      frames: this.anims.generateFrameNumbers("sprite_yellow", {
        start: 6,
        end: 8,
      }),
      frameRate: 10,
      repeat: -1,
    });

    // Agregar personaje al juego
    this.sprite_yellow = this.physics.add.sprite(1200, 470, "sprite_yellow");
    // this.sprite_yellow.angle = -50; // Rotar 45 grados en sentido horario
    this.sprite_yellow.play("idle");

    this.sprite_blue = this.physics.add.sprite(1300, 430, "sprite_blue");
    this.sprite_blue.play("idle-sprite_blue");

    // Dialogos

    // // Dialogo azul
    // this.dialogue_sprite_blue = this.add.image(
    //   centerX - 200,
    //   centerY - 100,
    //   "dialogue_sprite_blue"
    // );
    // this.dialogue_sprite_blue.setScale(0.5);
    // this.dialogue_sprite_blue.alpha = 0;
    // this.dialogue_sprite_blue.setInteractive();
    // this.dialogue_sprite_blue.on("pointerdown", () => {
    //   this.dialogue_sprite_blue.alpha = 0;
    //   auxiliar = true;
    // });
    // // Dialogo amarillo
    // this.dialogue = this.add.image(centerX + 200, centerY - 100, "dialogue");
    // this.dialogue.setScale(0.5);
    // this.dialogue.alpha = 0;
    // this.dialogue.setInteractive();
    // this.dialogue.on("pointerdown", () => {
    //   this.dialogue.alpha = 0;
    //   auxiliar = false;
    // });

    // // Habilitar teclas de movimiento
    this.cursors = this.input.keyboard.createCursorKeys();

    // ARBOL
    this.add
      .image(0, 0, "ciudad_plano_arbol")
      .setOrigin(0, 0)
      .setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);
  }
  update() {
    if (this.locked) {
      if (this.cursors.left.isDown) {
        this.sprite_yellow.setVelocityX(-100);
        this.sprite_yellow.play("walk-left", true);
        this.sprite_yellow.flipX = false; // No voltear (los frames ya son correctos)
      } else if (this.cursors.right.isDown) {
        this.sprite_yellow.setVelocityX(100);
        this.sprite_yellow.play("walk-right", true);
        this.sprite_yellow.flipX = true; //Espejo para caminar a la derecha
      } else if (this.cursors.up.isDown) {
        this.sprite_yellow.setVelocityY(-100);
        this.sprite_yellow.play("walk-up", true);
      } else if (this.cursors.down.isDown) {
        this.sprite_yellow.setVelocityY(100);
        this.sprite_yellow.play("walk-down", true);
      } else {
        this.sprite_yellow.setVelocity(0);
        this.sprite_yellow.play("idle", true);
      }
    }
    // if (cursors.up.isDown && sprite_yellow.body.touching.down) {
    //   sprite_yellow.setVelocityY(-330);
    // }
  }
}
