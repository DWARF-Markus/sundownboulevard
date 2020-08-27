import React from "react";
import "./ContentBox.scss";

function ContentBox() {
  return (
    <div className="content-box-container pt-3">
      <div className="col m-2">
        <p className="red-text small-text">1</p>
        <i className="fa fa-paper-plane red-text"> </i>
        <h4 className="mt-1">Book table</h4>
        <p>
          At eripuit signiferumque sea, vel ad mucius molestie, cu labitur
          iuvaret vulputate sed.
        </p>
      </div>
      <div className="col m-2">
        <p className="red-text small-text">2</p>
        <i className="fa fa-comment red-text"> </i>
        <h4 className="mt-1">Choose drinks and dish</h4>
        <p>
          At eripuit signiferumque sea, vel ad mucius molestie, cu labitur
          iuvaret vulputate sed.
        </p>
      </div>
      <div className="col m-2">
        <p className="red-text small-text">3</p>
        <i className="fa fa-heart red-text"> </i>
        <h4 className="mt-1">Enjoy!</h4>
        <p>
          At eripuit signiferumque sea, vel ad mucius molestie, cu labitur
          iuvaret vulputate sed.
        </p>
      </div>
    </div>
  );
}

export default ContentBox;
