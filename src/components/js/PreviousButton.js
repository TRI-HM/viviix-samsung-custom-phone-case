import { useLocation, useNavigate } from "react-router-dom";
import { RoutersContext } from "../../context/RoutersContext";
import { useContext } from "react";

export const PreviousButton = () => {
  const { routes } = useContext(RoutersContext);
 const navigate = useNavigate();
 const location = useLocation();

 const currentPath = location.pathname;
 const currentIndexPage = routes.findIndex(item => item.path === currentPath);

 const handlePreviousPage = () => {
  if (currentIndexPage === -1) return;
  if (currentIndexPage > 0) {
   setTimeout(() => {
    navigate(routes[currentIndexPage - 1].path);
   }, 50);
  }
 };

 return (
   <button
     className="previous-button"
     type="button"
     onClick={handlePreviousPage}
   ></button>
 );
};
