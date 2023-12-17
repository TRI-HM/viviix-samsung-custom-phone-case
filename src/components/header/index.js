import "./styles.css"
import logoSamsum from "../../asset/img/logo/logo-samsum.webp"
export const Header = ({titleUrl}) => {
 return (
  <div className="header">
   <img id="header-logo-samsum" src={logoSamsum} alt="" />
   <img src={titleUrl} alt="" />
  </div>
 )
}