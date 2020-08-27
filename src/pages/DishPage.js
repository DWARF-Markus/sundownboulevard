import React from "react";
import TimelineBanner from "../components/ui/TimelineBanner/TimelineBanner";
import PrimaryBtn from "../components/ui/PrimaryBtn/PrimaryBtn";

function DishPage() {
  return (
    <div className="page-wrapper">
      <TimelineBanner />
      <div className="m-1 text-right">
        <PrimaryBtn icon="fa fa-caret-right" title="Next" />
      </div>
    </div>
  );
}

export default DishPage;
