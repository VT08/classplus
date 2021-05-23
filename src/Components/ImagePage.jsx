import React from "react";
import { Image } from "../Components/Image.jsx";

export const ImagePage = ({
  setModalState,
  imageList,
  loading,
  error,
  lastElementRef,
}) => {
  return (
    <div className="container is-fullhd pt-4 mt-6">
      {imageList.map((element, key) => {
        if (key === imageList.length - 1) {
          return (
            <Image
              src={element.url}
              alt={element.alt}
              lastElementRef={lastElementRef}
              setModalState={setModalState}
              key={key}
            />
          );
        }
        return (
          <Image
            src={element.url}
            alt={element.alt}
            setModalState={setModalState}
            key={key}
          />
        );
      })}
      <div>{loading && "Loading..."}</div>
      <div>{error && "Error"}</div>
    </div>
  );
};
