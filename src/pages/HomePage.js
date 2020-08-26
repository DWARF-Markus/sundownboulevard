import React from "react";

import PrimaryBtn from "../components/ui/PrimaryBtn/PrimaryBtn";
import EmailInput from "../components/home/EmailInput/EmailInput";

function HomePage() {
  return (
    <div className="page-wrapper">
      <PrimaryBtn title="BOOK" navigateTo="/dish" />
      <div className="block">slider</div>
      <EmailInput />
    </div>
  );
}

export default HomePage;
