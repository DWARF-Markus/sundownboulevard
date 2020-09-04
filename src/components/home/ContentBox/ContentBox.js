import React from "react";
import "./ContentBox.scss";

function ContentBox() {
  return (
    <div className="content-box-container pt-3">
      <div className="col m-2">
        <i className="fa fa-paper-plane red-text"> </i>
        <h4 className="mt-1">Book table</h4>
        <p>
          Have a lovely dining experience at our beautiful location in
          Copenhagen.
        </p>
      </div>
      <div className="col m-2">
        <i className="fa fa-comment red-text"> </i>
        <h4 className="mt-1">Choose drinks and dish</h4>
        <p>
          We have probably the largest menu on the planet. Choose a random dish
          from our massive menu and one of our freshly brewed beers.
        </p>
      </div>
      <div className="col m-2">
        <i className="fa fa-heart red-text"> </i>
        <h4 className="mt-1">Enjoy!</h4>
        <p>
          Finally, enjoy a very nice time at Sundown Boulevard! We look forward
          to welcoming you!
        </p>
      </div>
    </div>
  );
}

export default ContentBox;
