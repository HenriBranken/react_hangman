import React from "react";

// Import the different states of the Hangman Drawing.
import state1 from "../assets/hangmandrawings/state1.GIF";
import state2 from "../assets/hangmandrawings/state2.GIF";
import state3 from "../assets/hangmandrawings/state3.GIF";
import state4 from "../assets/hangmandrawings/state4.GIF";
import state5 from "../assets/hangmandrawings/state5.GIF";
import state6 from "../assets/hangmandrawings/state6.GIF";
import state7 from "../assets/hangmandrawings/state7.GIF";
import state8 from "../assets/hangmandrawings/state8.GIF";
import state9 from "../assets/hangmandrawings/state9.GIF";
import state10 from "../assets/hangmandrawings/state10.gif";
import state11 from "../assets/hangmandrawings/state11.GIF";

// Styling of the Hangman.
import css from "./Hangman.module.css";

// The hangman drawing is dependent on how many mistakes the user has made.
// This is reflected in the `progression` variable.
const Hangman = (props) => {
  // Make sequence of Hangman figures.
  let states = [
    state1,
    state2,
    state3,
    state4,
    state5,
    state6,
    state7,
    state8,
    state9,
    state10,
    state11,
  ];

  // Retrieve the correct figure that needs to be displayed on the screen.
  // Account for indexing by subtracting 1.
  let idx = props.progression - 1;
  let gifImgPath = states[idx];

  // Display the image on the screen.
  return (
    <div className={css.hangman}>
      <img src={gifImgPath} alt="Hangman State" height="460px" />
    </div>
  );
};

export default Hangman;
