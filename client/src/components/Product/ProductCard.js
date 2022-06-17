import React from 'react';
import { useNavigate } from 'react-router-dom';
import { isEmpty } from '../Utils';

const ProductCard = ({product}) => {
  const navigate = useNavigate();

  return (
    <div className='productCardContainer' onClick={() => {navigate(`./product/${product._id}`)}}>
      {!isEmpty(product) &&
        <div className='productCard'>
          <img src={`${process.env.REACT_APP_PUBLIC_URL}${product.photos[0]}`} alt="product" />
          <div className='productTitle'>{product.title}</div>
          <div className='productPrice'>{product.price}</div>
        </div>
      }
    </div>
  );
};

export default ProductCard;