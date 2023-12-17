import React from "react";
import { useLocation } from "react-router-dom";
import NavigationButton from "../components/buttonNavigation/ButtonNavigation";
//link
import "./styles.css"
import { Header } from "@components/header";
import { LogoSamSum } from "@components/logo";


const Layout = ({ children, title }) => {
    const location = useLocation();
    return (
        <>
            <div id="img-background">

            </div>
            <div className="display">
                <Header titleUrl={title} />
                {/* <LogoSamSum/> */}
                <div className="layout-container">
                    {children}
                </div>
                <div className="navigation-Button">
                    <NavigationButton currentPage={location.pathname} />
                </div>
            </div>
        </>
    );
};

export default Layout;