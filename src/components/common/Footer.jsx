/* eslint-disable jsx-a11y/anchor-is-valid */

import { BiBuildingHouse } from "react-icons/bi";
import { FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { FiFacebook } from "react-icons/fi";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="text-white">
      <footer>
        <div className="flex flex-row gap-1 max-w-7xl mx-auto px-4 py-2">
          <div className="flex-1 basis-[10rem]">
            <Link to="/" className="flex-shrink-0 flex-align-center gap-x-1">
              <BiBuildingHouse className="text-3xl text-primary" />
              <h1 className="hidden md:block">Planyourhome</h1>
            </Link>
            <div className="mt-2">
              <p className="text-sm">
                Turning your vision into reality — because we work for your dream.
              </p>
              <div className="gap-3 my-2 flex-center-center">
                <div className="icon-box bg-dark-light hover:bg-hover-color-dark">
                  <FiFacebook />
                </div>
                <div className="icon-box bg-dark-light hover:bg-hover-color-dark">
                  <FaTwitter />
                </div>
                <div className="icon-box bg-dark-light hover:bg-hover-color-dark">
                  <FaInstagram />
                </div>
                <div className="icon-box bg-dark-light hover:bg-hover-color-dark">
                  <FaLinkedin />
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 basis-[10rem]">
            <h2 className="text-xl font-semibold mb-1">Quick Links</h2>
            <ul>
              <li className="my-1 text-muted">
                <a href="#">About Us</a>
              </li>
              <li className="my-1 text-muted">
                <a href="#">Services</a>
              </li>
              <li className="my-1 text-muted">
                <a href="#">Blog</a>
              </li>
              <li className="my-1 text-muted">
                <a href="#">Portfolio</a>
              </li>
            </ul>
          </div>

          <div className="flex-1 basis-[10rem]">
            <h2 className="text-xl font-semibold mb-1">Business</h2>
            <ul>
              <li className="my-1 text-muted">
                <a href="#">Success</a>
              </li>
              <li className="my-1 text-muted">
                <a href="#">Guide</a>
              </li>
              <li className="my-1 text-muted">
                <a href="#">Mission</a>
              </li>
              <li className="my-1 text-muted">
                <a href="#">Terms & Conditions</a>
              </li>
              <li className="my-1 text-muted">
                <a href="#">Privacy Policy</a>
              </li>
            </ul>
          </div>
        </div>
      </footer>

      <div className="py-1 mt-1 text-center border-t text-muted border-dark">
        <p>
          Created By <span className="text-primary">incampu.org</span> | All Rights Reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
