//Ethan Farley - Fundementals of Computing - Lab 11 - 12/9/23 - candyFunc.c 

#include <stdio.h>
#include <stdlib.h> 
#include <unistd.h>
#include <time.h>
#include "gfx2.h"
#include "projectFunc.h"

struct Candy;

// Initalized every candy found in the allCandy 2D array that represents the board 
void genAllCandy(Candy allCandy[boardSize][boardSize], int cellSize){
    for(int i = 0; i < boardSize; i++){
        for(int j = 0; j < boardSize; j++){
            allCandy[i][j].size = cellSize;
            allCandy[i][j].x = mrgn + (cellSize * j) + cellSize / 2;
            allCandy[i][j].y = mrgn + (cellSize * i) + cellSize / 2;
            allCandy[i][j].type = rand() % 6;
            allCandy[i][j].selected = -1;
        }
    } 
}

// draws the background and every candy on the board
void draw(Candy allCandy[boardSize][boardSize]){
    // draws the dark blue background
    gfx_color(29, 53, 87);
    gfx_fill_rectangle(0, 0, width, height);

    // draws every candy from top left to bottom right
    for(int i = 0; i < boardSize; i++){
        for(int j = 0; j < boardSize; j++){
            drawCandy(allCandy[i][j]);
        }
    }
}

// draws the given candy based on its type with a white square background
void drawCandy(Candy candy){
    // draws the white background for the given candy
    gfx_color(255, 255, 255);
    gfx_fill_rectangle(candy.x - candy.size/2, candy.y - candy.size/2, candy.size, candy.size);
    // switches based of the candy type and then draws the corrisponding shape.
    // 6 is empty to make it look like the candy disappears
    switch(candy.type){
        case 0: 
            gfx_color(255, 190, 11);
            gfx_fill_circle(candy.x, candy.y, candy.size/2.5);
            break;
        case 1:
            gfx_color(251, 86, 7);
            gfx_fill_rectangle(candy.x - (candy.size/1.5)/2, candy.y - (candy.size/1.5)/2, candy.size/1.5, candy.size/1.5);
            break;
        case 2:
            gfx_color(255, 0, 110);
            XPoint mypts1[] = {{candy.x - candy.size/2.5, candy.y + candy.size/2.5}, {candy.x, candy.y - candy.size/2.5}, {candy.x + candy.size/2.5, candy.y + candy.size/2.5}, {candy.x - candy.size/2.5, candy.y + candy.size/2.5}};
            gfx_fill_polygon(mypts1, 4);
            break;
        case 3:
            gfx_color(131, 56, 236);
            XPoint mypts2[] = {{candy.x - candy.size/2.5, candy.y}, {candy.x, candy.y - candy.size/2.5}, {candy.x + candy.size/2.5, candy.y}, {candy.x,candy.y + candy.size/2.5}, {candy.x - candy.size/2.5, candy.y}};
            gfx_fill_polygon(mypts2, 5);
            break;
        case 4:
            gfx_color(58, 134, 255);
            XPoint mypts3[] = {{candy.x - candy.size/2.5, candy.y - candy.size/10}, {candy.x, candy.y - candy.size/2.5}, {candy.x + candy.size/2.5, candy.y - candy.size/10}, {candy.x + candy.size/4, candy.y + candy.size/2.5}, {candy.x - candy.size/4, candy.y + candy.size/2.5}, {candy.x - candy.size/2.5, candy.y - candy.size/10}};
            gfx_fill_polygon(mypts3, 6);
            break;
        case 5:
            gfx_color(138, 201, 38);
            XPoint mypts4[] = {{candy.x - candy.size/3, candy.y - candy.size/4}, {candy.x, candy.y - candy.size/2.5}, {candy.x + candy.size/3, candy.y - candy.size/4}, {candy.x + candy.size/3, candy.y + candy.size/4}, {candy.x, candy.y + candy.size/2.5}, {candy.x - candy.size/3, candy.y + candy.size/4}, {candy.x - candy.size/3, candy.y - candy.size/4}};
            gfx_fill_polygon(mypts4, 7);
            break;
        case 6:
            break;
        default: break;
    }
    return;
}

