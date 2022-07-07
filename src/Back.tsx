import React from "react";
import back from "./UI_back.png";

const Back = () => {
  return (
    <div
      style={{
        position: "fixed",
        right: 35,
        top: 20,
        zIndex: 10000,
      }}
    >
      <img
        style={{
          cursor: "pointer",
        }}
        onClick={() => {
          window.location.replace("/");
        }}
        width={55}
        height={35}
        src={back}
        alt=""
      />
    </div>
  );
};

export default Back;
