import React from "react";

export const Image = ({ src, alt, setModalState, lastElementRef }) => {
  if (lastElementRef) {
    return (
      <img
        className="p-3"
        id="last"
        src={src}
        alt={alt}
        ref={lastElementRef}
        onClick={() => {
          setModalState({
            class: "modal is-active",
            url: src,
            alt: alt,
          });
        }}
      />
    );
  }
  return (
    <img
      className="p-3"
      src={src}
      alt={alt}
      onClick={() => {
        setModalState({
          class: "modal is-active",
          url: src,
          alt: alt,
        });
      }}
    />
  );
};
