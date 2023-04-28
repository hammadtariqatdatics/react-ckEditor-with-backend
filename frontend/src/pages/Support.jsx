import React from "react";
import HeroBanner from "../components/hero/HeroBanner";
import Chat from "../components/support/Chat";

const Support = () => {
  return (
    <>
      <HeroBanner
        headingText="Support"
        paraText="Here you can chat with our customer support"
      />
      <Chat />
    </>
  );
};

export default Support;
