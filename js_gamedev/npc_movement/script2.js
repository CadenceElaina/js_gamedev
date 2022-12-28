/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas1');
const imageNumber = document.getElementById('imageNumber');
const imageNumber1 = document.getElementById('imageNumber1');

let npcSpeed = 5;
let curve = 7;

const ctx = canvas.getContext('2d');
CANVAS_WIDTH = canvas.width = 500;
CANVAS_HEIGHT = canvas.height = 1000;
const numberOfEnemies = 20;
const enemiesArray = [];

let gameFrame = 0;
window.addEventListener('load', function () {
    const slider = document.getElementById('slider');
    slider.value = npcSpeed;
    const showNpcSpeed = document.getElementById('showNpcSpeed');
    showNpcSpeed.innerHTML = npcSpeed;
    slider.addEventListener('change', function (e) {
        //console.log(e.target.value);
        npcSpeed = e.target.value;
        showNpcSpeed.innerHTML = npcSpeed;
    });

    const slider1 = document.getElementById('slider1');
    slider1.value = curve;
    const showVariance = document.getElementById('showVariance');
    showVariance.innerHTML = curve;
    slider1.addEventListener('change', function (e) {
        //console.log(e.target.value);
        curve = e.target.value;
        showVariance.innerHTML = curve;
    });
    class Enemy {
        constructor() {
            this.image = new Image();
            this.image.src = 'enemy2.png';
            this.speed = Math.random() * npcSpeed + 1;
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
            this.curve = Math.random() * curve;
        }
        update() {
            if (npcSpeed > 0) {
                this.speed = Math.random() * npcSpeed + 1;
            }
            else this.speed = 0;
            this.curve = Math.random() * curve;
            this.x -= npcSpeed;
            this.y += this.curve * Math.sin(this.angle);
            this.angle += this.angleSpeed;
            if (this.x + this.width < 0) this.x = canvas.width; // endless right to left movement
            if (gameFrame % this.flapSpeed === 0) {
                this.frame > 4 ? this.frame = 0 : this.frame++; //cycle through each animation frame
            }
        }
        draw() {
            ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
        }
    }


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

    slider.addEventListener('mouseup', function () {
        console.log(slider.value)
    });

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

})