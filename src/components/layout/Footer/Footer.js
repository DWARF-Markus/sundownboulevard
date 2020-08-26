import React from "react";
import logo from "../../../images/beach-blackwhite.svg";
import "./Footer.scss";

function Footer() {
  return (
    <footer className="black white-text">
      <div className="pt-2">
        <p className="footer-title mt-1">LINKS</p>
        <ul>
          <li>
            <a href="#!" className="footer-entry">
              BOOK
            </a>
          </li>
          <li>
            <a href="#!" className="footer-entry">
              NEWSLETTER
            </a>
          </li>
          <li>
            <a href="#!" className="footer-entry">
              PRODUCTS
            </a>
          </li>
          <li>
            <a href="#!" className="footer-entry">
              RESTUARANTS
            </a>
          </li>
        </ul>
      </div>
      <div className="footer-mid pt-2">
        <img className="mt-1" src={logo} alt="Sundown Boulevard logo" />
        <p className="logo-text white-text">SUNDOWN BOULEVARD</p>
        <div className="mt-1">
          <p>
            Bernhard Bangs Allé 25 <br /> Frederiksberg <br /> Denmark
          </p>
        </div>
      </div>
      <div className="pt-2">
        <p className="footer-title mt-1">POLICIES</p>
        <ul>
          <li>
            <a href="#!" className="footer-text">
              PRIVACY
            </a>
          </li>
          <li>
            <a href="#!" className="footer-text">
              COOKIES
            </a>
          </li>
          <li>
            <a href="#!" className="footer-text">
              CONTACT
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
