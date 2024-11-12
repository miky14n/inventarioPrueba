"use client";
// React
import React from "react";

/*
    NuxContainer
    This is a simple container that holds elements.

    Inputs:
    size: small, medium, large
    radius: full, sm, md, lg, none
    bgColor: "nameColor"
    children: Text or Icon
    className: TailWindCSS
    flexDirection: row | column
    alignItems: start | center | end
    justifyContent: start | center | end | between | around | evenly
*/

const NuxContainer = ({
  children,
  size = "large",
  bgColor = "bg-white",
  flexDirection = "row", // Comportamiento por defecto
  alignItems = "center", // Comportamiento por defecto
  justifyContent = "center", // Comportamiento por defecto
}) => {
  let sizeClasses;

  switch (size) {
    case "small":
      sizeClasses = "w-64 h-64";
      break;
    case "large":
      sizeClasses = "w-85 h-85";
      break;
    case "medium":
    default:
      sizeClasses = "w-72 h-72";
      break;
  }

  return (
    <div
      className={`flex ${flexDirection} items-${alignItems} justify-${justifyContent} ${sizeClasses} m-3 p-10`}
      style={{
        borderRadius: "6px",
        background: "linear-gradient(145deg, #f0f0f0, #ffffff)",
        boxShadow: "13px 13px 24px #7b7b7b, -13px -13px 24px #ffffff",
      }}
    >
      {children}
    </div>
  );
};

export default NuxContainer;
