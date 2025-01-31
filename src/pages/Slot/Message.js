import React from "react";

const Message = ({ message }) => {
  return (
    <div style={{ marginBottom: "20px", fontSize: "1.2rem", color: "#f50057" }}>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Message;
