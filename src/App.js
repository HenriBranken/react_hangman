import React, { useEffect, useReducer } from "react";

// Importing the different components.
import Keyboard from "./components/Keyboard";
import Button from "./components/Button";
import Hangman from "./components/Hangman";
import Modal from "./components/Modal";
import TheChosenWord from "./components/TheChosenWord";

// The dictionary .txt file.
import fp from "./assets/dictionary.txt";

// Some styling.
import css from "./App.module.css";
import cssbuttons from "./components/BottomButtons.module.css";

// Helper Functions (they are elaborated on in the `HelperFunctions.js` file):
import {
  getIndices,
  initialiseCurrentWord,
  populateWord,
  checkEntireString,
} from "./components/HelperFunctions";

// Helper Constants (they are elaborated on in the `HelperFunctions.js` file):
import {
  helpTitle,
  helpMessage,
  winTitle,
  winMessage,
  loseTitle,
  loseMessage,
} from "./components/HelperFunctions";


// In gameReducer, notice that:
//    dictWord:  The randomly chosen Dictionary Word that the user needs to guess.
//    keyboardValue:  The letter the user has clicked on.
//    progression:  The number of incorrect guesses the user has made during gameplay.
//    usedLetters:  All the letters the user has clicked on (correct and incorrect) during gameplay.
//    theCurrentWord:  The current state of the unveiled word.
//    developmentStatus:  0=Game is in play mode. 1=User has won. -1=User has lost.
//    pleaseHelp: true=The Help Modal is currently being displayed. false=The Help Modal is currently not being displayed.
const gameReducer = (state, action) => {
  // This `if` section gets triggered if (1) the user won/lost a round and clicked "Okay", (2) the user clicks the Reset button.
  if (action.type === "chooseRandom") {
    let theCurrentWord = initialiseCurrentWord(action.value);
    return {
      dictWord: action.value,
      keyboardValue: "",
      progression: 1,
      usedLetters: [],
      theCurrentWord: theCurrentWord,
      developmentStatus: 0,
      pleaseHelp: false,
    };
  }

  // This `if` section gets triggered if the user selected a 'correct' letter that belongs to `theChosenWord`.
  if (action.type === "matched_char") {
    let indices = getIndices(action.value, state.dictWord.toLowerCase());
    let theCurrentWord = populateWord(
      indices,
      state.theCurrentWord,
      action.value
    );
    let completionStatus = checkEntireString(theCurrentWord);
    // This `if` section gets triggered if the entire mystery word has been revealed without losing the game.
    // Notice that a "win" is denoted by `developmentStatus: 1`.
    if (completionStatus) {
      console.log("SUCCESS!!!!!");
      return {
        dictWord: state.dictWord,
        keyboardValue: action.value,
        progression: state.progression,
        usedLetters: [...state.usedLetters, action.value],
        theCurrentWord: theCurrentWord,
        developmentStatus: 1,
        pleaseHelp: state.pleaseHelp,
      };
    } else {
      // This section gets triggered if the user selected a correct letter, but the entire mystery word has not been revealed yet.
      // Notice that 'play mode' is denoted by `developmentStatus: 0`.
      return {
        dictWord: state.dictWord,
        keyboardValue: action.value,
        progression: state.progression,
        usedLetters: [...state.usedLetters, action.value],
        theCurrentWord: theCurrentWord,
        developmentStatus: 0,
        pleaseHelp: state.pleaseHelp,
      };
    }
  }
  // This `if` section gets triggered if the user selected an irrelevant letter.
  if (action.type === "unmatched_char") {
    // This `if` section gets triggered if the user has exhausted all of their chances, meaning that they basically lost.
    // Notice that "Lost" is denoted by `developmentStatus: -1`.
    if (state.progression === 10) {
      console.log("The user has lost.");
      return {
        dictWord: state.dictWord,
        keyboardValue: action.value,
        progression: state.progression + 1,
        usedLetters: [...state.usedLetters, action.value],
        theCurrentWord: state.dictWord,
        developmentStatus: -1,
        pleaseHelp: state.pleaseHelp,
      };
    } else {
      // This section gets triggered if an irrelevant letter has been chosen, but the user still has chances available to them to continue the game.
      // Notice again the "play mode" is denoted by `developmentStatus: 0`.
      return {
        dictWord: state.dictWord,
        keyboardValue: action.value,
        progression: state.progression + 1,
        usedLetters: [...state.usedLetters, action.value],
        theCurrentWord: state.theCurrentWord,
        developmentStatus: 0,
        pleaseHelp: state.pleaseHelp,
      };
    }
  }
  // This `if` section gets triggered if the user clicked the `Help` button to trigger the `Help Modal Screen`.
  if (action.type === "help") {
    return {
      dictWord: state.dictWord,
      keyboardValue: state.value,
      progression: state.progression,
      usedLetters: state.usedLetters,
      theCurrentWord: state.theCurrentWord,
      developmentStatus: state.developmentStatus,
      pleaseHelp: action.value,
    };
  }
  // This `if` section gets triggered if the user clicks the "Okay" button to close the `Help Modal` screen.
  if (action.type === "reset_help") {
    return {
      dictWord: state.dictWord,
      keyboardValue: state.value,
      progression: state.progression,
      usedLetters: state.usedLetters,
      theCurrentWord: state.theCurrentWord,
      developmentStatus: state.developmentStatus,
      pleaseHelp: action.value,
    };
  }
};

