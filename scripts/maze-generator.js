const mazeWidth = 8;  // Number of columns
const mazeHeight = 12;  // Number of rows
const cellSize = 50;  // Size of each cell
class MazeScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MazeScene' });
    this.grid = [];  // 2D array for cells
    this.walls = [];  // Array of walls
    this.sets = [];  // Disjoint set for each cell
    this.path = [];  // Array to store the path from start to end
  }

  preload() {
    // Load the images for start, end, and coins
    this.load.image('startImage', './scripts/vector_spaceships-01.png');  // Replace with actual path to start image
    this.load.image('endImage', './scripts/vector_spaceships-01.png');  // Replace with actual path to end image
    this.load.image('coin', './scripts/vector_spaceships-01.png');  // Replace with actual path to coin image
  }

  create() {
    this.initializeGrid();
    this.initializeWalls();
    this.randomizedKruskal();
    this.renderMaze();

    // Set the start and end points
    const start = { row: 0, col: 0 };
    const end = { row: mazeHeight - 1, col: mazeWidth - 1 };

    // Find the correct path from start to end
    this.path = this.findPath(start, end);

    // Add start and end images
    this.startImage = this.addStartEndImages(start, end);

    // Render the path with coins
    this.renderPathWithCoins();
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  initializeGrid() {
    for (let row = 0; row < mazeHeight; row++) {
      this.grid[row] = [];
      for (let col = 0; col < mazeWidth; col++) {
        this.grid[row][col] = { top: true, right: true, bottom: true, left: true };
        this.sets.push({ row, col });
      }
    }
  }

  initializeWalls() {
    for (let row = 0; row < mazeHeight; row++) {
      for (let col = 0; col < mazeWidth; col++) {
        if (row < mazeHeight - 1) {
          this.walls.push({ cellA: { row, col }, cellB: { row: row + 1, col }, direction: 'bottom' });
        }
        if (col < mazeWidth - 1) {
          this.walls.push({ cellA: { row, col }, cellB: { row, col: col + 1 }, direction: 'right' });
        }
      }
    }
    Phaser.Utils.Array.Shuffle(this.walls);
  }

  randomizedKruskal() {
    const cellId = (cell) => cell.row * mazeWidth + cell.col;

    const findSet = (cell) => this.sets[cellId(cell)];
    const unionSets = (cellA, cellB) => {
      const setA = findSet(cellA);
      const setB = findSet(cellB);

      if (setA !== setB) {
        for (let i = 0; i < this.sets.length; i++) {
          if (this.sets[i] === setB) {
            this.sets[i] = setA;
          }
        }
      }
    };

    while (this.walls.length) {
      const wall = this.walls.pop();
      const setA = findSet(wall.cellA);
      const setB = findSet(wall.cellB);

      if (setA !== setB) {
        this.grid[wall.cellA.row][wall.cellA.col][wall.direction] = false;
        const oppositeDirection = wall.direction === 'bottom' ? 'top' : 'left';
        this.grid[wall.cellB.row][wall.cellB.col][oppositeDirection] = false;
        unionSets(wall.cellA, wall.cellB);
      }
    }
  }

  findPath(start, end) {
    const visited = new Set();
    const path = [];

    const dfs = (cell) => {
      const { row, col } = cell;
      const cellKey = `${row},${col}`;
      if (visited.has(cellKey)) return false;
      visited.add(cellKey);
      path.push(cell);

      if (row === end.row && col === end.col) return true;

      const neighbors = [
        { row: row - 1, col, direction: 'top' },
        { row, col: col + 1, direction: 'right' },
        { row: row + 1, col, direction: 'bottom' },
        { row, col: col - 1, direction: 'left' }
      ];

      for (const { row: nRow, col: nCol, direction } of neighbors) {
        if (
          nRow >= 0 && nRow < mazeHeight &&
          nCol >= 0 && nCol < mazeWidth &&
          !this.grid[row][col][direction]
        ) {
          if (dfs({ row: nRow, col: nCol })) return true;
        }
      }
      path.pop();
      return false;
    };

    dfs(start);
    return path;
  }

  addStartEndImages(start, end) {
    const startX = start.col * cellSize + cellSize / 2;
    const startY = start.row * cellSize + cellSize / 2;
    const endX = end.col * cellSize + cellSize / 2;
    const endY = end.row * cellSize + cellSize / 2;

    // Add start image
    const startImage = this.add.image(startX, startY, 'startImage').setDisplaySize(cellSize, cellSize);

    // Add end image
    this.add.image(endX, endY, 'endImage').setDisplaySize(cellSize, cellSize);

    return startImage; // Return startImage for future use
  }

  renderMaze() {
    for (let row = 0; row < mazeHeight; row++) {
      for (let col = 0; col < mazeWidth; col++) {
        const x = col * cellSize;
        const y = row * cellSize;
        const cell = this.grid[row][col];

        if (cell.top) this.add.line(x + cellSize / 2, y, 0, 0, cellSize, 0, 0xffffff).setOrigin(0);
        if (cell.right) this.add.line(x + cellSize, y + cellSize / 2, 0, 0, 0, cellSize, 0xffffff).setOrigin(0);
        if (cell.bottom) this.add.line(x + cellSize / 2, y + cellSize, 0, 0, cellSize, 0, 0xffffff).setOrigin(0);
        if (cell.left) this.add.line(x, y + cellSize / 2, 0, 0, 0, cellSize, 0xffffff).setOrigin(0);
      }
    }
  }

  renderPathWithCoins() {
    // Start rendering coins after the starting point
    for (let i = 1; i < this.path.length - 1; i++) {
      const { row, col } = this.path[i];
      const x = col * cellSize + cellSize / 2;
      const y = row * cellSize + cellSize / 2;

      // Add a coin image
      this.add.image(x, y, 'coin').setDisplaySize(cellSize / 2, cellSize / 2);
    }
  }


  moveStartSprite() {
    const speed = 5; // Speed of movement

    if (this.cursors.left.isDown) {
      this.startImage.x -= speed;
    }
    if (this.cursors.right.isDown) {
      this.startImage.x += speed;
    }
    if (this.cursors.up.isDown) {
      this.startImage.y -= speed;
    }
    if (this.cursors.down.isDown) {
      this.startImage.y += speed;
    }
  }

  update() {
    this.moveStartSprite();
  }
}


const config = {
  type: Phaser.AUTO,
  width: mazeWidth * cellSize,
  height: mazeHeight * cellSize,
  backgroundColor: '#050724',
  scene: MazeScene
};

const game = new Phaser.Game(config);
