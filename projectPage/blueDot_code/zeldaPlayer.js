var backwards = false;
var shield = false;
var shieldTimer = 0;
var fade = 0;
var count = 2;

class Player{
    constructor(plcX, plcY, sizeX, sizeY, health, invincible, dashCD, capper){
        this.plcX = plcX;
        this.plcY = plcY;
        this.sizeX = sizeX;
        this.sizeY = sizeY;
        this.health = health;
        this.maxHP = 300;
        this.invincible = invincible;
        this.dashCD = dashCD;
        this.direct = 1;
        this.directY = 1;
        this.attackDirectX = 0;
        this.attackDirectY = 0;
        this.tipX = 0;
        this.tipY = 0;
        this.shieldCD = 7200;
        this.attack = false;
        this.damage = 5;
        this.gold = 0;
        this.rest = false; 
        this.shop = false;
        this.hasSword = false;
        this.hasHat = false;
        this.hasApple = false; 
        this.swordColor = [255, 255, 255];
    }

    math(){
        //Up
        if(keyIsDown(87)){
            this.plcY -=6;
            this.directY = -1;
            if(!this.attack){
                this.attackDirectY = -1;
            }
        }
        //Down
        if(keyIsDown(83) && this.plcY){
            this.plcY +=6;
            this.directY = 1;
            if(!this.attack){
                this.attackDirectY = 1;
            }
        }
        //Left
        if(keyIsDown(65)){
            this.plcX -=6;
            this.directX = -1;
            if(!this.attack){
                this.attackDirectX = -1;
            }
        }

        //Right
        if(keyIsDown(68)){
            this.plcX +=6;
            this.directX = 1;
            if(!this.attack){
                this.attackDirectX = 1;
            }
        }
        //Up + Left
        if(keyIsDown(87) && keyIsDown(65)){
            this.plcX +=1.76;
            this.plcY +=1.76;
        }
        //Up + Right
        if(keyIsDown(87) && keyIsDown(68)){
            this.plcX -=1.76;
            this.plcY +=1.76;
        }
        // Down + Right
        if(keyIsDown(83) && keyIsDown(68)){
            this.plcX -=1.76;
            this.plcY -=1.76;
        }
        //Down + Left
        if(keyIsDown(83) && keyIsDown(65)){
            this.plcX +=1.76;
            this.plcY -=1.76;
        } 

        if(screenNum == 1 && this.plcX < 30){
            this.plcX = 30;
        }

        if(screenNum == 6 && this.plcX > windowWidth - 30){
            this.plcX = windowWidth - 30;
        }

        if(this.plcY < 30){
            this.plcY = 30;
        }

        if(this.plcY > windowHeight - 30){
            this.plcY = windowHeight - 30;
        }
    }

    dash(){
         //Dash -- Keybind = H
         if(keyIsDown(75) && this.dashCD == 30){
            for(var i = 0; i < 5; i++){
                if(this.directX == 1 || this. directX == -1){
                    //if(this.plcX > 30 && this.plcX < windowWidth - 30){
                        this.plcX += 25 * this.directX;  
                    //}
                }
                if(this.directY == 1 || this.directY == -1){
                    if(this.plcY > 30 && this.plcY < windowHeight - 30){
                        this.plcY += 25 * this.directY;
                    }
                }

                fill(100,100,255);
                ellipse(round(this.plcX), round(this.plcY), this.sizeX, this.sizeY);
                if(this.hasHat){
                    fill(16, 46, 32);
                    triangle(this.plcX - 30, this.plcY - 5, this.plcX + 30, this.plcY - 5, this.plcX, this.plcY - 45);
                }
            }
            this.dashCD = 0;
        }
    }

    movement(){
        fill(100,100,255);
        ellipse(this.plcX, this.plcY, this.sizeX, this.sizeY);
        fill(255);
        ellipse(this.plcX - 12.5, this.plcY, 20, 12);
        ellipse(this.plcX + 12.5, this.plcY, 20, 12);
        fill(0);
        ellipse(this.plcX - 12.5, this.plcY, 10, 10);
        ellipse(this.plcX + 12.5, this.plcY, 10, 10);
        if(this.hasHat){
            fill(16, 46, 32);
            triangle(this.plcX - 30, this.plcY - 5, this.plcX + 30, this.plcY - 5, this.plcX, this.plcY - 45);
        }
        p1.directX = 0;
        p1.directY = 0;
    }

