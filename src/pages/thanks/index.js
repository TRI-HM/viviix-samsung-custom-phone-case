import React from "react";
import imgThanks from "../../asset/img/text/thankyou.png";
import "./styles.css"
import { appendObjJson } from "utils/localStorage";


const ThanksPage = () => {
    appendObjJson({ "isThanks" : true });
 return (
  <img id="thanks" src={imgThanks} alt="Thank you" />
 );
}

export default ThanksPage;