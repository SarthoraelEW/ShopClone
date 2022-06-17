import React from 'react';
import Header from '../components/Header';
import CollectionBannery from '../components/Home/CollectionBannery';

const Home = () => {
  return (
    <div className='homePage'>
      <Header page="HOME"/>
      <div className='homePageWrapper'>
        <div className='bannery'>
          <CollectionBannery bannery={`${process.env.REACT_APP_PUBLIC_URL}./img/season_bannery.png`} collection={"collections-ephemeres"} />
        </div>
        <div className='bannery'>
          <CollectionBannery bannery={`${process.env.REACT_APP_PUBLIC_URL}./img/fleur_bannery.png`} collection={"collection-fleurs"} />
        </div>
        <div className='bannery'>
          <CollectionBannery bannery={`${process.env.REACT_APP_PUBLIC_URL}./img/ombre_bannery.png`} collection={"collection-fleurs-de-lombre"} />
        </div>
      </div>
    </div>
  );
};

export default Home;