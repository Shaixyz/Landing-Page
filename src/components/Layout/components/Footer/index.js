import React from 'react'
import classNames from "classnames/bind";
import styles from "./Footer.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import insta from "~/assets/instagram.svg";
import facebook from "~/assets/facebook.svg";
import twitter from "~/assets/twitter.svg";
import pinterest from "~/assets/pinterest.svg";
import tiktok from "~/assets/tiktok.svg";

const cx = classNames.bind(styles);

function Footer() {
  return (
    <div className={cx("wrapper flex border mt-48")}>
      <div className="emailInput">
        <p className={cx("mx-8 my-3 font-bold text-nowrap")}>
          Subscribe to our newsletter to get updates
        </p>
        {/* Input Email */}
        <div className={cx("content relative z-10  ")}>
          <input
            id="floating_outline"
            type="text"
            className={cx(
              "floatInput block py-2.5 mx-8 px-0 w-80 text-sm text-blue-500 bg-transparent border-0 border-b-2 border-gray-400 appearance-none focus:border-gray-400 focus:outline-none focus:ring-0 peer"
            )}
            placeholder="Email Address"
          />
          <button
            className={cx("absolute   top-0 my-4 mx-80 ")}
            onClick={console.log("hi")}
          >
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
          {/* <label for="floating_outline" className="absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus: start-0 peer-focus:text-blue-500 peer-placeholder-shown:scale-100  peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl: peer-focus: translate-x-1/4 rtl:peer-focus: left-auto">Floating label</label> */}
        </div>
        {/* Social media */}
        <div className={cx("socialmediaWrapper flex")}>
          <img src={insta} className={cx("instaIcon ml-8  mr-2   mt-24 ")} />
          <img src={facebook} className={cx("facebookIcon mr-2  mt-24")} />
          <img src={twitter} className={cx("twitterIcon mr-2 mt-24")} />
          <img src={pinterest} className={cx("pinterestIcon mr-2 mt-24")} />
          <img src={tiktok} className={cx("tiktokIcon mr-2 mt-24")} />
        </div>
        <p className={cx("text-black mt-5 ml-8 pb-4")}>Copyright 2024 JeanCraft</p>
      </div>
      {/* End of email input column */}
      <div className={cx("serviceWrapper ml-52")}>
        <p className={cx("ml-11 my-3 font-bold")}>Service</p>
        <p className={cx("ml-11 mb-3 text-nowrap")}>Terms and Conditions</p>
        <p className={cx("ml-11 mb-3")}>Privacy Policy</p>
      </div>

      {/* End of Service */}

      <div className={cx("shopWrapper ml-30")}>
        <p className={cx("ml-28 my-3 font-bold")}>Shop</p>
        <p className={cx("ml-28 mb-3")}>About Us</p>
        <p className={cx("ml-28 mb-3")}>How it works</p>
        <p className={cx("ml-28 mb-3 text-nowrap")}>Perfect Fit Guarantee</p>
      </div>

      {/* End of Shop */}

      <div className={cx("supportWrapper ml-30")}>
        <p className={cx("mx-40 my-3 font-bold")}>Support</p>
        <p className={cx("mx-40 mb-3")}>Contact us</p>
        <p className={cx("mx-40 mb-3 text-nowrap")}>Order fabric samples</p>
        <p className={cx("mx-40 mb-3")}>Track order</p>
        <p className={cx("mx-40 mb-3")}>FAQs</p>
      </div>
      {/* End of Support */}
    </div>
  );
}

export default Footer