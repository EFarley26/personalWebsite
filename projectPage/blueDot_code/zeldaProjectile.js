class Projectile{
    constructor(plcX, plcY, sizeX, sizeY, changeX, changeY, speed, fireDirect){
        this.plcX = plcX;
        this.plcY = plcY;
        this.sizeX = sizeX;
        this.sizeY = sizeY;
        this.changeX = changeX;
        this.changeY = changeY;
        this.speed = speed;
        this.fireDirect = fireDirect;
    }

    fire(){
        this.plcX += this.fireDirect * (this.speed * cos(atan(this.changeY/this.changeX)));
        this.plcY += this.fireDirect * (this.speed * sin(atan(this.changeY/this.changeX)));
        fill(255, 0, 0);
        ellipse(this.plcX, this.plcY, this.sizeX, this.sizeY);  
    }

    checkCollision(p1){
        if(dist(this.plcX, this.plcY, p1.plcX, p1.plcY) < 35){
            p1.invincible = true;
            p1.health -= 60;
        }
    }
}