export const StickerPageNextButton = ({ onCapture }) => {
 // const navigate = useNavigate();
 const handleNextPage = () => {
   setTimeout(() => {
     if (onCapture) {
       onCapture();
     }
   }, 50);
 };

 return <button id="NextPage" type="button" className="next-button" onClick={handleNextPage}></button>;
};