import React from "react";
import { ProgressSpinner } from "primereact/progressspinner";

export default function Loader({ styles }) {
  return (
    <div className="card" style={{ ...styles }}>
      <ProgressSpinner
        style={{ width: "50px", height: "50px" }}
        strokeWidth="8"
        fill="transparent"
        animationDuration="1s"
      />
    </div>
  );
}