function App() {
  // The initial state of the game.
  // See the explanation at the top for more detail on every state element.
  let initialState = {
    dictWord: "",
    keyboardValue: "",
    progression: 1,
    usedLetters: [],
    theCurrentWord: "",
    developmentStatus: 0,
    pleaseHelp: false,
  };

  // Making use of the `useReducer` hook to manage the state of the App throughout its usage.
  const [gameState, dispatchAction] = useReducer(gameReducer, initialState);

  // A function that selects a random word from the dictionary text file.
  // This is also that function that "initiates" a new round in Hangman.
  //    Notice the `dispatchAction()`.
  async function getWord() {
    let sentinal = true;
    while (sentinal) {  // Iterate until we get a word that is purely alphabetical.
      let response = await fetch(fp);
      let textString = await response.text();
      let arr = textString.split("\n");
      let word =
        arr[arr.lastIndexOf("START") + Math.floor(Math.random() * arr.length)];
      if (/^[a-zA-Z]+$/.test(word)) { // Checks if the word is purely alphabetic in nature.
        sentinal = false;  // We may proceed and safely choose this `word`.
        dispatchAction({ type: "chooseRandom", value: word });
      }
    }
  }

  // useEffect executes `getWord()` exactly once at the beginning of the App.
  // If this is not used, then a word has not been chosen, meaning the user cannot start playing the game, which would make the game look buggy.
  useEffect(() => {
    getWord();
  }, []);

  const handleKeyboardEvent = (event) => {
    // If we just clicked on the colored background of the `keyboard`, ignore it.
    // We are only interested in clicks on the alphabetic letters.
    if (event.target.tagName === "DIV") {
      return;
    }
    // If the user has clicked on an alphabetic letter, then drill down into that click event and fetch the `textContent` to infer what letter has been clicked.
    if (event.target.tagName === "SPAN") {
      let letter = event.target.textContent.toLowerCase();
      let formsPart = gameState.dictWord.toLowerCase().includes(letter);
      if (formsPart) { // We've made a correct choice.
        dispatchAction({ type: "matched_char", value: letter });
      } else { // We've clicked an irrelevant letter.
        dispatchAction({ type: "unmatched_char", value: letter });
      }
    }
  };

  // Execute this handler when:
  //  [1] The user clicked the "Reset" button.
  //  [2] The user has lost, and clicked "Okay" on the Modal Screen.
  //  [3] The user has won, and clicked "Okay" on the Modal Screen.
  const handleReset = () => {
    getWord();
  };

  // Execute this when the user clicked on the "Help" button.
  const handleHelp = () => {
    dispatchAction({ type: "help", value: true });
  };

  // Execute this when the user clicked "Okay" on the help modal,
  // or if they clicked anywhere on the BackDrop.
  const handleHaveReadHelp = () => {
    dispatchAction({ type: "reset_help", value: false });
  };

  return (
    <>
    {/*Logic to determine whether a Modal Screen needs to be displayed.*/}
    {/*When the user clicked on the "Help" button, display this Help Modal.*/}
      {gameState.pleaseHelp && (
        <Modal
          title={helpTitle}
          message={helpMessage}
          width="65%"
          onConfirm={handleHaveReadHelp}
        />
      )}
      {/*When the user has Won, display this Victory Modal.*/}
      {gameState.developmentStatus === 1 && (
        <Modal title={winTitle} message={winMessage} width={"25%"} onConfirm={handleReset} />
      )}
      {/*When the user has Lost, display this Defeat Modal.*/}
      {gameState.developmentStatus === -1 && (
        <Modal title={loseTitle} message={loseMessage} width={"25%"} onConfirm={handleReset} />
      )}
      
      {/*The layout of the App on the Screen.*/}
      {/*The Hangman Banner at the top of the Screen.*/}
      <div className={css.play}>Hangman</div>

      {/*The Chosen Word being displayed in a flex container.*/}
      <TheChosenWord theCurrentWord={gameState.theCurrentWord} />

      {/*Wrapper for both the KeyBoard and Hangman animation.  Implements a flex layout in the row direction*/}
      <div className={css.keyboardAndHangman}>
        {/*The Keyboard on the left hand side of the screen.*/}
        <div className={css.keyboard}>
          <Keyboard
            onKeyboardClick={handleKeyboardEvent}
            used={gameState.usedLetters}
          />
        </div>
        {/*The Hangman drawing on the right hand side of the screen*/}
        <div className={css.hangman}>
          <Hangman progression={gameState.progression} />
        </div>
      </div>

      {/*A paragraph privy to the Developer of the game.*/}
      <p style={{ textAlign: "center", color: "white"}}>{gameState.dictWord}</p>

      {/*Wrapper for two Buttons at the bottom of the screen, namely the "Reset" and "Help" buttons.*/}
      <div className={cssbuttons.bottomRow}>
        <Button onClick={handleReset}>Reset</Button>
        <Button onClick={handleHelp}>Help</Button>
      </div>
    </>
  );
}

export default App;
