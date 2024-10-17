class ChaseEnemy extends Enemy{
    constructor(plcX, plcY, sizeX, sizeY, health){
        super(plcX, plcY, sizeX, sizeY, health);
        this.changeX;
        this.changeY;
        this.direct;
        this.speed = 4;
        this.type = 1;
    }
    
    chase(p1){
        this.changeY = (p1.plcY - this.plcY);
        this.changeX = (p1.plcX - this.plcX);
        if(this.plcX > p1.plcX){
            this.direct = -1;
        }else{
            this.direct = 1;
        }

        this.plcX += this.direct * (this.speed * cos(atan(this.changeY/this.changeX)));
        this.plcY += this.direct * (this.speed * sin(atan(this.changeY/this.changeX)));

        fill(255, 255, 0);
        ellipse(this.plcX, this.plcY, this.sizeX, this.sizeY);
    }

    display(){
        if(this.health > 0){
            fill(177, 127, 79);
            ellipse(this.plcX, this.plcY, this.sizeX, this.sizeY);
            triangle(this.plcX - 20, this.plcY - 15, this.plcX - 5, this.plcY - 15, this.plcX - 10, this.plcY - 40);
            triangle(this.plcX + 20, this.plcY - 15, this.plcX + 5, this.plcY - 15, this.plcX + 10, this.plcY - 40);
        }
    }
}