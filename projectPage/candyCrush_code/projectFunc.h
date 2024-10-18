//Ethan Farley - Fundementals of Computing - Lab 11 - 12/9/23 - candyFunc.h 

#include <stdio.h>
#include <stdlib.h> 
#include <unistd.h>
#include <time.h>
#include "gfx2.h"


#define width 800 // width of graphics window
#define height 800 // height of graphics window
#define mrgn 50 // size of the margin around the edge of the board
#define boardSize 10 // amont of cells on one edge of the board. The board is always a square.

typedef struct{
    int type; // Which type of candy it is 0-5 are candies 6 is an empty square
    int x; // x location of the center of the cell
    int y; // y location of the center of the cell
    int size; // size of the square cell
    int selected; // cahnges between 1 and -1 depending on if the cell has been clicked on or not
} Candy;

void genAllCandy(Candy [boardSize][boardSize], int);
void draw(Candy [boardSize][boardSize]);
void drawCandy(Candy);
int checkForMatch(Candy [boardSize][boardSize], int, int, int *, int *);
void gravity(Candy [boardSize][boardSize], int);
void newCandy(Candy [boardSize][boardSize], int);
int click(Candy [boardSize][boardSize], int, int, int, int *, int *);
void swap(Candy [boardSize][boardSize], int, int, int, int, int *, int *);
void display(int *, int *, int);
void endScreen(int *);