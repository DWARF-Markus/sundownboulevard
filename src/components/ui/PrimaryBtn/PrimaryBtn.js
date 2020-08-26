import React from "react";
import { Link } from "react-router-dom";
import "./PrimaryBtn.scss";

function PrimaryBtn({ title, navigateTo }) {
  return (
    <Link to={navigateTo}>
      <button type="submit" className="primary-btn">
        {title}
      </button>
    </Link>
  );
}

export default PrimaryBtn;
