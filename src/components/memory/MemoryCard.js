import React from "react";
import "./MemoryCard.css";

function MemoryCard({ color, isFlipped, onClick }) {
  return (
    <div
      className={"memory-card" + (isFlipped ? " " + color : "")}
      onClick={onClick}
    ></div>
  );
}

export default MemoryCard;
