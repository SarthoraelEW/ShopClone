import React from 'react';
import { useSelector } from 'react-redux';
import HorizontalSlider from '../HorizontalSlider';

const CollectionBannery = ({bannery, collection}) => {

  const productsReducer = useSelector((state) => state.productsReducer);
  const products = productsReducer.filter(product => product.collections.includes(collection));

  return (
    <div className='collectionBannery'>
      <div className='banneryContainer'>
        <img src={bannery} alt="collection bannery" />
      </div>
      <div className='sliderContainer'>
        <HorizontalSlider products={products} />
      </div>
    </div>
  );
};

export default CollectionBannery;