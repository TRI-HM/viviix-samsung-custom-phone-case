import { useLocation, useNavigate } from "react-router-dom";
import { RoutersContext } from "../../context/RoutersContext";
import { useContext } from "react";

export const NextButton = () => {
 const {routes} = useContext(RoutersContext);
 const navigate = useNavigate();
 const location = useLocation();

 const currentPath = location.pathname;
 const currentIndexPage = routes.findIndex(item => item.path === currentPath);

 const handleNextPage = () => {
  if (currentIndexPage === -1) return;
  if (currentIndexPage < routes.length - 1) {
   setTimeout(() => {
    navigate(routes[currentIndexPage + 1].path);
   }, 50);
  }
 };

 return (
  <>
   <button
    className="next-button"
    type="button"
    onClick={handleNextPage}
   ></button>
  </>
 );
};
