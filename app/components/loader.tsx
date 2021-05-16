import React from "react";
import styles from "./styles/loader.css";

function Loader(props: React.SVGAttributes<HTMLOrSVGElement>) {
  return (
    <svg className="spinner" viewBox="0 0 50 50" {...props}>
      <circle
        className="path"
        cx="25"
        cy="25"
        r="20"
        fill="none"
        strokeWidth="5"
      />
    </svg>
  );
}
Loader.styles = styles;

export default Loader;
