import "./styles.css";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { StartButton } from "../js/StartButton";
import { NextButton } from "../js/NextButton";
import { PreviousButton } from "../js/PreviousButton";
import { ResultButton } from "../js/ResultButton";
import { StickerPageBackButton } from "../js/StickerPageBackButton";
import { StickerPageNextButton } from "../js/StickerPageNextButton";
import { useCapture } from "../../hooks/useCapture";

const ForceNextButton = ({ nextPage }) => {
  const navigate = useNavigate();
  const handleNextPage = () => {
    setTimeout(() => {
      navigate(nextPage);
    }, 50);
  };

  return (
    <button
      className="next-button"
      type="button"
      onClick={handleNextPage}
    ></button>
  );
};

//#region forward
// const ForwardBGButton = () => {
//   const navigate = useNavigate();
//   const handleBGButton = () => {
//     setTimeout(() => {
//       navigate("/background?next=result");
//     }, 50);
//   };
//   return (
//     <button
//       className="forward forward-BG-button"
//       type="button"
//       onClick={handleBGButton}
//     ></button>
//   );
// };

const ForwardLogoButton = () => {
  const navigate = useNavigate();
  const handleBGButton = () => {
    setTimeout(() => {
      navigate("/background");
    }, 50);
  };
  return (
    <button
      className="forward-logo-button"
      type="button"
      onClick={handleBGButton}
    ></button>
  );
};

//#endregion



const NavigationButton = ({ currentPage }) => {
  const location = useLocation();
  const [params] = useSearchParams();
  const { onCapture } = useCapture();

  const [forceNextPage, setForceNextPage] = useState();

  const buttonMap = new Map([
    ['/', <StartButton />],
    ['/sticker',
      <>
        <StickerPageBackButton />
        <StickerPageNextButton onCapture={onCapture} />
      </>
    ],
    ['/result',
      <>
        <ForwardLogoButton />
        <ResultButton />
      </>
    ],
    ['/thanks',
      <>
      </>
    ],
  ]);

  useEffect(() => {
    let nextPage = params.get("next");
    if (!nextPage) return;
    setTimeout(() => {
      setForceNextPage(`/${nextPage}`);
    }, 50);
  }, [params]);

  return (
    //kiem tra
    buttonMap.has(location.pathname)
      ? buttonMap.get(location.pathname)
      :
      <>
        <PreviousButton currentPage={currentPage} />
        {forceNextPage ? (
          <ForceNextButton nextPage={forceNextPage} />
        ) : (
          <NextButton />
        )}
      </>
  )
};

export default NavigationButton;
