import { Link } from "react-router-dom";
import "./footer.scss";
import { GiBookAura } from "react-icons/gi";
import { AiOutlineHome, AiOutlineMail, AiOutlinePhone } from "react-icons/ai";

const Footer = () => {
  return (
    <footer className="bg__accent text__color">
      <div className="top">
        <div className="box1">
          <div className="logo text__primary">
            <GiBookAura className="icon" />
            <h4>Resource Hub!!</h4>
          </div>
          <p style={{ marginTop: "8px", lineHeight: "1.5xrem" }}>
            Gateway to knowledge, discovery, and lifelong learning for all ECE
            students, faculty, and staff.: <br />A welcoming and inclusive space for
            all learners to come together and learn.
          </p>
        </div>
        <div className="box2">
          <h4>USEFULL LINKS</h4>
          <Link to="/" className="text__color">
            Home
          </Link>
          <Link to="/about-us" className="text__color">
            About Us
          </Link>
          <Link to="/contact-us" className="text__color">
            Contact Us
          </Link>
          {/* <Link to="/login" className="text__color">
            Login
          </Link> */}
        </div>

        <div className="box3">
          <h4>OTHER USEFULL LINKS</h4>
          {/* <Link to="/" className="text__color">
            Books
          </Link> */}
          <Link to="/ebooks" className="text__color">
            Materials
          </Link>
          <Link to="/contact-us" className="text__color">
            Dashboard
          </Link>
          {/* <Link to="/login" className="text__color">
            Forget Password
          </Link> */}
        </div>

        <div className="box4">
          <h4>CONTACT</h4>
          <div className="item">
            <AiOutlineHome className="icon__home" />
            <span>SRKR Engineering College, Bhimavaram</span>
          </div>
          <div className="item">
            <AiOutlineMail className="icon" />
            <span>sriramgandrothu@gmail.com</span>
          </div>
          <div className="item">
            <AiOutlinePhone className="icon" />
            <span>7842713943</span>
          </div>
        </div>
      </div>
      <div className="bottom">
        <span>
          &copy;2024 Copyright : Department of ECE, SRKREC.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
