
var baseChangeX = 10;
var baseChangeY = 10;

class Boss{
    constructor(plcX, plcY, sizeX, sizeY, health, margitBullets, margitSoldiers){
        this.plcX = plcX;
        this.plcY = plcY;
        this.sizeX = sizeX;
        this.sizeY = sizeY;
        this.health = health;
        this.changeX;
        this.changeY;
        this.direct;
        this.speed = 5;
        this.margitBullets = margitBullets;
        this.margitSoldiers = margitSoldiers;
        this.timer = 300;
        this.attacks;
        this.moveCD = 0;
        this.shootCD = 0;
        this.spawnCD = 0;
        this.invincible = false;
    }

    movement(){
        this.plcX += baseChangeX;
        this.plcY += baseChangeY;

        if(this.plcX > windowWidth - 50 || this.plcX < 50){
            baseChangeX *= -1;
        }
        if(this.plcY > windowHeight - 50 || this.plcY < 50){
            baseChangeY *= -1;
        }
    }

    chase(p1){
        if(this.moveCD < 300){
            this.changeY = (p1.plcY - this.plcY);
            this.changeX = (p1.plcX - this.plcX);
            if(this.plcX > p1.plcX){
                this.direct = -1;
            }else{
                this.direct = 1;
            }

            this.plcX += this.direct * (this.speed * cos(atan(this.changeY/this.changeX)));
            this.plcY += this.direct * (this.speed * sin(atan(this.changeY/this.changeX)));

            //fill(86, 42, 45);
            //ellipse(this.plcX, this.plcY, this.sizeX, this.sizeY);
        }
        this.moveCD++;
    }

    spawnBullets(p1){
        if(this.shootCD % 5 == 0 && this.shootCD < 50){
            append(this.margitBullets, this.bullet = new Projectile(this.plcX, this.plcY, 20, 20, 0, 0, 5, 0));

            this.bullet.changeY = (p1.plcY - this.bullet.plcY);
            this.bullet.changeX = (p1.plcX - this.bullet.plcX);
            if(this.bullet.plcX > p1.plcX){
                this.bullet.fireDirect = -1;
            }else{
                this.bullet.fireDirect = 1;
            }
        }
        this.shootCD++;
    }

    createSoldiers(){
       this.margitSoldiers = [new ChaseEnemy(this.plcX - 95, this.plcY, 50, 50, 5, true),
                              new ChaseEnemy(this.plcX + 95, this.plcY, 50, 50, 5, true),
                              new ChaseEnemy(this.plcX, this.plcY - 95, 50, 50, 5, true), 
                              new ChaseEnemy(this.plcX, this.plcY + 95, 50, 50, 5, true)];
    }

    soldiersChase(p1){
        for(var i = 0; i < this.margitSoldiers.length; i++){
            if(this.margitSoldiers[i].health > 0){
                if(!p1.invincible){
                    this.margitSoldiers[i].playerCollision(p1);
                }
                if(p1.attack){
                    this.margitSoldiers[i].death(p1);
                }
                this.margitSoldiers[i].chase(p1);
                this.margitSoldiers[i].display();
            }
        }
    }

    playerCollision(p1){
        if(dist(this.plcX, this.plcY, p1.plcX, p1.plcY) < 75){
            p1.health -= 120;
            p1.invincible = true;
        }
    }

    death(p1){
        if(dist(this.plcX, this.plcY, p1.plcX + p1.tipX, p1.plcY + p1.tipY) < 75 && !this.invincible){
            this.health -= p1.damage * 20;
            this.invincible = true;
        }
    }

    display(){
        fill(86, 42, 45);
        ellipse(this.plcX, this.plcY, this.sizeX, this.sizeY);
        fill(255);
        ellipse(this.plcX, this.plcY, 75, 75);
        fill(0);
        ellipse(this.plcX, this.plcY + 10, 37.5, 37.5);
        fill(232, 193, 83);
        triangle(this.plcX - 80, this.plcY - 40, this.plcX + 40, this.plcY - 40, this.plcX - 40, this.plcY - 100);
        triangle(this.plcX + 80, this.plcY - 40, this.plcX - 40, this.plcY - 40, this.plcX + 40, this.plcY - 100);
        triangle(this.plcX - 40, this.plcY - 40, this.plcX + 40, this.plcY - 40, this.plcX, this.plcY - 100);
    }

    healthBar(){
        textSize(40)
        fill(255, 255, 255);
        text("Margit", (windowWidth * 0.5) - 49, 40);
        textSize(40);
        fill(0,0,0);
        text("Margit", (windowWidth * 0.5) - 50, 40);
        rect((windowWidth * 0.5) - 250, 50, 500, 20);
        fill(255, 0, 0);
        rect((windowWidth * 0.5) - 250, 50, this.health, 20);
    }
}