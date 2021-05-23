import React from "react";

export const Modal = ({ modalState, setModalState }) => {
  return (
    <div className={modalState.class}>
      <div className="modal-background"></div>
      <div className="modal-content">
        <p className="image is-4by3">
          <img src={modalState.url} alt={modalState.alt} />
        </p>
        <h1 className="has-text-white has-background-grey-dark is-uppercase mt-1 p-2 is-inline-block">
          {modalState.alt}
        </h1>
      </div>
      <button
        className="modal-close is-large"
        aria-label="close"
        onClick={() => {
          setModalState({ ...modalState, class: "modal" });
        }}
      ></button>
    </div>
  );
};
