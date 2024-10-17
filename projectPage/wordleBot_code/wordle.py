import re
import sys

with open('wordleWords.txt', 'r') as file:
    words = file.readlines()

validWords = [word.strip() for word in words]

letterScore = {'a': 1, 'b': 3, 'c': 3, 'd': 2, 'e': 1, 'f': 4, 'g': 2, 'h': 4, 'i': 1, 'j': 8,'k': 5, 
               'l': 1, 'm': 3, 'n': 1, 'o': 1, 'p': 3, 'q': 10, 'r': 1, 's': 1, 't': 1, 'u': 1, 'v': 4, 
               'w': 4, 'x': 8, 'y': 4, 'z': 10}

def genGreenList(wordList, word, green):
    regex = ''
    for letter in word:
        if letter not in green:
            regex += '.'
        else:
            regex += letter
    return [guess for guess in wordList if re.findall(regex, guess)]

def genYellowList(guess, greenList, yellow):
    if yellow == '\0':
        return greenList
    yellowList = greenList
    for x in yellow:
        yellowList = [word for word in [word for word in yellowList if re.findall(x, word)] if word.index(x) != guess.index(x)]
    return yellowList

def removeUsedLetters(yellowList, usedLetters):
    guess = []
    for word in yellowList:
        add = True
        for letter in word:
            if letter in usedLetters:
                add = False
        if add:
            guess.append(word)
    return guess

def rankGuesses(guesses):
    rankings = {}
    for word in guesses:
        score = 0
        for letter in word:
            if word.count(letter) > 1:
                score += letterScore[letter]
            score += letterScore[letter]
        rankings[word] = score
    return sorted(rankings.items(), key=lambda x: x[1], reverse=False)

def rankGuesses2(guesses):
    commonLetter = {}

    for word in guesses:
        for letter in word:
            if letter in commonLetter:
                commonLetter[letter] += 1
            else:
                commonLetter[letter] = 1

    wordScore = {}
    for word in guesses:
        score = 0
        for letter in word:
            if word.count(letter) > 1:
                score -= commonLetter[letter]
            score += commonLetter[letter]
        wordScore[word] = score

    return sorted(wordScore.items(), key=lambda x: x[1], reverse=True) 

def validGuesses(wordList, guess, green = '\0', yellow = '\0', usedLetters = '\0'):
    greenList = genGreenList(wordList, guess, green)
    yellowList = genYellowList(guess, greenList, yellow)
    guesses = removeUsedLetters(yellowList, usedLetters)
    rankedGuesses = rankGuesses(guesses)
    rankedGuesses2 = rankGuesses2(guesses)

    print('\nGuesses based on Scrabble Scores:\n')
    for word in rankedGuesses[:5]:
        print(word[0], '   ', end = '')

    print('\n\n------------------------------\n')

    print('Guesses based on Letter Frequency:\n')
    for word in rankedGuesses2[:5]:
        print(word[0], '   ', end = '')

    print('\n\n------------------------------\n')

    print('Total remaining answers: ' + str(len(rankedGuesses2)) + '\n')

    return guesses

def main(arg=sys.argv[1:]):
    try:
        guess = arg[0]
    except IndexError:
        guess = '\0'
    try:
        green = arg[1]
    except IndexError:
        green = '\0'
    try:
        yellow = arg[2]
    except IndexError:
        yellow = '\0'

    usedLetters = []
    attempts = 5
    wordList = []

    while attempts != 0:
        for letter in guess:
            if letter not in green and letter not in yellow:
                usedLetters.append(letter)

        if attempts == 5:
            wordList = validGuesses(validWords, guess, green, yellow, usedLetters)
        else:
            wordList = validGuesses(wordList, guess, green, yellow, usedLetters)
        attempts -= 1

        newGuess = input('Enter your next guess, green letters, and yellow letters: ').split()
        try:
            guess = newGuess[0]
        except IndexError:
            guess = '\0'
        try:
            green = newGuess[1]
        except IndexError:
            green = '\0'
        try:
            yellow = newGuess[2]
        except IndexError:
            yellow = '\0'

if __name__ == '__main__':
    main()