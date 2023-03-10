/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas1');
const imageNumber = document.getElementById('imageNumber');
const imageNumber1 = document.getElementById('imageNumber1');
let inputValue
const input = document.getElementById('inputValue')
const btn = document.getElementById('btn');
const ctx = canvas.getContext('2d');
CANVAS_WIDTH = canvas.width = 500;
CANVAS_HEIGHT = canvas.height = 1000;
const numberOfEnemies = 20;
const enemiesArray = [];


const allRanges = document.querySelectorAll(".range-wrap");
allRanges.forEach(wrap => {
    const range = wrap.querySelector(".range");
    const bubble = wrap.querySelector(".bubble");

    range.addEventListener("input", () => {
        setBubble(range, bubble);

    });

    setBubble(range, bubble);

});



function setBubble(range, bubble) {
    const val = range.value;
    const min = range.min ? range.min : 0;
    const max = range.max ? range.max : 100;
    const newVal = Number(((val - min) * 100) / (max - min));
    bubble.innerHTML = val;
    console.log(val)
    input.innerHTML = val
    // Sorta magic numbers based on size of the native UI thumb
    bubble.style.left = `calc(${newVal}% + (${8 - newVal * 0.15}px))`;
}

/* const enemyImage = new Image();
enemyImage.src = 'enemy1.png'; */
let gameFrame = 0;

class Enemy {
    constructor() {
        this.image = new Image();
        this.image.src = 'enemy1.png';
        this.speed = Math.random() * 4 - 2;
        this.spriteWidth = 293;
        this.spriteHeight = 155;
        this.width = this.spriteWidth / 2.5;
        this.x = Math.random() * (canvas.width - this.width);
        this.height = this.spriteHeight / 2.5;
        this.y = Math.random() * (canvas.height - this.height);
        this.frame = 0;
        this.flapSpeed = Math.floor(Math.random() * 3 + 1);
    }
    update() {
        this.x += Math.random() * 5 - 2.5;
        this.y += Math.random() * 5 - 2.5;
        if (gameFrame % this.flapSpeed === 0) {
            this.frame > 4 ? this.frame = 0 : this.frame++; //cycle through each animation frame
        }
    }
    draw() {
        //ctx.fillRect(...)
        //ctx.strokeRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
}


/* class Enemy {
    constructor() {
        this.image = new Image();
        this.image.src = 'enemy2.png';
        this.speed = Math.random() * 4 + 1;
        this.spriteWidth = 266;
        this.spriteHeight = 188;
        this.width = this.spriteWidth / 2.5;
        this.x = Math.random() * (canvas.width - this.width);
        this.height = this.spriteHeight / 2.5;
        this.y = Math.random() * (canvas.height - this.height);
        this.frame = 0;
        this.flapSpeed = Math.floor(Math.random() * 3 + 1);
        this.angle = Math.random() * 2;
        this.angleSpeed = Math.random() * 0.2;
        this.curve = Math.random() * 7;
    }
    update() {
        this.x -= this.speed;
        this.y += this.curve * Math.sin(this.angle);
        this.angle += this.angleSpeed;
        if (this.x + this.width < 0) this.x = canvas.width; // endless right to left movement
        if (gameFrame % this.flapSpeed === 0) {
            this.frame > 4 ? this.frame = 0 : this.frame++; //cycle through each animation frame
        }
    }
    draw() {
        //ctx.fillRect(...)
        //ctx.strokeRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
}
 */

/* class Enemy {
    constructor() {
        this.image = new Image();
        this.image.src = 'enemy3.png';
        this.speed = Math.random() * 4 + 1;
        this.spriteWidth = 218;
        this.spriteHeight = 177;
        this.width = this.spriteWidth / 2.5;
        this.x = Math.random() * (canvas.width - this.width);
        this.height = this.spriteHeight / 2.5;
        this.y = Math.random() * (canvas.height - this.height);
        this.frame = 0;
        this.flapSpeed = Math.floor(Math.random() * 3 + 1);
        this.angle = Math.random() * 2;
        this.angleSpeed = Math.random() * 2 + 0.5;
        this.curve = Math.random() * 200 + 50;
    }
    update() {
        this.x = this.curve * Math.sin(this.angle * Math.PI / 180) + canvas.width / 2 - this.width / 2;
        this.y = this.curve * Math.cos(this.angle * Math.PI / 180) + canvas.height / 2 - this.height / 2;
        this.angle += this.angleSpeed;
        if (this.x + this.width < 0) this.x = canvas.width; // endless right to left movement
        if (gameFrame % this.flapSpeed === 0) {
            this.frame > 4 ? this.frame = 0 : this.frame++; //cycle through each animation frame
        }
    }
    draw() {
        //ctx.fillRect(...)
        //ctx.strokeRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
} */

//const enemy1 = new Enemy();
for (let i = 0; i < numberOfEnemies; i++) {
    enemiesArray.push(new Enemy());
}
let imageTitle = enemiesArray[0].image.src.substring(35, 41).split('')
imageTitle.splice(5, 0, ' ')
imageTitle = imageTitle.join('')
imageTitle = imageTitle[0].toUpperCase() + imageTitle.substring(1);
imageNumber.innerHTML = imageTitle
imageNumber1.innerHTML = imageTitle.substring(imageTitle.length - 1)
//console.log(enemiesArray);

function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    //enemy1.x++;
    //enemy1.update();
    //enemy1.draw();
    //ctx.fillRect(enemy1.x, enemy1.y, enemy1.width, enemy1.height);

    enemiesArray.forEach(enemy => {
        enemy.update();
        enemy.draw();

    })
    gameFrame++;
    requestAnimationFrame(animate);
}
animate();