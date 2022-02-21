import React from "react";

const MenuCloseBtnIcon = (props) => {
  return (
    <button className="MenuCloseBtnIcon" onClick={props.onClick}>
      <svg viewBox="0 0.001 25 25">
        <path
          fill="rgba(255,255,255,1)"
          d="M13.88 12.5L24.715 1.669A.977.977 0 1023.333.287L12.5 11.12 1.667.287a.977.977 0 10-1.381 1.38l10.833 10.834L.286 23.334a.977.977 0 101.38 1.38L12.5 13.883l10.833 10.833a.974.974 0 001.38 0 .977.977 0 000-1.381L13.882 12.5z"
        ></path>
      </svg>
    </button>
  );
}

export default MenuCloseBtnIcon;
