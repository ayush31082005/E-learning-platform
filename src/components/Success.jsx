import React from "react";

const Success = () => {
  return (
    <div style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column"
    }}>
      <h1>🎉 Payment Successful!</h1>
      <p>Your enrollment is confirmed.</p>
    </div>
  );
};

export default Success;
