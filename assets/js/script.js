// Const variables
const canvas = document.getElementById('canvas');
const context = canvas.getContext("2d");
const SCREENWIDTH = 1280;
const SCREENHEIGHT = 720;
const FOV = toRadians(60);
const fps = 30;
const CELL_SIZE = 64;
const PLAYER_SIZE = 10;
const map = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 0, 0, 1, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 1, 0, 0, 0, 1, 0, 1],
    [1, 0, 0, 1, 1, 1, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1]
];
const player = {
    x: CELL_SIZE * 1.5,
    y: CELL_SIZE * 2,
    angle: toRadians(0),
    speed: 0
};
const COLORS = {
    rays: "#ffa600",
}

// Functions
function clearScreen() {
    context.fillStyle = "blue";
    context.fillRect(0, 0, SCREENWIDTH, SCREENHEIGHT);
}

function movePlayer() {
    player.x += Math.cos(player.angle) * player.speed;
    player.y += Math.sin(player.angle) * player.speed;
}

function outOfBounds(x, y) {
    return x < 0 || x > map[0].length || y < 0 || y > map.length;
}

function distance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

function getVerticalCol(angle) {
    const right = Math.abs(Math.floor((angle - Math.PI / 2) / Math.PI) % 2);
    const firstX = right ? Math.floor(player.x / CELL_SIZE) * CELL_SIZE + CELL_SIZE : Math.floor(player.x / CELL_SIZE) * CELL_SIZE;
    const firstY = player.y + (firstX - player.x) * Math.tan(angle);
    const horizontalStep = right ? CELL_SIZE : - CELL_SIZE;
    const verticalStep = horizontalStep * Math.tan(angle);

    let wall;
    let nextX = firstX;
    let nextY = firstY;

    while (!wall) {
        const cellX = right ? Math.floor(nextX / CELL_SIZE) : Math.floor(nextX / CELL_SIZE) - 1;
        const cellY = Math.floor(nextY / CELL_SIZE);

        if (outOfBounds(cellX, cellY)) {
            break;
        }
        wall = map[cellX][cellY];
        if (!wall) {
            nextX += horizontalStep;
            nextY += verticalStep;
        }
    }
    return {angle, distance: distance(player.x, player.y, nextX, nextY), vertical: true};
}

function castRay(angle) {
    const verticalCol = getVerticalCol(angle);
    // const horizontalCol = getHorizontalCol(angle);

    return verticalCol;

    return verticalCol.distance > horizontalCol.distance ? verticalCol : horizontalCol;
}

function getRaycast() {
    const initialAngle = player.angle - FOV / 2;
    const numOfRays = SCREENWIDTH;
    const angleStep = FOV / numOfRays;
    return Array.from({length: numOfRays}, (_, i) => {
        const angle = initialAngle + i * angleStep;
        const ray = castRay(angle);
        return ray;
    });
}

function renderWorld(raycast) {

}

function renderMinimap(posX = 0, posY = 0, scale = 1, raycast) {
    const cellSize = scale * CELL_SIZE;
    map.forEach((row, y) => {
        row.forEach((cell, x) => {
            if (cell) {
                context.fillStyle = "white";
                context.fillRect(posX + x * cellSize, posY + y * cellSize, cellSize, cellSize);
            }
        });
    });

    context.strokeStyle = COLORS.rays;
    raycast.forEach(raycast => {
        context.beginPath();
        context.moveTo(player.x * scale + posX, player.y * scale + posY);
        context.lineTo(
            (player.x + Math.cos(raycast.angle) * raycast.distance) * scale,
            (player.x + Math.sin(raycast.angle) * raycast.distance) * scale
        );
        context.closePath();
        context.stroke();
    });

    context.fillStyle = "yellow";
    context.fillRect(posX + player.x * scale - PLAYER_SIZE / 2, posY + player.y * scale - PLAYER_SIZE / 2, PLAYER_SIZE, PLAYER_SIZE);

    const raycastLength = PLAYER_SIZE * 2;
    context.strokeStyle = "red";
    context.beginPath();
    context.moveTo(player.x * scale + posX, player.y * scale + posY);
    context.lineTo(
        (player.x + Math.cos(player.angle) * raycastLength) * scale,
        (player.y + Math.sin(player.angle) * raycastLength) * scale
    );
    context.closePath();
    context.stroke();
}

function toRadians(deg) {
    return (deg * Math.PI) / 180;
}

// Game renderer
function gameLoop() {
    // Frames per second
    clearScreen();
    movePlayer();

    // Render digital world
    const raycast = getRaycast();
    renderWorld(raycast);
    renderMinimap(0, 0, 0.75, raycast);
}

setInterval(gameLoop, fps);

document.addEventListener('keydown', (k) => {
    if (k.key == "ArrowUp") {
        player.speed = 2;
    }
    if (k.key == "ArrowDown") {
        player.speed = -2;
    }
});

document.addEventListener('keyup', (k) => {
    if (k.key == "ArrowUp" || k.key == "ArrowDown") {
        player.speed = 0;
    }
});

document.addEventListener('mousemove', (m) => {
    player.angle += toRadians(m.movementX);
});