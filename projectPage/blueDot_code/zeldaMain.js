var grass;
var dirt;
var path;
var screenNum = 0;
var invisTimer = 0;
var enemies;
var screens;
var bossEncounter = false;
var townTreePosX = [521, 601, 1043, 1150, 1300, 1106, 1242, 1305, 826, 396, 296, 179, 50, 79, 109];
var townTreePosY = [531, 456, 493, 600, 524, 126, 203, 53, 53, 28, 168, 75, 50, 242, 517];
var townTreeType = [];
var fade = 0;
var count = 2;
var shopText = [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255]; 
var buySword = false;
var buyHat = false;
var buyApple = false;
var back = false;


function preload(){
    grass = loadImage("https://thumbs.dreamstime.com/b/pixel-art-grass-background-seamless-lawn-texture-backdrop-vector-illustration-223655094.jpg");
    dirt = loadImage("data:image/webp;base64,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");
    path = loadImage("https://pics.craiyon.com/2024-02-28/K7h6StgnQOCR2P2ZfwrujA.webp");
}

function setup(){
    createCanvas(windowWidth, windowHeight);
    frameRate(60);
    for(var i = 0; i < 15; i++){
        append(townTreeType, round(random(2)));
    }

    setAllEnemies();

    screens = [screen0 = new Screens(-1, grass, 0, 0, 0.25, [], [], [], path),
               screen1 = new Screens(0, grass, 0, 0, 0.25, [], [], [], path),
               screen2 = new Screens(1, grass, 0, 0, 0.25, [], [], []), 
               screen3 = new Screens(1, grass, 0, 0, 0.25, [], [], []), 
               screen4 = new Screens(1, grass, 0, 0, 0.25, [], [], []), 
               screen5 = new Screens(2, dirt, 0, 0, 0.15, [], [], []),
               screen6 = new Screens(2, dirt, 0, 0, 0.15, [], [], []),
               screen7 = new Screens(-2, grass, 0, 0, 0.25, [], [], [], path)];

    p1 = new Player(windowWidth * 0.5, windowHeight * 0.5, 50, 50, 300, false, 30);

    for(var i = 0; i < screens.length; i++){
        if(screens[i].type == 1){
            screens[i].setForest();
        }
    }
            
}

function setAllEnemies(){
    enemies =  [
                //Menu Screen
                [],

                //Town
                [],
    
                //Forest 1 Enemies
                [new ChaseEnemy(500, 400, 50, 50, 5, true),
                 new ChaseEnemy(400, 500, 50, 50, 5, true),
                 new Enemy(1000, 100, 50, 50, 5, 0, false),
                 new Enemy(800, 600, 50, 50, 5, 0, false), 
                 new Enemy(1200, 500, 50, 50, 5, 0, false),
                 new Enemy(1200, 300, 50, 50, 5, 0, false)], 

                //Forest 2 Enemies
                [new Enemy(1300, 200, 50, 50, 5, 0, false),
                 new Enemy(1150, 550, 50, 50, 5, 0, false),
                 new ChaseEnemy(800, 200, 50, 50, 5, true),
                 new ChaseEnemy(1100, 580, 50, 50, 5, true), 
                 new ChaseEnemy(500, 700, 50, 50, 5, true)],

                //Forest 3 Enemies
                [new Enemy(800, 100, 50, 50, 5, 0, false),
                 new Enemy(1000, 100, 50, 50, 5, 0, false),
                 new Enemy(1200, 100, 50, 50, 5, 0, false),
                 new Enemy(800, windowHeight - 100, 50, 50, 5, 0, false),
                 new Enemy(1000, windowHeight - 100, 50, 50, 5, 0, false),
                 new Enemy(1200, windowHeight - 100, 50, 50, 5, 0, false),
                 new SmartEnemy(1100, windowHeight * 0.5, 50, 50, 5, 0, false)],

                //Cave 1 Enemies
                [new ChaseEnemy(700, 400, 50, 50, 5, true),
                 new ChaseEnemy(900, 600, 50, 50, 5, true),
                 new SmartEnemy(1200, 150, 50, 50, 5, 0, false),
                 new SmartEnemy(1100, 450, 50, 50, 5, 0, false),
                 new SmartEnemy(1300, 7650, 50, 50, 5, 0, false)],

                //Boss Enemies
                [],

                [], 
                
                ];
                
    margit = new Boss(windowWidth / 2, windowHeight / 2, 150, 150, 750, [], []);
}

