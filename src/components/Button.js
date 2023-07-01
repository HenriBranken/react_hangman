import React from "react";

import css from "./Button.module.css";

// A button component the user can click on (with some added styling with {css.button}).
const Button = (props) => {
  return (
    <button className={css.button} onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export default Button;
