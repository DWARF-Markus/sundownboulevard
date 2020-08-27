import React from "react";
import { Link } from "react-router-dom";
import "./PrimaryBtn.scss";

function PrimaryBtn({ title, icon, navigateTo }) {
  return (
    <Link to={navigateTo}>
      <button type="submit" className="primary-btn">
        {title}
        <i className={icon}> </i>
      </button>
    </Link>
  );
}

export default PrimaryBtn;
