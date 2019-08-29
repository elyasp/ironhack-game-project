class Game {
    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.ship = new Ship(this);
        this.hole = new Hole(this);
        this.wave = new Wave(this);
        this.controls = new Controls(this);
        this.waveCounter = new Counter(this)
        this.controls.setKeyBindings();
        this.waves = [];
        this.waveFrequency = 95 // ==================== DISTANCE BETWEEN WAVES
        this.timer = 0;
        this.counter = 0;
        this.SPEED = 12000 // ========================= TIME INTERVAL FOR WAVE FREQUENCY & WAVE SPEED INCREASAL 
        this.waveSpeed = 2 // ========================= STARTING SPEED

    }
    startGame() {
        console.log("game started")
        this.loop(0)
    }

    loop(timestamp) {
        this.runLogic(timestamp);
        this.draw();
        this.counter += 1;
        window.requestAnimationFrame((timestamp) => this.loop(timestamp));
    }

    runLogic(timestamp) {
        if (this.counter % this.waveFrequency === 0) {
            this.waves.push(new Wave(this))
        }

        if (this.timer < timestamp - this.SPEED) {
            this.waveSpeed += 0.25
            this.waveFrequency -= 1
            this.timer = timestamp
        }

        this.waves.map(waveObject => waveObject.radiusDecrease())
        this.waves.map(waveObject => waveObject.waveRemover())
        this.collisionDetect();

    }

    clear() {
        this.ctx.clearRect(0, 0, 1260, 570)

    }



    draw() {
        this.clear();
        this.ship.drawShip();
        this.hole.drawCentre();
        this.waves.map(arrayObject => arrayObject.drawWaves());
        this.waveCounter.survivedWaves();

    }

    collisionDetect() {

        for (let waveObject of this.waves) {
            if (waveObject.waveRadius > 70 && waveObject.waveRadius < 100) {
                const angle = (this.ship.angle + Math.PI) % (Math.PI * 2);
                const start = (waveObject.startRadian + Math.PI / 2) % (Math.PI * 2);
                const end = (waveObject.endRadian + Math.PI / 2) % (Math.PI * 2);
                if (!(angle > start && angle < end)) {
                    //window.location.href = "./index.html" // ========================= to game over screen


                }
            }
        }
    }
}