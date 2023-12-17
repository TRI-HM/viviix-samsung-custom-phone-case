import { useNavigate } from "react-router-dom";
import { appendObjJson } from "../../utils/localStorage";

export const StartButton = () => {
 const navigate = useNavigate();
 const handleStartButton = () => {
  appendObjJson({ isStart: true });
  setTimeout(() => {
   navigate("/model");
  }, 50);
 };
 return (
  <button
   className="start-button"
   type="button"
   onClick={handleStartButton}
  ></button>
 );
};