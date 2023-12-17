import React from "react";
import "./styles.css";
import model from "../../asset/img/model/model_show.webp";

import texture from "../../asset/img/model/texture/hinh-nen-may-tinh-4k-game-lien-quan3-min.jpg";
import { getObjJson } from "utils/localStorage";
import maskSamsum from "../../asset/img/model/ss_mask.webp";

const ResultPage = () => {
  const storedData = getObjJson();
  const textureModel = storedData?.texture;

  return (
    <div id="container-result">
      <div className="custom">
        <div id="mask">
          <img className="disable-opacity" src={maskSamsum} alt="" />
        </div>
        <div id="container-wrapper">
          <img id="imgTexture" src={textureModel} alt="" />
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
