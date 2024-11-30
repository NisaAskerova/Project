import React, { useContext, useEffect, useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import CheckoutCard from "../checkout/CheckoutCard";
import { MyContext } from "../App";
import axios from "axios";

const ShoppingAddress = () => {
  const { pathname } = useLocation();
  const [activeStep, setActiveStep] = useState("address");
  const { setOrderCart } = useContext(MyContext);
  const [checkoutCart, setCheckoutCart] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [message, setMessage] = useState("");

  // Səbət məlumatlarını gətir
  useEffect(() => {
    const fetchCartData = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("Token yoxdur!");
        return;
      }

      try {
        const response = await axios.get("http://127.0.0.1:8000/api/basket/index", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          if (response.data && Array.isArray(response.data.products)) {
            setCheckoutCart(response.data.products);
          } else {
            console.error("Cavabın formatı gözlənilən şəkildə deyil:", response.data);
          }
        } else {
          console.error("Sorğu səhv baş verdi", response.status);
        }
      } catch (error) {
        console.error("Sorğu zamanı səhv baş verdi:", error);
      }
    };
    fetchCartData();
  }, []);

  // URL-ə əsasən aktiv addımı yenilə
  useEffect(() => {
    if (pathname === "/shoppingAddress/address") {
      setActiveStep("address");
    } else if (pathname === "/shoppingAddress/payment") {
      setActiveStep("payment");
    } else if (pathname === "/shoppingAddress/reviews") {
      setActiveStep("reviews");
    }
  }, [pathname]);

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
                  <img src="/home3.svg" alt="Address Icon" />
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
                    <img src="/ecommers2.svg" alt="Payment Icon" />
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
                    <img src="/editor.svg" alt="Review Icon" />
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

        <CheckoutCard
          checkoutCart={checkoutCart}
          showButton={activeStep === "reviews"}
          buttonLabel="Proceed to Checkout"
          isReviewPage={activeStep === "reviews"}
        />


        {message && (
          <div className={`message ${orderPlaced ? "success" : "error"}`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingAddress;
