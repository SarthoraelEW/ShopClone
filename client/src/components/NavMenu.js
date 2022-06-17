import React from 'react';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import ProductCard from './Product/ProductCard';
import { isEmpty } from './Utils';

const NavMenu = ({type}) => {
  const navigate = useNavigate();

  const menuItems = type === "TOUS LES PRODUITS" ? ["Tout", "Tee-Shirts", "Hoodies & Crewnecks", "Joggings", "Accessoires", "Objets"] :
    ["Tout", "Collection Fleur", "Collection Fleur de l'ombre", "Collections saisonnières"];

  const productsReducer = useSelector((state) => state.productsReducer);
  const products = productsReducer.slice(0, 4);

  const handleNavigation = (item) => {
    switch(item) {
      case "Tout":
        navigate("/collections/tous-les-produits");
        break;
      case "Tee-Shirts":
        navigate("/collections/tee-shirts");
        break;
      case "Hoodies & Crewnecks":
        navigate("/collections/hoodies-crewneck");
        break;
      case "Joggings":
        navigate("/collections/joggings");
        break;
      case "Accessoires":
        navigate("/collections/accessoires-textiles");
        break;
      case "Objets":
        navigate("/collections/objets");
        break;
      case "Collection Fleur":
        navigate("/collections/collection-fleurs");
        break;
      case "Collection Fleur de l'ombre":
        navigate("/collections/collections-fleurs-de-lombre");
        break;
      case "Collections saisonnières":
        navigate("/collections/collections-ephemeres");
        break;
      default:
        break;
    }
  };

  return (
    <div className="navMenu">
      <ul className="grid">
        <div className='sideMenu'>
        <h5>{type}</h5>
          {!isEmpty(menuItems) && menuItems.map((item) => {
            return <li className='menuItem' key={item} onClick={() => handleNavigation(item)}><span>{item}</span></li>;
          })}
        </div>
        {!isEmpty(products) && products.map((product) => {
          return ( 
            <div className='productCardContainer' key={product._id}>
              <ProductCard product={product} />
            </div>
          )
        })}
      </ul>
    </div>
  );
};

export default NavMenu;