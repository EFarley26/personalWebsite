//Ethan Farley - Fundementals of Computing - Lab 11 - 12/9/23 - candy.c 

#include <stdio.h>
#include <stdlib.h> 
#include <unistd.h>
#include <time.h>
#include "gfx2.h"
#include "projectFunc.h"
struct Candy; 

int main(){
    // Initialize Varibles
    srand(time(NULL));
    char c; 
    int score = 0, moves = 20, repeat = 1, loop = 0, match = 1, clicks = 0, again = 1, cellSize = (width - mrgn*2) / 10;
    int *pnt = &score;
    int *movesLeft = &moves;
    *pnt = 0;
    Candy allCandy[boardSize][boardSize];

    // sets up each cell in the allCandy 2D array as idividual candies
    genAllCandy(allCandy, cellSize);

    // looks at the starting board and removes all the matches so that
    // the first board the user sees has no matches currently on it
    while(match){
        match = 0;
        for(int k = 5; k > 2; k--){
            match = checkForMatch(allCandy, k, loop, pnt, movesLeft);
            if(match){
                gravity(allCandy, loop);
                newCandy(allCandy, loop);
                break;
            }
        }
    }

    // opens the graphics window 
    gfx_open(width, height, "candy.c");
    // draws the intial board
    draw(allCandy);

    // by setting loop to one, the functions that need to draw individual candies
    // can now do that and it also lets the while loop start
    loop = 1;
    while(loop){
        // displays your score and the amout of moves you have left.
        display(pnt, movesLeft, 0);

        // waits for the user to do an input
        c = gfx_wait();
        switch(c){
            case 1: 
                // if it is a click, the if statement checks to make sure the click is on the board
                if(mrgn < gfx_xpos() && gfx_xpos() < width - mrgn && mrgn < gfx_ypos() && gfx_ypos() < height - mrgn){
                    // calulates which cell was clicked on as saves it to int x and int y.
                    int x = (gfx_ypos() - mrgn) / 70;
                    int y = (gfx_xpos() - mrgn) / 70;
                    clicks = click(allCandy, x, y, clicks, pnt, movesLeft);
                    usleep(10000);
                }
                break;
            case 'r':
                // if there are no availble moves on the board, you can press 'r' to generate
                // a fully new board, but you will lose 1000 points if you do so try not to let it happen.
                repeat = 1;
                genAllCandy(allCandy, cellSize);
                *pnt -= 1000;
                while(repeat){
                    repeat = 0;
                    for(int k = 5; k > 2; k--){
                        repeat = checkForMatch(allCandy, k, 0, pnt, movesLeft);
                        if(repeat){
                            gravity(allCandy, 0);
                            newCandy(allCandy, 0);
                            break;
                        }
                    }
                }
                draw(allCandy);
                break;
            // breaks the while loop to end the game when 'q' is pressed
            case 'q': loop = 0; break;
            default: break;
        }
        
        // sets again to 1 that way the proceeding while loop is guarenteed to run each
        // iteration of the bigger while loop. This loop goes until no matches are found 
        // therefore the board no longer needs to be updated.
        again = 1;
        while(again){
            usleep(10000);
            again = 0;
            // by starting at 5 and working its way to 3, this for loop checks
            // for candy that are 5 in a row, then check for candy that are four in a row
            // and finally check for candies that are three in a row
                for(int l = 5; l > 2; l--){
                    again = checkForMatch(allCandy, l, loop, pnt, movesLeft);
                    gravity(allCandy, loop);
                    newCandy(allCandy, loop);
            }
        }
        // when you run out of moves the game ends of the end screen is displayed beofre the 
        // program ends.
        if(*movesLeft <= 0) {
            loop = 0;
            endScreen(pnt); 
        }
    }
    return 0;
}