    stab(margit){
        if(keyIsDown(74)){
            this.attack = true;
        }
        if(this.attack){
            if(this.attackDriectX !== 0 && this.attackDirectY == 0){
                fill(this.swordColor[0], this.swordColor[1], this.swordColor[2]);
                triangle(this.plcX, this.plcY - 18.75, this.plcX + this.tipX, this.plcY + this.tipY, this.plcX, this.plcY + 18.75);
            }
            if(this.attackDirectX == 0 && this.attackDirectY !== 0){
                fill(this.swordColor[0], this.swordColor[1], this.swordColor[2]);
                triangle(this.plcX - 18.75, this.plcY, this.plcX + this.tipX, this.plcY + this.tipY, this.plcX + 18.75, this.plcY);
            }
            if((this.attackDirectX == -1 && this.attackDirectY == 1) || (this.attackDirectX == 1 && this.attackDirectY == -1)){
                fill(this.swordColor[0], this.swordColor[1], this.swordColor[2]);
                triangle(this.plcX - 12.75, this.plcY - 12.75, this.plcX + this.tipX, this.plcY + this.tipY, this.plcX + 12.75, this.plcY + 12.75);
            }
            if((this.attackDirectX == -1 && this.attackDirectY == -1) || (this.attackDirectX == 1 && this.attackDirectY == 1)){
                fill(this.swordColor[0], this.swordColor[1], this.swordColor[2]);
                triangle(this.plcX + 12.75, this.plcY - 12.75, this.plcX + this.tipX, this.plcY + this.tipY, this.plcX - 12.75, p1.plcY + 12.75);
        }
            if(!backwards){
                if(this.attackDirectX !== 0 && this.attackDirectY !== 0){
                    this.tipX+=3 * this.attackDirectX;
                    this.tipY+=3 * this.attackDirectY;
                }else{
                    this.tipX+=5 * this.attackDirectX;
                    this.tipY+=5 * this.attackDirectY;
                }
            }
            if(this.attackDirectX !== 0 && this.attackDirectY !== 0){
                if(this.tipX > 56 || this.tipX < -56 || this.tipY > 56 || this.tipY < -56){
                    backwards = true;
                }
            }
            if(this.tipX > 80 || this.tipX < -80 || this.tipY > 80 || this.tipY < -80){
                backwards = true;
            }
            if(backwards){
                if(this.attackDirectX !==0 && this.attackDirectY !==0){
                    this.tipX+=-(3 * this.attackDirectX);
                    this.tipY+=-(3 * this.attackDirectY);
                }else{
                    this.tipX+=-(5 * this.attackDirectX);
                    this.tipY+=-(5 * this.attackDirectY);
                }
            }
            if(this.tipX == 0 && this.tipY == 0){
                backwards = false;
                this.attack = false;
                margit.invincible = false;
    
            }
        }
    }

    shield(){
        if(keyIsDown(76) && this.shieldCD == 7200){
            shield = true;
        }
        if(shield){
            this.invincible = true;
            shieldTimer++;
            fill(144, 196, 225, 150);
            ellipse(this.plcX, this.plcY, 75, 75);
        }
        if(shieldTimer == 120){
            shield = false;
            shieldTimer = 0;
            this.shieldCD = 0;
        }
    }

    interact(){
        if(keyIsDown(72)){
            if(dist(925, 275, this.plcX, this.plcY) < 25){
                this.rest = true;
            }
           if(dist(375, 625, this.plcX, this.plcY) < 25){
                this.shop = true;
            }
        }
    }

    healthBar(){
        textSize(32);
        fill(0,0,0);
        text("Gold:", this.maxHP + 75, 723);
        text("HP", 10, 723);
        text(this.gold, this.maxHP + 160, 723)
        rect(65, 703, this.maxHP, 20);
        fill(255, 0, 0);
        if(this.health >= 0){
            rect(65, 703, this.health, 20);
        }
    }
}