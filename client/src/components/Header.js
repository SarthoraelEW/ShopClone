import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import NavMenu from './NavMenu';

const Header = ({page}) => {
  const navigate = useNavigate();

  const [navHidden, setNavHidden] = useState(true);
  const [navType, setNavType] = useState("");
  
  const handleNavigation = (destination) => {
    setNavHidden(true);
    if (page === destination) return;
    switch (destination) {
      case "HOME":
        navigate("/");
        break;
      case "CONTACT":
        navigate("./contact");
        break;
      default:
        break;
    }
  };

  const handleNavMenu = (type) => {
    if (navHidden) {
      setNavHidden(false);
      setNavType(type);
    } else {
      if (type === navType) {
        navigate("./collections/tous-les-produits");
      } else {
        setNavType(type);
      }
    }
  };

  return (
    <header className='header-container'>
      <video autoPlay={true} loop={true} src={`${process.env.REACT_APP_PUBLIC_URL}./img/headervideo.webm`} />
      <div className='header'>
        <div className='logo'>
          <img src={`${process.env.REACT_APP_PUBLIC_URL}./img/logo.jpg`} alt="logo" />
        </div>
        <ul className='menu'>
          <li className={page === "HOME" ? "active" : ""} onClick={() => handleNavigation("HOME")}>ACCUEIL</li>
          <li onClick={() => handleNavMenu("TOUS LES PRODUITS")}>
            TOUS LES PRODUITS <span className="material-icons-outlined">expand_more</span>
          </li>
          <li onClick={() => handleNavMenu("COLLECTIONS")}>
            COLLECTIONS <span className="material-icons-outlined">expand_more</span>
          </li>
          <li className={page === "CONTACT" ? "active" : ""} onClick={() => handleNavigation("CONTACT")}>CONTACT</li>
          <li>PONCE.TV</li>
        </ul> 
        <div className='cart-logo'>
          <span className="material-icons-outlined">shopping_cart</span>
        </div>
        <div className={navHidden ? "navMenuContainer" : "navMenuContainer navDisplay"}>
          <NavMenu hidden={navHidden} type={navType} />
        </div>
      </div>
    </header>
  );
};

export default Header;