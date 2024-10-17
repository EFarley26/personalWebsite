class Enemy{
    constructor(plcX, plcY, sizeX, sizeY, health, attackCD, attacking){
        this.type = 0;
        this.plcX = plcX;
        this.plcY = plcY;
        this.sizeX = sizeX;
        this.sizeY = sizeY;
        this.health = health;
        this.attackCD = attackCD;
        this.attacking = attacking;
        this.bullet;
    }

    display(){
        if(this.health > 0){
            fill(239, 221, 73);
            ellipse(this.plcX, this.plcY, this.sizeX, this.sizeY);
        }
    }

    playerCollision(p1){
        if(dist(this.plcX, this.plcY, p1.plcX, p1.plcY) < 50){
            p1.health -= 60;
            p1.invincible = true;
        }
    }

    death(p1){
        if(dist(this.plcX, this.plcY, p1.plcX + p1.tipX, p1.plcY + p1.tipY) < 25){
            this.health -= p1.damage;
            if(this.health <= 0){
                p1.gold +=5;
            }
        }
    }

    shoot(p1){
        this.bullet = new Projectile(this.plcX, this.plcY, 20, 20, 0, 0, 5, 0);
            this.bullet.changeY = (p1.plcY - this.bullet.plcY);
            this.bullet.changeX = (p1.plcX - this.bullet.plcX);
            if(this.bullet.plcX > p1.plcX){
                this.bullet.fireDirect = -1;
            }else{
                this.bullet.fireDirect = 1;
        }
        this.attacking = true;
        this.attackCD = 0; 
    }
}