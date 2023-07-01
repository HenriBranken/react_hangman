import React from "react";
import css from "./TheChosenWord.module.css";

import { isLetter } from "./HelperFunctions";

// TheChosenWord is simply the random, mystery word selected by the computer algorithm.
// Initially, this appears as a string of ????.. at the top of the page.
// When a user picks a correct letter, the occurances of that letter in TheChosenWord is styled with css["answer-letter"].
// The other letters comprising TheChosenWord are styled with css["unknown-letter"].

// During the game, `TheChosenWord` gets updated, and the idea is to get all the letters styled according to css["answer-letter"].
const TheChosenWord = (props) => {

  return (
    <>
      <div className={css["answer-word"]}>
        {/* The spread operator is used to make an array out of a string */}
        {[...props.theCurrentWord].map((character, index) => {
          return <span key={index} className={ isLetter(character) ? css["answer-letter"] : css["unknown-letter"]}>{character}</span>;
        })}
      </div>
    </>
  );
};

export default TheChosenWord;
