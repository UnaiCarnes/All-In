import React from "react";

const Balance = ({ balance }) => {
  return (
    <div style={{ marginBottom: "20px", fontSize: "1.5rem" }}>
      <strong>Balance:</strong>{" "}
      <span style={{ color: "#4caf50", fontWeight: "bold" }}>
        {balance} pambicoins
      </span>
    </div>
  );
};

export default Balance;
