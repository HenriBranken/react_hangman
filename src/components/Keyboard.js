import React from "react";

import css from "./Keyboard.module.css";

// This is the Keyboard component through which the user can pass input to the program (based on the selected letter).
const Keyboard = (props) => {
  // State is lifted up so that parent can store the value of the clicked letter.
  const clickHandler = (event) => {
    props.onKeyboardClick(event);
  };

  // There are four rows of letters (for styling purposes),
  // and therefore four instances of <div className={css["div-row"]}> below nested inside the
  // parent <div className={css.keyboard} onClick={clickHandler}> element.

  // <div className={css.keyboardContainer}> is used as a wrapper and to force the display property of the keyboard to be `inline-block`.

  // You will notice that there are Ternary Operations.
  // They are used to determine if a specific letter has been clicked on:
  // If true: then black-out the letter and make it unresponsive to the user.
  // If false: then don't black out the letter, and keep it responsive for user interaction.
  // (In Hangman, there is no point in selecting a specific letter more than once).
  return (
    <div className={css.keyboardContainer}>
      <div className={css.keyboard} onClick={clickHandler}>
        <div className={css["div-row"]}>
          {["a", "b", "c", "d", "e", "f", "g"].map((letter) => (
            <span
              key={letter}
              className={
                props.used.includes(letter) ? css["used-letter"] : css.letter
              }
            >
              {letter}
            </span>
          ))}
        </div>
        <div className={css["div-row"]}>
          {["h", "i", "j", "k", "l", "m"].map((letter) => (
            <span
              key={letter}
              className={
                props.used.includes(letter) ? css["used-letter"] : css.letter
              }
            >
              {letter}
            </span>
          ))}
        </div>
        <div className={css["div-row"]}>
          {["n", "o", "p", "q", "r", "s"].map((letter) => (
            <span
              key={letter}
              className={
                props.used.includes(letter) ? css["used-letter"] : css.letter
              }
            >
              {letter}
            </span>
          ))}
        </div>
        <div className={css["div-row"]}>
          {["t", "u", "v", "w", "x", "y", "z"].map((letter) => (
            <span
              key={letter}
              className={
                props.used.includes(letter) ? css["used-letter"] : css.letter
              }
            >
              {letter}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Keyboard;
