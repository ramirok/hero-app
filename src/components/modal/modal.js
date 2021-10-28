import { useEffect } from "react";
import { createPortal } from "react-dom";
import classes from "./modal.module.css";

const Modal = ({ message, setIsOpen, isOpen }) => {
  const portalRoot = document.getElementById("modal");

  useEffect(() => {
    let timer;
    if (isOpen) {
      timer = setTimeout(() => {
        setIsOpen(false);
      }, 2000);
    }
    return function () {
      clearTimeout(timer);
    };
  }, [setIsOpen, isOpen, message]);

  const container = (
    <div
      className={classes.content}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div
        className="position-absolute top-0 end-0 me-2 mt-1 w-50 h-50 text-end"
        onClick={() => setIsOpen(false)}
      >
        &#10005;
      </div>
      {message}
      <div
        className="progress position-absolute bottom-0 start-0 w-100 rounded-0"
        style={{ height: "5px" }}
      >
        <div
          className={`progress-bar bg-dark ${classes.barWidth}`}
          role="progressbar"
          aria-valuenow="25"
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div>
    </div>
  );

  return createPortal(container, portalRoot);
};

export default Modal;
