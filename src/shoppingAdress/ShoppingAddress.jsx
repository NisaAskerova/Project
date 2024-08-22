import React, { useContext, useEffect, useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import CheckoutCard from "../checkout/CheckoutCard";
import { MyContext } from "../App";

const ShoppingAddressPage = () => {
  const { pathname } = useLocation();
  const [activeStep, setActiveStep] = useState("address");
  const { setOrderCart } = useContext(MyContext);

  useEffect(() => {
    if (pathname === "/shoppingAddress/address") {
      setActiveStep("address");
    } else if (pathname === "/shoppingAddress/payment") {
      setActiveStep("payment");
    } else if (pathname === "/shoppingAddress/reviews") {
      setActiveStep("reviews");
    }
  }, [pathname]);

  const handlePlaceOrder = () => {
    if (activeStep === "reviews") {
      console.log("Place Order button clicked");
      setOrderCart(true);  
    }
  };

  return (
    <div id="shopAddress">
      <h2 className="thick">Shopping Cart</h2>
      <div className="address">
        <div id="addressHero">
          <div className="right-page">
            <Link
              to="address"
              className={`step ${activeStep === "address" ? "active" : ""}`}
              onClick={() => setActiveStep("address")}
            >
              <div>
                <div className="shopIcon">
                  <img src="/home3.svg" alt="" />
                </div>
                <span className="same">Address</span>
              </div>
            </Link>
            <Link
              to="payment"
              className={`step ${activeStep === "payment" ? "active" : ""}`}
              onClick={() => setActiveStep("payment")}
            >
              <div className="stp">
                <div className="steps">
                  <div className="line"></div>
                  <div className="shopIcon">
                    <img src="/ecommers2.svg" alt="" />
                  </div>
                </div>
                <span className="same">Payment Method</span>
              </div>
            </Link>
            <Link
              to="reviews"
              className={`step ${activeStep === "reviews" ? "active" : ""}`}
              onClick={() => setActiveStep("reviews")}
            >
              <div className="stp">
                <div className="steps">
                  <div className="line2"></div>
                  <div className="shopIcon">
                    <img src="/editor.svg" alt="" />
                  </div>
                </div>
                <span className="same">Review</span>
              </div>
            </Link>
          </div>
          <div className="step-content">
            <Outlet />
          </div>
        </div>
        <div>
          <CheckoutCard
            showButton={activeStep === "reviews"}
            buttonLabel={activeStep === "reviews" ? "Place Order" : ""}
            onClick={handlePlaceOrder}
          />
        </div>
      </div>
    </div>
  );
};

export default ShoppingAddressPage;
