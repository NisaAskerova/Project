import React from "react";
import NewAddress from "./NewAddress";
import { Link } from "react-router-dom";

const Address = () => {
  return (
    <div id="addressHero">
      <h2>Təslim ünvanını seçin</h2>
      <p className="same sm">
        Aşağıda göstərilən ünvanı istifadə etmək istəyirsinizmi? Əgər belədirsə, müvafiq "Bu ünvana təslim et" düyməsini sıxın. Yoxsa yeni bir təslim ünvanı daxil edə bilərsiniz.
      </p>
      <div id="addressCards">
        <div className="addressCart">
          <div className="check">
            <h4>Kristin Watson</h4>
            <input type="radio" name="check1" id="check1" />
          </div>
          <div className="addInfo">
            <span className="same">
              4140 Parker Rd. Allentown, New Mexico 31134
            </span>
          </div>
          <div className="addressButtons">
            <button>
              <img src="/edit.svg" alt="" />
              <span>Dəyişdir</span>
            </button>
            <button>
              <img src="/delete.svg" alt="" />
              <span>Silmək</span>
            </button>
          </div>
        </div>
        <div className="addressCart">
          <div className="check">
            <h4>Kristin Watson</h4>
            <input type="radio" name="check1" id="check2" />
          </div>
          <div className="addInfo">
            <span className="same">
              4140 Parker Rd. Allentown, New Mexico 31134
            </span>
          </div>
          <div className="addressButtons">
            <button>
              <img src="/edit.svg" alt="" />
              <span>Dəyişdir</span>
            </button>
            <button>
              <img src="/delete.svg" alt="" />
              <span>Silmək</span>
            </button>
          </div>
        </div>
      </div>
      <Link to="/shoppingAddress/payment" className="same deliverBtn">
        Buraya Təslim Et
      </Link>
      <NewAddress />
    </div>
  );
};

export default Address;
