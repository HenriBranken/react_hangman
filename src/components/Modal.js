import Button from "./Button";

import css from "./Modal.module.css";

// A modal component for [1] when the user wins or loses, [2] when the user has clicked the Help button.
// You'll notice that the modal consists of a (1) overlay a.k.a. backdrop, (2) the modal 'box' containing all the text content,
// (2.1) the header, (2.2) the content, and (2.3) the footer.
// The overlay darkens the background, and sits on top of the div stack because of a high z-index.

// Notice that props.onConfirm is activated when the user clicks on the backdrop or Okay button.
// This is to clear the modal from the screen so that the user may continue.
const Modal = (props) => {
  return (
    <div>
      <div className={css.backdrop} onClick={props.onConfirm} /> {/*A div sibling*/}
      <div className={css.modal} style={{width: props.width}}>
        <header className={css.header}>
          <h2>{props.title}</h2>
        </header>
        <div className={css.content}>
          <p>{props.message}</p>
        </div>
        <footer classes={css.actions}>
          <Button onClick={props.onConfirm}>Okay</Button>
        </footer>
      </div>
    </div>
  );
};

export default Modal;
