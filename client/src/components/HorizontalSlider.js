import React from 'react';
import ProductCard from './Product/ProductCard';
import { isEmpty } from './Utils';

const HorizontalSlider = ({products}) => {
  return (
    <div className='horizontalSlider'>
      {products.length > 4 &&
        <button>
          <span class="material-icons-outlined">arrow_back</span>
        </button>
      }
      <ul className='products'>
        {!isEmpty(products) && products.map(product => {
          return (
            <li className='productContainer'>
              <ProductCard product={product} />
            </li>
          )
        })}
      </ul>
      {products.length > 4 &&
        <button>
          <span class="material-icons-outlined">arrow_forward</span>
        </button>
      }
    </div>
  );
};

export default HorizontalSlider;