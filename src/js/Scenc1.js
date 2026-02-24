let h1 = document.getElementById("score");
var gameover = true;
var score = 0;
// Create a new Phaser game instance
class Scenc1 extends Phaser.Scene {
  constructor() {
    super({
      key: "Scenc1",
      physics: {
        default: "arcade",
        arcade: {
          gravity: {
            x: 0,
            y: 300,
          }, // no gravity for flying
          debug: false,
        },
      },
    });
  }

  preload() {
    // Load images for tilesets
    this.load.image("tiles1", "/assets/map/B1(1).png");
    this.load.image("tiles2", "/assets/map/B1(2).png");

    // Load tilemap JSON
    this.load.tilemapTiledJSON("map", "/assets/map/map.json");
    // Load player sprite
    this.load.spritesheet("Fly", "/assets/Bird1-1.png", {
      frameWidth: 16,
      frameHeight: 16,
    });
    // Load tile
    this.load.image("upTile", "/assets/upTile.png");
    this.load.image("downTile", "/assets/downTile.png");
  }

  create() {
    const map = this.make.tilemap({ key: "map" });
    // Match the "Name" field you set in Tiled with the key you loaded here
    const tileset1 = map.addTilesetImage("B1(1)", "tiles1", 0, 0);
    const tileset2 = map.addTilesetImage("B1(2)", "tiles2", 0, 0);
    // Add layers (names must match what you created in Tiled)

    this.tile = this.physics.add.group({
      allowGravity: false,
      immovable: true,
    });
    this.layer2 = map
      .createLayer("cloud", tileset2, 0, 0)
      .setInteractive({ useHandCursor: true })
      .on("pointerdown", () => {
        h1.style.visibility = "visible";
        this.Touch();
      });
    this.layer3 = map
      .createLayer("cloud1", tileset2, 0, 0)
      .setInteractive({ useHandCursor: true })
      .on("pointerdown", () => {
        this.Touch();
      });
    //tiles up and down
    this.upTile = this.tile.create(900, 600, "upTile");
    this.upTile.setScale(0.25).setDepth(5).setImmovable(true).refreshBody();
    this.downTile = this.tile.create(900, 0, "downTile");
    this.downTile.setScale(0.5).setDepth(5).setImmovable(true).refreshBody();
    //1
    this.upTile1 = this.tile.create(1100, 625, "upTile");
    this.upTile1.setScale(0.25).setDepth(5).setImmovable(true).refreshBody();
    this.downTile1 = this.tile.create(1100, 25, "downTile");
    this.downTile1.setScale(0.5).setDepth(5).setImmovable(true).refreshBody();
    //2
    this.upTile2 = this.tile.create(1300, 650, "upTile");
    this.upTile2.setScale(0.25).setDepth(5).setImmovable(true).refreshBody();
    this.downTile2 = this.tile.create(1300, 50, "downTile");
    this.downTile2.setScale(0.5).setDepth(5).setImmovable(true).refreshBody();
    //3
    this.upTile3 = this.tile.create(1500, 675, "upTile");
    this.upTile3.setScale(0.25).setDepth(5).setImmovable(true).refreshBody();
    this.downTile3 = this.tile.create(1500, 75, "downTile");
    this.downTile3.setScale(0.5).setDepth(5).setImmovable(true).refreshBody();
    // Create new pair
    this.layer1 = map
      .createLayer("background", tileset1, 0, 0)
      .setInteractive({ useHandCursor: true });
    // Add player
    this.player = this.physics.add.sprite(200, 300, "Fly");
    this.player.setScale(1.5).setDepth(10);

    //physic
    //animation
    this.anims.create({
      key: "fly",
      frames: this.anims.generateFrameNumbers("Fly", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });
    //collision
    // inside create()
    this.physics.add.collider(this.player, this.tile, this.hitTile, null, this);

    //button
    this.keyButton = this.input.keyboard.createCursorKeys();
    this.enterKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.ENTER,
    );
  }

  update() {
    this.player.setCollideWorldBounds(true);
    this.player.setBounce(0.2);
    this.player.play("fly", true);
    if (gameover) {
      this.movePlayer();

      // Move all tiles in the group
      this.moveTile(this.upTile, this.downTile, 3);
      this.moveTile(this.upTile1, this.downTile1, 3);
      this.moveTile(this.upTile2, this.downTile2, 3);
      this.moveTile(this.upTile3, this.downTile3, 3);
    }
    if (!gameover) {
      if (Phaser.Input.Keyboard.JustDown(this.enterKey)) {
        gameover = true;

        score = 0;
        h1.innerHTML = "Score: " + score;
        this.scene.restart();
      }
    }
    // //score boared
    this.scoreBoard(this.downTile);
    this.scoreBoard(this.downTile1);
    this.scoreBoard(this.downTile2);
    this.scoreBoard(this.downTile3);
  }
  hitTile(player, tile) {
    gameover = false;
    // console.log("Player hit tile, game paused!");

    // Pause physics (all movement stops)
    this.physics.pause();

    // Optional: make player look "dead"
    player.setTint(0xff0000);
    player.anims.pause();

    // Add button to restart the game
    let restartButton = this.add
      .text(400, 300, "Game Over", {
        fontSize: "32px",
        fill: "#ff0000ff",
        backgroundColor: "#d9ff00ff",
        padding: { x: 10, y: 5 },
      })
      .setOrigin(0.5)
      .setDepth(8);

    restartButton.setInteractive({ useHandCursor: true });
    restartButton.on("pointerup", () => {
      gameover = true;
      score = 0;
      h1.innerHTML = "Score: " + score;
      this.scene.restart();
    });
  }

  scoreBoard(tile) {
    // let numbre = tile.x;
    // console.log(numbre);
    if (tile.x <= 201 && tile.x >= 196) {
      score += 10;
      h1.innerHTML = "Score: " + score;
    }
  }

  moveTile(tiles1, tiles2, speed) {
    let valueX = 0;
    //fisrt tile
    tiles1.x -= speed;
    tiles2.x -= speed;
    if (tiles1.x < valueX && tiles2.x < valueX) {
      this.resetTile1(tiles1, tiles2); // create new pair
    }
    // console.log("Tile moved to x: " + tiles1.x);
  }
  resetTile1(tile, tile1) {
    let y1 = Math.floor(Math.random() * 100);
    let y2 = y1 + 600;
    tile.x = 900;
    tile.y = y2;

    tile1.x = 900;
    tile1.y = y1;
  }

  movePlayer() {
    if (this.keyButton.up.isDown) {
      this.player.setVelocityY(-100);
      this.player.angle = -60;
    } else if (this.keyButton.space.isDown) {
      this.player.setVelocityY(-100);
      this.player.angle = -30;
    } else {
      this.player.angle = 0;
    }
    if (this.keyButton.down.isDown) {
      this.player.setVelocityY(160);
      this.player.angle = 30;
    }
  }
  Touch() {
    this.player.setVelocityY(-100);
  }
}
// console.log("Scenc1 loaded");
