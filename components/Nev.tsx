import React from "react";
import style from './styles/Nav.module.css'

const Nev = () => {
  return (
    <nav className={style.navbar}>
      <div className={style.navitem}>
        <ul>
          <li>
            <a href="/">My Products</a>
          </li>
          <li>
            <a href="#">Add Product</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};
export default Nev;
