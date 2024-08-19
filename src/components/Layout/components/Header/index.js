// Import

import React from 'react'
import classNames from "classnames/bind";
import styles from './Header.module.scss'
import { Link } from 'react-router-dom';
import Glass from "~/assets/Glass.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import Avatar from "~/assets/Avatar.png"
import CartIcon from "~/assets/Icon.png"
import Dash from "~/assets/Icon2dash.png"

import {
  Drawer,
  Button,
  Typography,
  IconButton,
} from "@material-tailwind/react";
//Function + variable

const cx = classNames.bind(styles)


function Header() {
  const [open, Setopen] = useState(false);
  const [search, Setsearch] = useState(false);
  const [amount, Setamount] = useState(0);
  const [account, Setaccount] = useState("Alan")
  const bagIcon = document.getElementsByClassName(cx("shoppingWrapper"));
  const avatarIcon = document.getElementsByClassName(cx("avatarWrapper relative mx-12 my-9 flex"));
  const handlesearchClick = () => {
    if (search === false) {
      Setsearch(!search);
      console.log(bagIcon[0])
      console.log(avatarIcon[0])
      bagIcon[0].style.display = 'none';
      avatarIcon[0].style.display = "none";
    } else {
      Setsearch(!search);
      bagIcon[0].style.display = "block";
      avatarIcon[0].style.display = "block";
    }
  };
  //

  // Start
  return (
    <div className={cx("wrapper")}>
      <div className={cx("dashIconWrapper")}>
        <img src={Dash} className={cx("dashImg")} />
      </div>
      <div className={cx("navbarLink")}>
        <Link
          to="/confirm_order"
          className={cx("findoutLink hover:underline mx-5 my-11")}
        >
          Find Out More
        </Link>
        <Link to="/" className={cx("aboutLink hover:underline mx-5 my-11 ")}>
          About Us
        </Link>
        <Link to="/" className={cx("customLink hover:underline mx-5 my-11")}>
          Custom Jeans
        </Link>
      </div>

      <div className={cx("shopName")}>
        <h2 className={cx("text-blue-900")}>JeanCraft</h2>
      </div>

      <div className={cx("action")}>
        {/* Search Icon */}
        <div className={cx("searchWrapper")}>
          {search ? (
            <div className={cx("inputWrapper")}>
              <button className={cx("closeBtn")} onClick={handlesearchClick}>
                <FontAwesomeIcon icon={faCircleXmark} />
              </button>
              <input
                type="text"
                className={cx("inputSearch bg-blue-400 h-8 w-21 rounded my-9")}
              />
            </div>
          ) : (
            <button
              className={cx("search_btn")}
              onClick={handlesearchClick}
            >
              <img src={Glass} className={cx("iconSearch w-6 ")} />
            </button>
          )}

          {/* Shopping bag Icon */}
          <div className={cx("shoppingWrapper mx-5 my-10")}>
            <Link to="/following">
              <img src={CartIcon} className={cx("iconShopping relative")} />
              <p className={cx("shoppingAmount absolute top-0 my-8 mx-8 bg-orange-400 rounded-md w-3 text-center")}>{amount}</p>
            </Link>
          </div>

          <div className={cx("avatarWrapper relative mx-12 my-9 flex ")}>
            <Link to ="/signin">
              <img
                src={Avatar}
                className={cx("avatarIcon h-8 w-8 rounded-lg my-2 ")}
              />
            </Link>
            <p className={cx("avatarHi mx-5 my-3")}>Hi,{account}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header