function draw(){
    backing();
    screenSwap();
    badGuys();
    if(screenNum == 6){
        bossFight();
        if(margit.health > 0){
            bossEncounter = true;
        }
    }
    if(screens[screenNum].type !== -1 || screens[screenNum].type !== -2){
        playerFunctions();
    }
    endFunctions();
    if(screens[screenNum].type == -1){
        screens[screenNum].playScreen();
    }
    if(screens[screenNum].type == -2){
        screens[screenNum].endScreen(p1);
    }

}

function backing(){
    screens[screenNum].backPicture();
    if(screens[screenNum].type == 0 || screens[screenNum].type == -1){
        screens[screenNum].displayPath();
        town();
    }
    if(screens[screenNum].type == 1){
        for(var i = 0; i < 25; i++){
            screens[screenNum].trunk(screens[screenNum].treePosX[i], screens[screenNum].treePosY[i]);
        }
    }
}

function screenSwap(){
    if(bossEncounter == false && screenNum !== 7){
        if(p1.plcX > windowWidth){
            p1.plcX = 10;
            screenNum++;
        }
        if(p1.plcX < 0 && screenNum !== 1  && screenNum !== 7){
            p1.plcX = windowWidth - 10;
            screenNum--;
        }
    }
}

function badGuys(){
    if(enemies[screenNum].length > 0){
        for(var i = 0; i < enemies[screenNum].length; i++){
            if(enemies[screenNum][i].health > 0){
                if(!p1.invincible){
                    enemies[screenNum][i].playerCollision(p1);
                }
                if(p1.attack){
                    enemies[screenNum][i].death(p1);
                }
                if(enemies[screenNum][i].attackCD == 120 && enemies[screenNum][i].type !== 1){ 
                    enemies[screenNum][i].shoot(p1);         
                }
                if(enemies[screenNum][i].attacking && enemies[screenNum][i].type !== 1){
                    if(enemies[screenNum][i].bullet.plcX > windowWidth || enemies[screenNum][i].bullet.plcX < 0 || enemies[screenNum][i].bullet.plcY > windowHeight || enemies[screenNum][i].bullet.plcY < 0){
                        enemies[screenNum][i].attacking = false;
                    }
                    if(enemies[screenNum][i].type == 2){
                        enemies[screenNum][i].predict(p1);
                    }
                    enemies[screenNum][i].bullet.fire();
                    if(!p1.invincible){
                        enemies[screenNum][i].bullet.checkCollision(p1);
                    }
                }

                if(enemies[screenNum][i].type == 1){
                    enemies[screenNum][i].chase(p1);
                }
                if(enemies[screenNum][i].attackCD < 300 && !enemies[screenNum][i].attacking){
                    enemies[screenNum][i].attackCD++;
                }
                enemies[screenNum][i].display();
            }
        }
    }
}

function bossFight(){
    if(margit.health > 0){
        if(p1.plcX < 30){
            p1.plcX = 30;
        }
        if(margit.timer ==  300){
            margit.attacks = round(random(2));
            margit.moveCD = 0;
            margit.shootCD = 0;
            margit.spawnCD = 0;
            margit.timer = 0;
        }

        if(margit.attacks == 0){
            margit.chase(p1);
        }else if(margit.attacks == 1){
            margit.spawnBullets(p1);
            for(var i = 0; i < margit.margitBullets.length; i++){
                margit.margitBullets[i].fire();
                if(!p1.invincible){
                    margit.margitBullets[i].checkCollision(p1)
                }
            }

        }else if(margit.attacks == 2){
            margit.createSoldiers();
            margit.attacks = -1;
        }
        
        margit.soldiersChase(p1);

        if(!p1.invincible){
            margit.playerCollision(p1);
        }
        if(p1.attack){
            margit.death(p1);
        }
        if(margit.attacks !== 0){
            margit.movement();
        }
        margit.display();
        margit.healthBar();
        margit.timer++;
    }else{
        bossEncounter = false;
        screenNum = 7;
    }
}

function playerFunctions(){
    if(p1.health > 0){
        p1.math();
        p1.stab(margit);
        p1.dash();
        p1.movement();
        p1.shield();
        if(screenNum == 1){
            p1.interact();
        }
    }
}

