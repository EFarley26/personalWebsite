class SmartEnemy extends Enemy{
    constructor(plcX, plcY, sizeX, sizeY, move, health, attackCD, attacking){
        super(plcX, plcY, sizeX, sizeY, move, health, attackCD, attacking);
        this.type = 2;
        this.predictX;
        this.predictY;
    }

    // Add the ability to lead shot

    predict(p1){
        this.predictX = 0;
        this.predictY = 0;
        //Up
        if(keyIsDown(87)){
            this.predictY -=6;
        }
        //Down
        if(keyIsDown(83)){
            this.predictY +=6;
        }
        //Left
        if(keyIsDown(65)){
            this.predictX -=6;
        }

        //Right
        if(keyIsDown(68)){
            this.predictX +=6;
        }
        //Up + Left
        if(keyIsDown(87) && keyIsDown(65)){
            this.predictX +=1.76;
            this.predictY +=1.76;
        }
        //Up + Right
        if(keyIsDown(87) && keyIsDown(68)){
            this.predictX -=1.76;
            this.predictY +=1.76;
        }
        // Down + Right
        if(keyIsDown(83) && keyIsDown(68)){
            this.predictX -=1.76; 
            this.predictY -=1.76;
        }
        //Down + Left
        if(keyIsDown(83) && keyIsDown(65)){
            this.predictX +=1.76;
            this.predictY -=1.76;
        }

        this.predictX = p1.plcX + (this.predictX * 45);
        this.predictY = p1.plcY + (this.predictY * 45);
    }

    shoot(p1){
        this.predict(p1)
        this.bullet = new Projectile(this.plcX, this.plcY, 20, 20, 0, 0, 10, 0);
            this.bullet.changeY = (this.predictY - this.bullet.plcY);
            this.bullet.changeX = (this.predictX - this.bullet.plcX);
            if(this.bullet.plcX > this.predictX){
                this.bullet.fireDirect = -1;
            }else{
                this.bullet.fireDirect = 1;
        }
        this.attacking = true;
        this.attackCD = 0; 
    }

    display(){
        if(this.health > 0){
            fill(200, 0, 200);
            ellipse(this.plcX, this.plcY, this.sizeX, this.sizeY);
            fill(0, 12, 129);
            triangle(this.plcX - 25, this.plcY - 10, this.plcX + 25, this.plcY - 10, this.plcX, this.plcY - 50);
        }
    }
}