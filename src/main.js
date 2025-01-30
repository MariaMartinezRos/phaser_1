import Phaser from "./lib/phaser.js";
import { scene_1 } from "./scenes/scene_1.js";
import { scene_2 } from "./scenes/scene_2.js";
import { scene_3 } from "./scenes/scene_3.js";
import { scene_4 } from "./scenes/scene_4.js";

var game;
var canvas;
window.onload = function () {
  var game_config = {
    type: Phaser.AUTO,
    roundPixels: false,
    pixelArt: true,
    scale: {
      parent: "game-container",
      width: window.innerWidth,
      height: window.innerHeight,
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },

    physics: {
      default: "arcade",
      arcade: {
        gravity: { y: 0, x: 0 },
        debug: false,
      },
    },
    scene: [scene_1, scene_2, scene_3, scene_4],
  };

  game = new Phaser.Game(game_config);

  game.scene.start("scene_1");

  window.focus();
  resizeGame();
  window.addEventListener("resize", resizeGame);
};

function resizeGame() {
  canvas = document.querySelector("canvas");

  var window_width = window.innerWidth;
  var window_height = window.innerHeight;
  var window_ratio = window_width / window_height;
  var game_ration = game.config.width / game.config.height;

  if (window_ratio < game_ration) {
    canvas.style.width = window_width + "px";
    canvas.style.height = window_width / game_ration + "px";
  } else {
    canvas.style.width = window_height * game_ration + "px";
    canvas.style.height = window_height + "px";
  }
}