// goes throuhg the allCandy 2D array and looks for the number of same type of candies in a row depending on which
// matchNum is passsed in. If a match is found, those candies are turned to empty spaces, points are awarded, and 
// 1 is returned to signify that a match was found.
int checkForMatch(Candy allCandy[boardSize][boardSize], int matchNum, int print, int *pnt, int *movesLeft){
    int total;
    // This nested for loop goes through the entire board
    // for each candy it checks to see if its neighbors on the right of the same type as it
    // the amount of neighbors it checks corrisponds to matchNum. This is 5 when it is look for 5 
    // candies in a row or 4 when it is looking for 3 candies in a row. If the amount of same candies 
    // in a row match the number we are looking for, then a match is found and each of those candies 'disappears' or
    // turns to type six. Finally it returns 1 to signify that a match was found.
    for(int i = 0; i < boardSize; i++){
        for(int j = 0; j < boardSize - matchNum + 1; j++){
            total = 0;
            for(int k = 0; k < matchNum; k++){
                if(allCandy[i][j].type < 6 && allCandy[i][j].type == allCandy[i][j + k].type){
                    total++;
                }
            }
            if(total == matchNum){
                int temp = allCandy[i][j].type;
                for(int k = 0; k < matchNum; k++){
                    allCandy[i][j + k].type = 6;
                }
                if(print) display(pnt, movesLeft, matchNum);
                return 1;
            }
        }
    }

    // This nested for loop goes through the entire board
    // for each candy it checks to see if its neighbors below of the same type as it
    // the amount of neighbors it checks corrisponds to matchNum. This is 5 when it is look for 5 
    // candies in a row or 4 when it is looking for 3 candies in a row. If the amount of same candies 
    // in a row match the number we are looking for, then a match is found and each of those candies 'disappears' or
    // turns to type six. Finally it returns 1 to signify that a match was found.
    for(int i = 0; i < boardSize - matchNum + 1; i++){
        for(int j = 0; j < boardSize; j++){
            total = 0;
            for(int k = 0; k < matchNum; k++){
                if(allCandy[i][j].type < 6 && allCandy[i][j].type == allCandy[i + k][j].type){
                    total++;
                }
            }
            if(total == matchNum){
                int temp = allCandy[i][j].type;
                for(int k = 0; k < matchNum; k++){
                    allCandy[i + k][j].type = 6;
                }
                if(print) display(pnt, movesLeft, matchNum);
                return 1;
            }
        }
    }
    return 0;
}

// pulls all of the candy towards the bottom of the screen if there are blank spaces. Then generates new candies at
// the top of the screen to fill the blank spaces left behind.
void gravity(Candy allCandy[boardSize][boardSize], int print){
    int change = 1;
    // keeps looking until no candies are moved making sure that all of the empty 
    // spaces are moveed to the top of the board. 
    while(change){
        change = 0;
        for(int i = 0; i < boardSize - 1; i++){
            for(int j = 0; j < boardSize; j++){
                // if the current cell has a candy in it and the cell below it
                // is empty then shift every candy down a cell and make the top cell empty.
                if(allCandy[i][j].type != 6 && allCandy[i + 1][j].type == 6){
                    //
                    for(int k = i; k >= 0; k--){
                        allCandy[k + 1][j].type = allCandy[k][j].type;
                    }
                    // generates a new random candy at the top cell to imitate 
                    // a candy dropping in from off screen.
                    allCandy[0][j].type = rand() % 6;

                    // if the game as started and the graphics window is open
                    // this redraw to the changed candies to show that change
                    if(print){
                        for(int l = 0; l < boardSize; l++){
                            drawCandy(allCandy[l][j]);
                        }
                    }

                    // signifies that a change has happened to keep the while loop going
                    change = 1;
                }
            }
        }
    }
}

// generates new candies at the top of the screen insuring the board is always filled 
void newCandy(Candy allCandy[boardSize][boardSize], int print){
    // cycles through the top row of the board and generates a new
    // candy if the space is empty. This mainly used when matches are found at the top
    // of the sceen and the gravity function isnt used so without this, those spaces would
    // remain empty.
    for(int i = 0; i < boardSize; i++){
        // if the space is empty
        if(allCandy[0][i].type == 6){
            // then replace it with a random candy
            allCandy[0][i].type = rand() % 6;
            // if the game as started then redraw the new candy on the board
            if(print) drawCandy(allCandy[0][i]);
        }
    }
}

