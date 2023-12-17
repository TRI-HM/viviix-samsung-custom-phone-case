import { useCallback } from "react";
import { sendJsonRequest } from "../../services/RequestJsonFromClient";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const ResultButton = () => {
 const navigate = useNavigate();
 const [enable, setEnable] = useState(true);

 const handleSendButton = useCallback(async () => {
   console.log("click send button");

   if (!enable) return;

   setEnable(false);
   const storedData = JSON.parse(localStorage.getItem("objJson"));

   await sendJsonRequest(storedData);
   setTimeout(() => {
     navigate("/thanks");
   }, 50);
   
 }, [enable, navigate]);


 return (
   <button
     className="send-button"
     type="button"
     onClick={handleSendButton}
     disabled={!enable}
   ></button>
 );
};