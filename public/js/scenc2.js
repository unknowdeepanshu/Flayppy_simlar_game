import Phaser from "phaser";
class Scenc2 extends Phaser.Scene {
    constructor(){
        super({ key: "Scenc2",
            physics: {
                default: "arcade",
                arcade: {
                    gravity: { 
                        x: 0,
                        y: 0 },  // no gravity for flying
                    debug: false
                }
            }
         });
    }
    preload(){
        // Load images for tilesets
        this.load.image("tiles1","assets/map/B1(1).png");
        this.load.image("tiles2","assets/map/B1(2).png");

        // Load tilemap JSON
        this.load.tilemapTiledJSON("map", "assets/map/map.json");
        // Load player sprite
        this.load.spritesheet("Fly","assets/Bird1-1.png",{frameWidth:16,frameHeight:16});
    
        
    }
    create(){
        let h1 = document.getElementById("score");
        h1.style.visibility = 'hidden';
        // map creation
        const map = this.make.tilemap({ key: "map" });
        // Match the "Name" field you set in Tiled with the key you loaded here
        const tileset1 = map.addTilesetImage("B1(1)", "tiles1",0,0);
        const tileset2 = map.addTilesetImage("B1(2)", "tiles2",0,0);
        //layers of map from tiled
        this.layer2 = map.createLayer("cloud", tileset2, 0, 0);
        this.layer3 = map.createLayer("cloud1", tileset2, 0, 0);
        this.layer1 = map.createLayer("background", tileset1, 0, 0);
        //player
        this.player = this.physics.add.sprite(200, 300, "Fly");
        this.player.setScale(1.5).setDepth(10);

        // Add a text button
        let nextButton = this.add.text(400, 300, "Start", {
            fontSize: "32px",
            fill: "#ff0000ff",
            backgroundColor: "#d9ff00ff",
            padding: { x: 10, y: 5 }
        }).setOrigin(0.5);

        // Make it interactive
        nextButton.setInteractive({ useHandCursor: true });

        // When clicked → go to next scene
        nextButton.on("pointerdown", () => {
            h1.style.visibility = 'visible';
            this.scene.start("Scenc1");
        });
    }
    update(){

       this.player.setCollideWorldBounds(true);
    }    
    }

