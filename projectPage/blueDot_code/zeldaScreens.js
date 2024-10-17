var textColor = [255, 255, 255];

class Screens{
    constructor(type, img, plcX, plcY, increase, treePosX, treePosY, treeType, path){
        this.type = type;
        this.img = img;
        this.plcX = plcX;
        this.plcY = plcY;
        this.increase = increase;
        this.treePosX = treePosX;
        this.treePosY = treePosY;
        this.treeType = treeType;
        this.path = path;
        this.ready = false;
    }

    backPicture(){
        for(var j = 0; j < 1; j += this.increase){
            for(var i = 0; i < 1; i += this.increase){
                image(this.img, windowWidth * i, windowHeight * j, windowWidth * this.increase, windowHeight * this.increase);
            }
        }
    }

    setForest(){
        for(var i = 0; i < 25; i++){
            append(this.treePosX, random(0, windowWidth));
            append(this.treePosY, random(0, windowHeight));
            append(this.treeType, round(random(2)));
        }
    }

    treeTriangle(x, y){
        fill(113, 155, 64, 225);
        triangle(x - 20, y + 50, x + 30, y + 50, x + 5, y - 100);
    }

    treeCircle(x, y){
        fill(113, 155, 64, 225);
        ellipse(x + 5, y, 100, 100);
    }

    treeSquare(x, y){
        fill(113, 155, 64, 225);
        rect(x - 45, y - 50, 100, 100);
    }

    trunk(x, y){
        fill(90, 65, 33, 255);
        rect(x, y + 50, 10, 50);
    }

    house(x, y, r, g, b){
        //body
        fill(r, g, b);
        rect(x, y, 200, 100);
        //chimny
        fill(211, 169, 132);
        rect(x + 135, y - 75, 30, 50);
        //roof
        fill(120,120,120);
        triangle(x - 10, y + 10, x + 210, y + 10, x + 100, y - 100);
        //door
        fill(111, 69, 32);
        rect(x + 85, y + 50, 30, 50);
        //windows
        fill(190, 224, 248, 255);
        rect(x + 20, y + 40, 40, 40);
        rect(x + 140, y + 40, 40, 40);
    }

    playScreen(){
        fill(100, 100, 100, 200);
        rect(0, 0, windowWidth, windowHeight);
        fill(textColor[0], textColor[1], textColor[2]);
        rect((windowWidth * 0.5) - 260, (windowHeight * 0.5) - 85, 520, 170);
        fill(100, 100, 100);
        rect((windowWidth * 0.5) - 250, (windowHeight * 0.5) - 75, 500, 150);
        textSize(64);
        fill(255, 255, 255);
        text("by Ethan Farley", 500, 550);
        fill(255, 255, 255);
        text("Keybinds:", 100, 400);
        textSize(32);
        text("Movement: W, A, S, D", 100, 450);
        text("Dash: K", 100, 500);
        text("Attack: J", 100, 550);
        text("Shield: L", 100, 600);
        text("Interact: H", 100, 650);
        textSize(128);
        fill(255, 255, 255);
        text("Blue Adventure Dot", 175, 200);
        fill(textColor[0], textColor[1], textColor[2]);
        text("Play", 600, 405);
        if(mouseX > (windowWidth * 0.5) - 250 && mouseX < (windowWidth * 0.5) + 250){
            if(mouseY > (windowHeight * 0.5) - 75 && mouseY < (windowHeight * 0.5) + 75){
                textColor[2] = 0;
                this.ready = true;
            }else{
                textColor[2] = 255;
                this.ready = false;
            }
        }else{
            textColor[2] = 255;
            this.ready = false;
        }
    }

    endScreen(p1){
        fill(100, 100, 100, 200);
        rect(0, 0, windowWidth, windowHeight);
        fill(textColor[0], textColor[1], textColor[2]);
        rect((windowWidth * 0.5) - 260, (windowHeight * 0.5) + 85, 520, 170);
        fill(100, 100, 100);
        rect((windowWidth * 0.5) - 250, (windowHeight * 0.5) + 95, 500, 150);
        textSize(64);
        fill(255, 255, 255);
        text("by Ethan Farley", 500, 700);
        text("Thanks for playing!", 450, 300);
        if(p1.hasHat == false){
            text("Try again to try and get the true ending", 175, 400);
        }
        textSize(128);
        fill(255, 255, 255);
        text("Blue Adventure Dot", 175, 200);
        textSize(115);
        fill(textColor[0], textColor[1], textColor[2]);
        text("Respawn", 480, 575);
        if(mouseX > (windowWidth * 0.5) - 260 && mouseX < (windowWidth * 0.5) + 260){
            if(mouseY > (windowHeight * 0.5) + 85 && mouseY < (windowHeight * 0.5) + 255){
                textColor[2] = 0;
                this.ready = true;
            }else{
                textColor[2] = 255;
                this.ready = false;
            }
        }else{
            textColor[2] = 255;
            this.ready = false;
        }
    }

