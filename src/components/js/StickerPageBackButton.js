import { useNavigate } from "react-router-dom";

export const StickerPageBackButton = () => {
 const navigate = useNavigate();
 const handlePreviousPage = () => {
  setTimeout(() => {
   navigate("/background");
  }, 50);
 };

 return (
  <button
   id="PreviousPage"
   type="button"
   className="previous-button"
   onClick={handlePreviousPage}
  ></button>
 );
};