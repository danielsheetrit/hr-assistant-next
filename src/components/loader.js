import React from "react";
import { ProgressSpinner } from "primereact/progressspinner";

export default function Loader() {
  return (
    <div className="card" style={{ height: "100%", margin: "50% auto" }}>
      <ProgressSpinner
        style={{ width: "50px", height: "50px" }}
        strokeWidth="8"
        fill="transparent"
        animationDuration="1s"
      />
    </div>
  );
}