    shopScreen(){
        fill(100, 100, 100, 200);
        rect(0, 0, windowWidth, windowHeight);
        fill(177, 143, 107);
        rect((windowWidth * 0.5) - 650, (windowHeight * 0.5) - 300, 1300, 600);
        fill(57, 37, 26);
        rect((windowWidth * 0.5) - 625, (windowHeight * 0.5) - 275, 1250, 550);
    
        //Sword
        if(!p1.hasSword){
            fill(100, 100, 255);
            triangle((windowWidth * 0.5) - 525, (windowHeight * 0.5) + 125, (windowWidth * 0.5) - 275, (windowHeight * 0.5) + 125, (windowWidth * 0.5) - 400, (windowHeight * 0.5) - 225);
            fill(255);
            textSize(32);
            text("Sword Upgrade (+2)", (windowWidth * 0.5) - 545, (windowHeight * 0.5) + 175);
            fill(shopText[0], shopText[1], shopText[2]);
            rect((windowWidth * 0.5) - 535, (windowHeight * 0.5) + 200, 275, 50);
            fill(100,100,100);
            rect((windowWidth * 0.5) - 530, (windowHeight * 0.5) + 205, 265, 40);
            fill(shopText[0], shopText[1], shopText[2]);
            text("Buy: 25 Gold", (windowWidth * 0.5) - 490, (windowHeight * 0.5) + 238);
    
            if(mouseX > (windowWidth * 0.5) - 535 && mouseX < (windowWidth * 0.5) - 260){
                if(mouseY < (windowHeight * 0.5) + 250 && mouseY > (windowHeight * 0.5) + 200){
                    shopText[2] = 0;
                    buySword = true;
                }else{
                    shopText[2] = 255;
                    buySword = false;
                }
            }else{
                shopText[2] = 255;
                buySword = false;
            }
        }
        //Hat
        if(!p1.hasHat){
            fill(16, 46, 32);
            triangle((windowWidth * 0.5) - 150, (windowHeight * 0.5) + 75, (windowWidth * 0.5) + 150, (windowHeight * 0.5) + 75, (windowWidth * 0.5), (windowHeight * 0.5) - 100);
            fill(255);
            textSize(32);
            text("Hat (Looks Cool)", (windowWidth * 0.5) - 120, (windowHeight * 0.5) + 175);
            fill(shopText[3], shopText[4], shopText[5]);
            rect((windowWidth * 0.5) - 140, (windowHeight * 0.5) + 200, 275, 50);
            fill(100,100,100);
            rect((windowWidth * 0.5) - 135, (windowHeight * 0.5) + 205, 265, 40);
            fill(shopText[3], shopText[4], shopText[5]);
            text("Buy: 150 Gold", (windowWidth * 0.5) - 103, (windowHeight * 0.5) + 238);
    
            if(mouseX > (windowWidth * 0.5) - 140 && mouseX < (windowWidth * 0.5) + 135){
                if(mouseY < (windowHeight * 0.5) + 250 && mouseY > (windowHeight * 0.5) + 200){
                    shopText[5] = 0;
                    buyHat = true;
                }else{
                    shopText[5] = 255;
                    buyHat = false;
                }
            }else{
                shopText[5] = 255;
                buyHat = false;
            }
        }
        //Apple
        if(!p1.hasApple){
            fill(226, 226, 107);
            ellipse((windowWidth * 0.5) + 400, (windowHeight * 0.5), 250, 250);
            fill(82, 153, 64);
            triangle((windowWidth * 0.5) + 400, (windowHeight * 0.5) - 125, (windowWidth * 0.5) + 375, (windowHeight * 0.5) - 150, (windowWidth * 0.5) + 425, (windowHeight * 0.5) - 150);
            fill(255);
            textSize(32);
            text("Apple (+5 Health)", (windowWidth * 0.5) + 275, (windowHeight * 0.5) + 175);
            fill(shopText[6], shopText[7], shopText[8]);
            rect((windowWidth * 0.5) + 260, (windowHeight * 0.5) + 200, 275, 50);
            fill(100,100,100);
            rect((windowWidth * 0.5) + 265, (windowHeight * 0.5) + 205, 265, 40);
            fill(shopText[6], shopText[7], shopText[8]);
            text("Buy: 25 Gold", (windowWidth * 0.5) + 310, (windowHeight * 0.5) + 238);
    
            if(mouseX > (windowWidth * 0.5) + 260 && mouseX < (windowWidth * 0.5) + 535){
                if(mouseY < (windowHeight * 0.5) + 250 && mouseY > (windowHeight * 0.5) + 200){
                    shopText[8] = 0;
                    buyApple = true;
                }else{
                    shopText[8] = 255;
                    buyApple = false;
                }
            }else{
                shopText[8] = 255;
                buyApple = false;
            }
        }
    
        fill(shopText[9], shopText[10], shopText[11]);
        rect((windowWidth * 0.5) - 140, (windowHeight * 0.5) + 310, 275, 50);
        fill(100,100,100);
        rect((windowWidth * 0.5) - 135, (windowHeight * 0.5) + 315, 265, 40);
        fill(shopText[9], shopText[10], shopText[11]);
        text("Back", (windowWidth * 0.5) - 35, (windowHeight * 0.5) + 345);
        if(mouseX > (windowWidth * 0.5) - 140 && mouseX < (windowWidth * 0.5) + 135){
            if(mouseY < (windowHeight * 0.5) + 360 && mouseY > (windowHeight * 0.5) + 310){
                shopText[11] = 0;
                back = true;
            }else{
                shopText[11] = 255;
                back = false;
            }
        }else{
            shopText[11] = 255;
            back = false;
        }
    }

    displayPath(){
        angleMode(DEGREES)
        translate(width / 2, height / 2);
        rotate(90);
        for(var i = -637.5; i < 562; i+= 75){
            image(this.path, -37.5, i, 75, 75);
        }
        rotate(270);
        translate(-(width / 2), -(height/2));
        for(var j = 0; j < 700; j+= 350){
            for(var i = 43; i < 269; i+= 75){
                image(this.path, windowWidth * 0.5 - 37.5, i + j, 75, 75);
            }
        }
        for(var i = 393; i < 619; i+= 75){
            image(this.path, 157.5, i, 75, 75);
        }
    }
}
