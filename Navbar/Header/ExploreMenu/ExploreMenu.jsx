import React from 'react';
import './ExploreMenu.css';
import { menu_list } from '../../../../assets/assets';

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div className="explore-menu" id="explore-menu">
      <h1>Menu Voyage</h1>
      <p className="explore-menu-text">
        Dive into a world of flavors where every bite tells a story. Our menu is a carefully curated masterpiece, blending bold tastes, fresh ingredients, and irresistible aromas.
      </p>
      <div className="explore-menu-list">
        {menu_list.map((item, index) => {
          return (
            <div
              onClick={() => setCategory((prev) => (prev === item.menu_name ? "ALL" : item.menu_name))}
              key={index}
              className="explore-menu-list-item"
            >
              <img
                className={category === item.menu_name ? "active" : ""}
                src={item.menu_image}
                alt={item.menu_name}
              />
              <p>{item.menu_name}</p>
            </div>
          );
        })}
      </div>
      <hr />
    </div>
  );
};

export default ExploreMenu;