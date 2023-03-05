import { TrustConnect } from "@/actions/TrustConnect";
import { TrustInit } from "@/actions/TrustInit";
import React, { useEffect } from "react";

const Trust = () => {

  useEffect(() => {
    TrustInit()
  }, []);

  return (
    <div>
      <button onClick={TrustConnect}>Connect</button>
    </div>
  );
};

export default Trust;