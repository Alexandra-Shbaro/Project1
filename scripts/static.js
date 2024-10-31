const wallPositions = [
  // Bottom boundary wall (horizontal)
  { x1: 100, y1: 0, x2: 100, y2: 400, color: 0xff0000 },
  { x1: 100, y1: 500, x2: 100, y2: 700, color: 0xff0000 },
  { x1: 100, y1: 800, x2: 100, y2: 900, color: 0xff0000 },
  { x1: 100, y1: 100, x2: 100, y2: 300, color: 0xff0000 },
  { x1: 200, y1: 400, x2: 200, y2: 500, color: 0xff0000 },
  { x1: 200, y1: 700, x2: 200, y2: 800, color: 0xff0000 },
  { x1: 200, y1: 900, x2: 200, y2: 1000, color: 0xff0000 },
  { x1: 300, y1: 0, x2: 300, y2: 100, color: 0xff0000 },
  { x1: 300, y1: 300, x2: 300, y2: 400, color: 0xff0000 },
  { x1: 300, y1: 800, x2: 300, y2: 900, color: 0xff0000 },
  { x1: 400, y1: 0, x2: 400, y2: 200, color: 0xff0000 },
  { x1: 400, y1: 300, x2: 400, y2: 500, color: 0xff0000 },
  { x1: 400, y1: 700, x2: 400, y2: 1000, color: 0xff0000 },
  { x1: 500, y1: 100, x2: 500, y2: 300, color: 0xff0000 },
  { x1: 500, y1: 400, x2: 500, y2: 600, color: 0xff0000 },
  { x1: 500, y1: 700, x2: 500, y2: 900, color: 0xff0000 },
  { x1: 600, y1: 100, x2: 600, y2: 200, color: 0xff0000 },
  { x1: 600, y1: 500, x2: 600, y2: 800, color: 0xff0000 },
  { x1: 600, y1: 900, x2: 600, y2: 1000, color: 0xff0000 },
  { x1: 700, y1: 0, x2: 700, y2: 200, color: 0xff0000 },
  { x1: 700, y1: 400, x2: 700, y2: 500, color: 0xff0000 },
  { x1: 700, y1: 600, x2: 700, y2: 700, color: 0xff0000 },
  { x1: 700, y1: 800, x2: 700, y2: 900, color: 0xff0000 },
  { x1: 800, y1: 100, x2: 800, y2: 600, color: 0xff0000 },
  { x1: 800, y1: 700, x2: 800, y2: 800, color: 0xff0000 },
  { x1: 900, y1: 200, x2: 900, y2: 300, color: 0xff0000 },
  { x1: 900, y1: 500, x2: 900, y2: 400, color: 0xff0000 },
  { x1: 900, y1: 600, x2: 900, y2: 700, color: 0xff0000 },
  { x1: 0, y1: 500, x2: 110, y2: 500, color: 0xff0000 },

  { x1: 90, y1: 400, x2: 210, y2: 400, color: 0xff0000 },
  { x1: 190, y1: 500, x2: 410, y2: 500, color: 0xff0000 },
  { x1: 100, y1: 600, x2: 510, y2: 600, color: 0xff0000 },
  { x1: 490, y1: 400, x2: 710, y2: 400, color: 0xff0000 },
  { x1: 290, y1: 300, x2: 810, y2: 300, color: 0xff0000 },
  { x1: 200, y1: 200, x2: 410, y2: 200, color: 0xff0000 },
  { x1: 590, y1: 200, x2: 710, y2: 200, color: 0xff0000 },
  { x1: 790, y1: 100, x2: 900, y2: 100, color: 0xff0000 },
  { x1: 890, y1: 300, x2: 1000, y2: 300, color: 0xff0000 },
  { x1: 590, y1: 500, x2: 710, y2: 500, color: 0xff0000 },
  { x1: 790, y1: 500, x2: 910, y2: 500, color: 0xff0000 },
  { x1: 690, y1: 600, x2: 810, y2: 600, color: 0xff0000 },
  { x1: 190, y1: 700, x2: 410, y2: 700, color: 0xff0000 },
  { x1: 690, y1: 700, x2: 810, y2: 700, color: 0xff0000 },
  { x1: 890, y1: 700, x2: 1000, y2: 700, color: 0xff0000 },
  { x1: 90, y1: 800, x2: 210, y2: 800, color: 0xff0000 },
  { x1: 500, y1: 800, x2: 710, y2: 800, color: 0xff0000 },
  { x1: 790, y1: 800, x2: 900, y2: 800, color: 0xff0000 },
  { x1: 190, y1: 900, x2: 310, y2: 900, color: 0xff0000 },
  { x1: 690, y1: 900, x2: 900, y2: 900, color: 0xff0000 },
]
const coinPositions = [
  { x: 300, y: 550 },
  { x: 870, y: 360 },
  { x: 250, y: 120 },
];
const config = {
  type: Phaser.AUTO,
  backgroundColor: '#050724',
  width: 1000,
  height: 1000,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: 0,
      debug: false // Set to true if you want to see debug visuals
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

const game = new Phaser.Game(config);
let player;
let walls;
let coins;
let spaceship;
let score = 0;
let scoreText;
//let characterChoosen = slides[currentSlide].querySelector("img").src;
console.log(characterChoosen);

/*
const wallPositions = [
  // Bottom boundary wall (horizontal)
  { x1: 0, y1: 575, x2: 300, y2: 575, color: 0xff0000 },
  { x1: 400, y1: 575, x2: 800, y2: 575, color: 0xff0000 },
  { x1: 400, y1: 585, x2: 400, y2: 470, color: 0xff0000 },
  { x1: 250, y1: 470, x2: 650, y2: 470, color: 0xff0000 },
  { x1: 350, y1: 470, x2: 350, y2: 380, color: 0xff0000 },
  { x1: 600, y1: 470, x2: 600, y2: 380, color: 0xff0000 },
  { x1: 340, y1: 380, x2: 450, y2: 400, color: 0xff0000 },
  { x1: 0, y1: 300, x2: 220, y2: 300, color: 0xff0000 },
  { x1: 330, y1: 300, x2: 600, y2: 300, color: 0xff0000 },
  { x1: 220, y1: 310, x2: 220, y2: 220, color: 0xff0000 },
  { x1: 330, y1: 310, x2: 330, y2: 160, color: 0xff0000 },
  { x1: 0, y1: 160, x2: 340, y2: 160 },
  { x1: 500, y1: 140, x2: 800, y2: 140 },
];*/
/*const wallPositions = [
  // Bottom boundary wall (horizontal)
  { x1: 100, y1: 900, x2: 100, y2: 800, color: 0xff0000 },
  { x1: 700, y1: 900, x2: 700, y2: 700, color: 0xff0000 },
  { x1: 200, y1: 800, x2: 300, y2: 800, color: 0xff0000 },
  { x1: 400, y1: 800, x2: 600, y2: 800, color: 0xff0000 },
  { x1: 800, y1: 800, x2: 900, y2: 800, color: 0xff0000 },
  { x1: 200, y1: 810, x2: 200, y2: 700, color: 0xff0000 },
  { x1: 400, y1: 810, x2: 400, y2: 700, color: 0xff0000 },
  { x1: 500, y1: 810, x2: 500, y2: 700, color: 0xff0000 },
  { x1: 800, y1: 810, x2: 800, y2: 700, color: 0xff0000 },
  { x1: 900, y1: 810, x2: 900, y2: 600, color: 0xff0000 },
  { x1: 100, y1: 700, x2: 100, y2: 600, color: 0xff0000 },
  { x1: 90, y1: 600, x2: 300, y2: 600, color: 0xff0000 },
  { x1: 190, y1: 700, x2: 410, y2: 700, color: 0xff0000 },
  { x1: 600, y1: 700, x2: 700, y2: 710, color: 0xff0000 },
  { x1: 300, y1: 700, x2: 300, y2: 590, color: 0xff0000 },
  { x1: 500, y1: 700, x2: 500, y2: 590, color: 0xff0000 },
  { x1: 900, y1: 700, x2: 900, y2: 590, color: 0xff0000 },
  { x1: 500, y1: 600, x2: 900, y2: 600, color: 0xff0000 },
  { x1: 600, y1: 600, x2: 600, y2: 500, color: 0xff0000 },
  { x1: 800, y1: 600, x2: 800, y2: 400, color: 0xff0000 },
  { x1: 0, y1: 500, x2: 300, y2: 500, color: 0xff0000 },
  { x1: 400, y1: 500, x2: 450, y2: 500, color: 0xff0000 },
  { x1: 800, y1: 500, x2: 900, y2: 500, color: 0xff0000 },
  { x1: 450, y1: 550, x2: 450, y2: 450, color: 0xff0000 },
  { x1: 200, y1: 500, x2: 200, y2: 400, color: 0xff0000 },
  { x1: 400, y1: 500, x2: 400, y2: 500, color: 0xff0000 },
  { x1: 100, y1: 400, x2: 210, y2: 400, color: 0xff0000 },
  { x1: 400, y1: 450, x2: 600, y2: 450, color: 0xff0000 },
  { x1: 700, y1: 400, x2: 1000, y2: 400, color: 0xff0000 },
  { x1: 700, y1: 500, x2: 700, y2: 300, color: 0xff0000 },

  { x1: 900, y1: 400, x2: 900, y2: 300, color: 0xff0000 },
  { x1: 900, y1: 200, x2: 900, y2: 0, color: 0xff0000 },
  { x1: 800, y1: 300, x2: 910, y2: 300, color: 0xff0000 },
  { x1: 200, y1: 400, x2: 200, y2: 250, color: 0xff0000 },
  { x1: 550, y1: 460, x2: 550, y2: 200, color: 0xff0000 },
  { x1: 300, y1: 300, x2: 300, y2: 0, color: 0xff0000 },
  { x1: 800, y1: 310, x2: 800, y2: 100, color: 0xff0000 },
  { x1: 650, y1: 200, x2: 650, y2: 0, color: 0xff0000 },
  { x1: 500, y1: 200, x2: 660, y2: 200, color: 0xff0000 },
  { x1: 650, y1: 200, x2: 650, y2: 0, color: 0xff0000 },
  { x1: 0, y1: 200, x2: 150, y2: 200, color: 0xff0000 },
  { x1: 300, y1: 100, x2: 500, y2: 100, color: 0xff0000 },

];*/

function preload() {
  this.load.image('player', '/assets/images/star.png');
  this.load.image('coin', './assets/images/star.png');
  this.load.image('spaceship', './assets/images/spaceship.png');
  this.load.image('enemy', './assets/images/enemy.png'); // Load enemy image
}

function create() {
  const border = this.add.graphics();
  border.lineStyle(5, 0xff0000, 1);  // Sets line thickness and color
  border.strokeRect(0, 0, this.game.config.width, this.game.config.height);
  // Walls setup
  walls = this.physics.add.staticGroup();
  this.cameras.main.setBounds(0, 0, 2000, 1800);

  wallPositions.forEach(({ x1, y1, x2, y2 }) => {
    createWall(this, x1, y1, x2, y2);
  });

  // Create player
  player = this.physics.add.sprite(50, 50, 'player');
  player.setCollideWorldBounds(true);
  player.setDisplaySize(80, 70);
  this.cameras.main.startFollow(player);

  // Add collision between player and walls
  this.physics.add.collider(player, walls);

  // Create coins
  coins = this.physics.add.group();
  coinPositions.forEach(coinPos => {
    createCoin(this, coinPos.x, coinPos.y);
  });

  // Score text
  this.physics.add.overlap(player, coins, collectCoin, null, this);

  // Create spaceship
  spaceship = this.physics.add.sprite(150, 50, 'spaceship');
  spaceship.setCollideWorldBounds(true);
  spaceship.setDisplaySize(100, 100);
  this.physics.add.overlap(player, spaceship, winGame, null, this);

  // Create enemy
  enemy = this.physics.add.sprite(800, 950, 'enemy');
  enemy.setCollideWorldBounds(true);
  enemy.setVelocityX(100); // Set enemy's initial speed
  enemy.setBounce(1, 1); // Make enemy bounce off walls
  this.physics.add.collider(enemy, walls); // Enemy bounces off walls
  this.physics.add.overlap(player, enemy, loseGame, null, this); // Collision causes game over

  // Set up cursor keys
  cursors = this.input.keyboard.createCursorKeys();
}

function createWall(scene, x1, y1, x2, y2) {
  const width = Math.abs(x2 - x1) || 20;
  const height = Math.abs(y2 - y1) || 20;
  const centerX = (x1 + x2) / 2;
  const centerY = (y1 + y2) / 2;

  const wall = scene.physics.add.staticImage(centerX, centerY, null);
  wall.setSize(width, height);
  wall.setDisplaySize(width, height);

  // Visualize the wall
  const wallGraphics = scene.add.graphics();
  wallGraphics.fillStyle(0x808080, 1); // Gray color for all walls
  wallGraphics.fillRect(centerX - width / 2, centerY - height / 2, width, height);

  walls.add(wall);
}

function createCoin(scene, x, y) {
  const coin = scene.physics.add.sprite(x, y, 'coin');
  coin.setDisplaySize(20, 20);
  coin.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
  coins.add(coin);
}

function collectCoin(player, coin) {
  const scoreElement = document.getElementById('score'); // Select the score element

  coin.disableBody(true, true);
  score += 1;
  scoreElement.textContent = 'Score: ' + score;

  if (coins.countActive(true) === 0) {
    coins.children.iterate((child) => {
      child.enableBody(true, child.x, 0, true, true);
    });
  }
}

function winGame(player, spaceship) {
  this.physics.pause();
  scoreText.setText('You Win! Score: ' + score);
}

function loseGame() {
  this.physics.pause();
  scoreText.setText('Game Over! Score: ' + score);
}

function update() {
  // Player movement
  if (cursors.left.isDown) {
    player.setVelocityX(-160);
  } else if (cursors.right.isDown) {
    player.setVelocityX(160);
  } else {
    player.setVelocityX(0);
  }

  if (cursors.up.isDown) {
    player.setVelocityY(-160);
  } else if (cursors.down.isDown) {
    player.setVelocityY(160);
  } else {
    player.setVelocityY(0);
  }
}
