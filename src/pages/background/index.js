import React, { useEffect } from "react";
import "./styles.css";
import { IconPatternImages } from "../../importImg/IconPatternImages";
import { appendObjJson } from "../../utils/localStorage";

const BackgroundPage = () => {
  useEffect(() => {
    const stickerCells = document.querySelectorAll(".background-cell");
    let selectedSticker = null;

    const getRandomColorSticker = (exclude) => {
      const colors = [
        "red",
        "orange",
        "yellow",
        "green",
        "blue",
        "purple",
        "pink",
        "brown",
        "black",
        "gray",
        "white",
        "gold",
      ];
      const filteredColors = colors.filter((color) => color !== exclude);
      return filteredColors[Math.floor(Math.random() * filteredColors.length)];
    };

    function handleClick() {
      stickerCells.forEach((c) => {
        if (c === this) {
          c.style.opacity = 1;
          selectedSticker = c.style.backgroundColor;
          const borderColor = getRandomColorSticker(selectedSticker);
          c.style.boxShadow = `inset 0 0 0 5px ${borderColor}`;
        } else {
          c.style.opacity = 0.3;
          c.style.boxShadow = "none";
        }
      });
    }

    stickerCells.forEach((cell) => {
      cell.addEventListener("click", handleClick);
    });
    return () => {
      stickerCells.forEach((cell) => {
        cell.removeEventListener("click", handleClick);
      });
    };
  }, []);

  const imgBGHandler = (e) => {
    console.log(e.target.alt);
    appendObjJson({ background: e.target.alt });
  };

  console.log(IconPatternImages);

  return (
    <div className="color-container">

      {Array.from({ length: Object.keys(IconPatternImages).filter(key => key.startsWith('old/')).length }, (_, i) => i + 1).map((num) => (
        // eslint-disable-next-line jsx-a11y/alt-text
        <img
          onClick={imgBGHandler}
          className="background-cell"
          src={IconPatternImages[`old/icon (${num}).webp`].url}
          alt={`old/icon (${num}).webp`}
        />
      ))}

      {Array.from({ length: Object.keys(IconPatternImages).filter(key => key.startsWith('new/da')).length }, (_, i) => i + 1).map((num) => (
        // eslint-disable-next-line jsx-a11y/alt-text
        <img
          onClick={imgBGHandler}
          className="background-cell"
          src={IconPatternImages[`new/da/icon (${num}).webp`].url}
          alt={`new/da/icon (${num}).webp`}
        />
      ))}

      {Array.from({ length: Object.keys(IconPatternImages).filter(key => key.startsWith('new/go')).length }, (_, i) => i + 1).map((num) => (
        // eslint-disable-next-line jsx-a11y/alt-text
        <img
          onClick={imgBGHandler}
          className="background-cell"
          src={IconPatternImages[`new/go/icon (${num}).webp`].url}
          alt={`new/go/icon (${num}).webp`}
        />
      ))}

      {Array.from({ length: Object.keys(IconPatternImages).filter(key => key.startsWith('new/kimLoai')).length }, (_, i) => i + 1).map((num) => (
        // eslint-disable-next-line jsx-a11y/alt-text
        <img
          onClick={imgBGHandler}
          className="background-cell"
          src={IconPatternImages[`new/kimLoai/icon (${num}).webp`].url}
          alt={`new/kimLoai/icon (${num}).webp`}
        />
      ))}
    </div>
  );
};

export default BackgroundPage;
