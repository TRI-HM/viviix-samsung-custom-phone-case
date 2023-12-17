// import React, { useEffect } from "react";
// import "./styles.css";
// import { LogoImages } from "../../importImg/LogoImages";
// import { appendObjJson } from "../../utils/localStorage";

// const LogoPage = () => {
//   useEffect(() => {
//     const stickerCells = document.querySelectorAll(".sticker-cell");
//     let selectedSticker = null;

//     const getRandomColorSticker = (exclude) => {
//       const colors = [
//         "red",
//         "orange",
//         "yellow",
//         "green",
//         "blue",
//         "purple",
//         "pink",
//         "brown",
//         "black",
//         "gray",
//         "white",
//         "gold",
//       ];
//       const filteredColors = colors.filter((color) => color !== exclude);
//       return filteredColors[Math.floor(Math.random() * filteredColors.length)];
//     };

//     function handleClick() {
//       stickerCells.forEach((c) => {
//         if (c === this) {
//           c.style.opacity = 1;
//           selectedSticker = c.style.backgroundColor;
//           const borderColor = getRandomColorSticker(selectedSticker);
//           c.style.boxShadow = `inset 0 0 0 5px ${borderColor}`;
//         } else {
//           c.style.opacity = 0.3;
//           c.style.boxShadow = "none";
//         }
//       });
//     }

//     stickerCells.forEach((cell) => {
//       cell.addEventListener("click", handleClick);
//     });
//     return () => {
//       stickerCells.forEach((cell) => {
//         cell.removeEventListener("click", handleClick);
//       });
//     };
//   }, []);

//   const imgLogoHandler = (e) => {
//     appendObjJson({ logo: e.target.alt });
//   };

//   return (
//       <div className="sticker-container">
//         <img
//           onClick={imgLogoHandler}
//           className="sticker-cell"
//           src={LogoImages.Logo1}
//           alt="0"
//         />
//         <img
//           onClick={imgLogoHandler}
//           className="sticker-cell"
//           src={LogoImages.Logo2}
//           alt="1"
//         />
//         <img
//           onClick={imgLogoHandler}
//           className="sticker-cell"
//           src={LogoImages.Logo3}
//           alt="2"
//         />
//         <img
//           onClick={imgLogoHandler}
//           className="sticker-cell"
//           src={LogoImages.Logo4}
//           alt="3"
//         />
//         <img
//           onClick={imgLogoHandler}
//           className="sticker-cell"
//           src={LogoImages.Logo5}
//           alt="4"
//         />
//       </div>
//   );
// };

// export default LogoPage;
