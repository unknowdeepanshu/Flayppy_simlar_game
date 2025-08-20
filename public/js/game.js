
const config ={
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [ S2,bootGame],
    backgroundColor: "#eeeeee",
    Physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 300 }, // No gravity for top-down maps
            debug: true
        }
    },
}
new Phaser.Game(config)