import React, { useState, useContext, useEffect, useRef } from "react";
import UserContext from "../context/UserContext";
import "../style/cartPop.css";
import { Link } from "react-router-dom";
import Boom from "../assets/boomAnim/boom.gif";

function CartPop() {
  const [proCart, setProCart] = useState([]);
  const { cartPro } = useContext(UserContext);
  const [startAnim, setStartAnim] = useState(false);
  const [removingPid, setRemovingPid] = useState(null);
  const [sliceRange, setSliceRange] = useState([0, 3]);
  const [containerWidth, setContainerWidth] = useState(40);
  const [removalMessage, setRemovalMessage] = useState(false);

  const prevCartRef = useRef();
  useEffect(() => {
    if (removalMessage) {
      setTimeout(() => {
        setRemovalMessage(false);
      }, 1000);
    }
  }, [removalMessage]);
  useEffect(() => {
    const previousCart = prevCartRef.current || [];
    const newCart = cartPro;

    if (previousCart > newCart) {
      setRemovalMessage(true);
    }

    setProCart(newCart);

    if (newCart.length === 1) {
      setStartAnim(true);
    }

    setContainerWidth(calculateWidth(newCart.length));

    if (newCart.length === 0 && startAnim) {
      setStartAnim(false);
    }

    prevCartRef.current = newCart;
  }, [cartPro]);

 

  const calculateWidth = (cartLength) => {
    switch (cartLength) {
      case 1:
        return 40;
      case 2:
        return 60;
      case 3:
        return 80;
      default:
        return 80; // Adjust this default value if needed
    }
  };

  return (
    <div className={`cartPopSec ${startAnim ? "startAnim" : ""}`}>
      <div
        className={`removalMessage ${
          removalMessage ? "RemoveMessageActive" : ""
        }`}
      >
        <img src={Boom} />
      </div>
      <div className="cartSecImg" style={{ minWidth: `${containerWidth}px` }}>
      {proCart.slice(-3).map((item, index) => (
          <div
            className={`cartImgSec cartImgSec${index + 1} ${
              removingPid === item.pid ? "scale-down" : ""
            }`}
            key={item.pid}
          >
            <img src={item.img} alt={`Cart item ${index}`} />
          </div>
        ))}
      </div>
      <div className="cartPopDetail">
        <p>View cart</p>
        <h5>
          {proCart.length} item{proCart.length > 1 ? "s" : ""}
        </h5>
      </div>
      <Link className="viewBtn" to="/cart">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-chevron-right"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      </Link>
    </div>
  );
}

export default CartPop;