// called when the mouse is clicked and sets the clicked on candies 'selected' value to 1 or -1 accordingly. If this is
// the first click then a circle is draw around the candy to show where the user selceted. If this is the second click,
// then the program check to see if the click in touching the candy that was first clicked on. If it is touching, then the swap
// function is called. Finally, no matter what, the orginal candy in unselected and everything is reset for the next click.
int click(Candy allCandy[boardSize][boardSize], int x, int y, int clicks, int *pnt, int *movesLeft){
    // the clicked on candy has its 'selected value' changes to 1 to show that it has been clicked on
    allCandy[x][y].selected *= -1;
    // that candy then has all of its attributes transfered to pickedCandy
    Candy pickedCandy = allCandy[x][y];

    // this check if the user clicks on a previously unlicked candy and this is there second click
    if(pickedCandy.selected == 1 && clicks == 1){
        // this series of if statements check if the second click is touching the candy that 
        // was clicked on the first time. If yes, then the swpa function is called.
        if(allCandy[x - 1][y].selected == 1){ 
            swap(allCandy, x, y, x - 1, y, pnt, movesLeft);
        }else if(allCandy[x + 1][y].selected == 1){
            swap(allCandy, x, y, x + 1, y, pnt, movesLeft);
        }else if(allCandy[x][y - 1].selected == 1){
            swap(allCandy, x, y, x, y - 1, pnt, movesLeft);
        }else if(allCandy[x][y + 1].selected == 1){
            swap(allCandy, x, y, x, y + 1, pnt, movesLeft);
        }
        // finally no matter what, all candies have their slected values reset if they are not already -1 
        // and if there arecurrently a type 6 candy (an empty space), they are redrawn.
        for(int i = 0; i < boardSize; i++){
            for(int j = 0; j < boardSize; j++){
                if(allCandy[i][j].selected == 1 || allCandy[i][j].type == 6){ 
                    drawCandy(allCandy[i][j]);
                    allCandy[i][j].selected = -1;
                }
            }
        }
        // lastly clicks is set back to 0
        clicks = 0;

    // this checks if it is the users first click and if the candy they are clicking on has not
    // been clicked on before
    }else if(pickedCandy.selected == 1 && clicks == 0){
        // if it passes that check, the clicks counter is increased to show a valid
        // click was preformed and a circle is drawn around the clicked candy to show
        // where the user clicked
        clicks++;
        gfx_color(64, 61, 57);
        gfx_circle(pickedCandy.x, pickedCandy.y, pickedCandy.size/2.1);

    // this checks if it is the users second click and if they have click on the same candy they clicked 
    // on the first time.
    }else if(pickedCandy.selected == -1 && clicks == 1){
        // if it pass that check, then the click counter is decrease and the candy is redrawn without the
        // circle showing the user has unselected their previous choice.
        clicks--;
        drawCandy(pickedCandy);
    }
    return clicks;
}

// called when a valid swap is being preformed. This funciton copies the current board onto a new board and then
// preforms the swap on a new board. If there is a match on the newBoard, then the newboard gets transfered back
// on top of the current board with the swap made. Finally the moves counter is decreased.
void swap(Candy allCandy[boardSize][boardSize], int x1, int y1, int x2, int y2, int *pnt, int *movesLeft){
    int typeTemp;
    Candy newBoard[boardSize][boardSize];
    // this nested for loop copies the entire allCandy 2D array onto the newBoard 2D array
    for(int i = 0; i < boardSize; i++){
        for(int j = 0; j < boardSize; j++){
            newBoard[i][j] = allCandy[i][j];
        }
    }

    // this preformed the user requested swap on the newBoard 2D array
    typeTemp = newBoard[x1][y1].type;
    newBoard[x1][y1].type = newBoard[x2][y2].type;
    newBoard[x2][y2].type = typeTemp;
    newBoard[x1][y1].selected = -1;
    newBoard[x2][y2].selected = -1;

    // this for loop check to see if there is a valid match on the newly swaped newBoard
    for(int k = 5; k > 2; k--){
        if(checkForMatch(newBoard, k, 1, pnt, movesLeft)){
            // if there is a match, then newBoard is copies back on the allCandy 2D array 
            for(int i = 0; i < boardSize; i++){
                for(int j = 0; j < boardSize; j++){
                    allCandy[i][j] = newBoard[i][j];
                }
            }
            // finally, the swapped candies and redraw to reflect that they switch places 
            // and the moves counter is decreased
            drawCandy(allCandy[x1][y1]);
            drawCandy(allCandy[x2][y2]);
            (*movesLeft)--;
            return;
        }
    }
}

// This funciton displays your current score and remaining moves at the top of the screen.
void display(int *pnt, int *movesLeft, int multiplier){
    // this calculates your new score based on the give multiplier which relates to the
    // type of match that was made. A match of 5 candies gets more points than a match of 3 candies
    *pnt += 50 * (3 * multiplier);
    char str[10];
    // this converts the score int into a string to be displayed
    sprintf(str, "%d", *pnt);
    //prints the black rectanlge upon which the score and mvoes is displayed
    gfx_color(0, 0, 0);
    gfx_fill_rectangle(width/2.3, 0, 100, 50);
    // prints the score
    gfx_color(255, 255, 255);
    gfx_text(width/2.3, 20, "Score: ");
    gfx_text(width/2, 20, str);
    char movesStr[10];
    // this converts the moveLeft int into a string to be displayed
    sprintf(movesStr, "%d", *movesLeft);
    gfx_color(255, 255, 255);
    // prints the moves left
    gfx_text(width / 2.3, 30, "Moves: ");
    gfx_text(width / 2, 30, movesStr);
}

// this fucntion displays the screen shows when the game is finished before the program quits.
void endScreen(int *pnt){
    // clears the scree to remove the board and all the candies
    gfx_clear();
    char str[10];
    // this converts the score int into a string to be displayed
    sprintf(str, "%d", *pnt);
    gfx_color(255, 255, 255);
    // display a thank you message and final score the user got
    gfx_text(width/2.3, height/2, "Thanks for Playing!");
    gfx_text(width/2.3, height/1.9, "Score: ");
    gfx_text(width/2, height/1.9, str);
    // makes sure this message is displayed 
    gfx_flush();
    // waits a set amount of time so the user has time to read the message
    usleep(10000000);
}