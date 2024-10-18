# Ethan Farley - Fundementals of Computing - Lab 11 - 12/9/23 - Makefile 

project: projectFunc.o project.o
	gcc projectFunc.o project.o gfx2.o -lX11 -o project

projectFunc.o: projectFunc.c projectFunc.h
	gcc -c projectFunc.c -lX11 -o projectFunc.o

project.o: project.c projectFunc.h
	gcc -c project.c -lX11 -o project.o

clean:
	rm projectFunc.o
	rm project.o
	rm project