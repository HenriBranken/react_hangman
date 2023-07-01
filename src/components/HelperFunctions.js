// These functions are not defined in the App.js component
// That would clutter the App.js file.

// Find all the indices at which a specific character is located in a word string.
// Return the indices as an array.
export function getIndices(character, wordString) {
  let indices = [];

  for (let index = 0; index < wordString.length; index++) {
    if (wordString[index] === character) {
      indices.push(index);
    }
  }
  return indices;
}

// In the beginning of the Game, let the mystery word be represented by QuestionMark Emojis.
// E.g., if the word is "train", the initial word would be "?????".
export function initialiseCurrentWord(word) {
  let result = "";
  for (let i = 0; i < word.length; i++) {
    result += "❔";
  }
  return result;
}

// Take `character`, and insert it at every index (in the `indices` array) in the string `theCurrentWord`.
export function populateWord(indices, theCurrentWord, character) {
  let newString = theCurrentWord;
  for (const idx of indices) {
    // Replacement taking place at `idx`.
    newString = newString.slice(0, idx) + character + newString.slice(idx + 1);
  }
  return newString;
}

// Confirm whether a character is a valid alphabetic letter.
export function isLetter(str) {
  return str.length === 1 && str.match(/[a-z]/i);
}

// Checks whether all the characters in `str` are valid alphabetic letters.
// If they all are, return `true`.
// If at least one character is not alphabetic, return false.
export function checkEntireString(str) {
  for (const char of [...str]) {
    if (!isLetter(char)) {
      return false;
    }
  }
  return true;
}

// Text to display in a modal when the user has won.
export const winTitle = <>Congratulations! 🎊</>
export const winMessage = <p>Well done on winning this round of Hangman.</p>

// Text to display when in a modal the user has lost.
export const loseTitle = <>Sorry! 😭</>
export const loseMessage = <p>It appears that the computer has chosen a difficult word. Better luck next time.</p>


// Text to display when the user has clicked the `Help` Button.
export const helpTitle = <>How to play Hangman</>;

export const helpMessage = (
  <div>
    <p>
      <ol>
        <li>
          The computer has chosen a random, mystery word from the dictionary,
          and it is your job to guess what that word is.
        </li>
        <li>
          You are provided with an on-screen keyboard, and you may test out if
          the mystery word contains your selected letters.
        </li>
        <li>
          Once a letter has been selected, it cannot be re-selected again.
        </li>
        <li>
          The challenge is that you're only allowed a maximum of 9 mistakes with
          regards to picking a letter.
        </li>
        <li>
          If you have not finished the mystery word, and make your 10th mistake,
          then it is game over for you, and the complete "Hangman Picture" will be shown.
        </li>
        <li>
          However, if you've successfully found all letters belonging to the
          mystery word before making your 10th mistake, then you have won the
          game.
        </li>
        <li>
          As more characters get revealed in the mystery word, try to deduce what the
          entire word is in an attempt to not lose the game.
        </li>
        <li>
          Once you have won or lost the game, click the "Okay" button to
          start a fresh new round of Hangman.
        </li>
        <li>If you have lost, the entire word will be revealed to you at the end.</li>
      </ol>
    </p>
    <p>
      At any point during the game, you are welcome to click the "Reset" button
      to generate a new, different word.
    </p>
  </div>
);
