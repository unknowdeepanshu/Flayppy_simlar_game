
const config ={
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [ Scenc2, Scenc1],
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