const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
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
];

const coinPositions = [
  { x: 200, y: 550 },
  { x: 470, y: 360 },
  { x: 250, y: 120 },
];
function preload() {
  this.load.image('player', 'assets/images/vector_spaceships-01.png');
  this.load.image('coin', 'assets.images/star.png');
  this.load.image('spaceship', 'assets.images/spaceship.png');
  this.load.image('enemy', 'assets/images/enemy.png'); // Load enemy image
}

function create() {
  // Walls setup
  walls = this.physics.add.staticGroup();
  wallPositions.forEach(({ x1, y1, x2, y2 }) => {
    createWall(this, x1, y1, x2, y2);
  });

  // Create player
  player = this.physics.add.sprite(350, 575, 'player');
  player.setCollideWorldBounds(true);
  player.setDisplaySize(80, 70);

  // Add collision between player and walls
  this.physics.add.collider(player, walls);

  // Create coins
  coins = this.physics.add.group();
  coinPositions.forEach(coinPos => {
    createCoin(this, coinPos.x, coinPos.y);
  });

  // Score text
  scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#fff' });
  this.physics.add.overlap(player, coins, collectCoin, null, this);

  // Create spaceship
  spaceship = this.physics.add.sprite(0, 100, 'spaceship');
  spaceship.setCollideWorldBounds(true);
  spaceship.setDisplaySize(100, 100);
  this.physics.add.overlap(player, spaceship, winGame, null, this);

  // Create enemy
  enemy = this.physics.add.sprite(400, 430, 'enemy');
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
  coin.disableBody(true, true);
  score += 1;
  scoreText.setText('Score: ' + score);

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
