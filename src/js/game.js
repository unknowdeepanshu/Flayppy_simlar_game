const config = {
  type: Phaser.AUTO,
  parent: "game-container",
  width: 800,
  height: 600,
  scene: [Scenc2, Scenc1],
  backgroundColor: "#eeeeee",
  Physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
};
new Phaser.Game(config);
// console.log("Game is starting");