function endFunctions(){
    if(screens[screenNum].type == 1){
        for(var i = 0; i < 25; i++){
            if(screens[screenNum].treeType[i] == 0){
                screens[screenNum].treeTriangle(screens[screenNum].treePosX[i], screens[screenNum].treePosY[i]);
            }else if(screens[screenNum].treeType[i] == 1){
                screens[screenNum].treeSquare(screens[screenNum].treePosX[i], screens[screenNum].treePosY[i]);
            }else{
                screens[screenNum].treeCircle(screens[screenNum].treePosX[i], screens[screenNum].treePosY[i]);
            }
        }
    }
    if(screens[screenNum].type == 0 || screens[screenNum].type == -1){
        for(var i = 0; i < 15; i++){
            if(townTreeType[i] == 0){
                screens[screenNum].treeCircle(townTreePosX[i], townTreePosY[i]);
            }else if(townTreeType[i] == 1){
                screens[screenNum].treeTriangle(townTreePosX[i], townTreePosY[i]);
            }else{
                screens[screenNum].treeSquare(townTreePosX[i], townTreePosY[i]);
            }

        }
    }

    if(p1.invincible){
        invisTimer++;
    }
    if(invisTimer == 120){
        p1.invincible = false;
        invisTimer = 0;
    }
    if(p1.dashCD < 30){
        p1.dashCD++;
    }
    if(p1.shieldCD < 7200){
        p1.shieldCD++;
    }
    if(!p1.attack){
        p1.attackDirectX = 0;
        p1.attackDirectY = 0;
    }

    if(screenNum == 1 && (dist(925, 275, p1.plcX, p1.plcY) < 25)){
        fill(0);
        text("Rest", 890, 240);
    }

    if(screenNum == 1 && (dist(375, 625, p1.plcX, p1.plcY) < 25)){
        fill(0);
        text("Shop", 340, 590);
    }

    p1.healthBar();

    if(p1.rest){
        fill(0, 0, 0, fade);
        rect(0, 0, windowWidth, windowHeight);
        fade += count;
        if(fade > 255){
            count *= -1;
            setAllEnemies();
            p1.health = p1.maxHP;
        }else if(fade < 0){
            count *= -1;
            p1.rest = false;
        }
    }

    if(p1.shop){
        screen1.shopScreen();
    }

    if(p1.health <= 0){
        fill(0, 0, 0, fade);
        rect(0, 0, windowWidth, windowHeight);
        fade += count;
        if(fade == 256){
            setAllEnemies();
            count *= -1;
            screenNum = 1;
            bossEncounter = false;
            p1.plcX = windowWidth * 0.5;
            p1.plcY = windowHeight * 0.5;
        }else if(fade < 0){
            count *= -1;
            p1.health = p1.maxHP;
        }
    }
}

function town(){
    screens[screenNum].house(425, 200, 0, 9, 110);
    screens[screenNum].house(825, 200, 222, 221, 219);
    fill(56, 38, 24);
    rect(875, 170, 100, 40);
    textSize(32);
    fill(255, 255, 0);
    text("REST", 880, 200);
    screens[screenNum].house(275, 550, 181, 157, 129);
    fill(56, 38, 24);
    rect(325, 520, 100, 40);
    textSize(32);
    fill(255, 255, 0);
    text("SHOP", 330, 550);
    screens[screenNum].house(800, 550, 21, 35, 26);
    for(var i = 0; i < 15; i ++){
        screens[screenNum].trunk(townTreePosX[i], townTreePosY[i]);
    }
}

function mouseClicked(){
    if(screens[screenNum].type == -1 && screens[screenNum].ready == true){
        screenNum++;
    }
    
    if(screens[screenNum].type == 0 && buySword == true && p1.gold >= 25){
        //Change p1 attack
        p1.gold -= 25;
        p1.swordColor[0] = 28;
        p1.swordColor[1] = 40;
        p1.swordColor[2] = 66;
        p1.damage = 7;
        buySword = false;
        p1.hasSword = true;
    }else if(screens[screenNum].type == 0 && buyHat == true && p1.gold >= 150){
        //draw hat on p1
        p1.gold -= 150;
        buyHat = false;
        p1.hasHat = true;
    }else if(screens[screenNum].type == 0 && buyApple == true && p1.gold >= 25){
        //add health to p1
        p1.gold -= 25;
        p1.maxHP += 50;
        p1.health += 50;
        buyApple = false;
        p1.hasApple = true;
    }else if(screens[screenNum].type == 0 && back == true){
        p1.shop = false;
    }

    if(screens[screenNum].type == -2 && screens[screenNum].ready == true){
        screenNum = 1;
        p1.plcX = windowWidth * 0.5;
        p1.plcY = windowHeight * 0.5;
        setAllEnemies();
        p1.hasSword = false;
        p1.hasHat = false;
        p1.hasApple = false;
        p1.gold = 0;
    }
}

function displayShop(){
    fill(100, 100, 100, 200);
    rect(0, 0, windowWidth, windowHeight);
    fill(177, 143, 107);
    rect((windowWidth * 0.5) - 650, (windowHeight * 0.5) - 300, 1300, 600);
    fill(57, 37, 26);
    rect((windowWidth * 0.5) - 625, (windowHeight * 0.5) - 275, 1250, 550);
}