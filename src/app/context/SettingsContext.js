"use client";
import { createContext, useState, useEffect } from "react";

const SettingsContext = createContext();

export function SettingsProvider({ children }) {
  const [fontSize, setFontSize] = useState("text-base");
  const [fontColor, setFontColor] = useState("text-black");
  const [fontFamily, setFontFamily] = useState("font-sans");
  const [bgColor, setBgColor] = useState("");
  const gradientMap = {
    whith: "bg-gradient-to-b from-white to-gray-100",
    secondary: "bg-gradient-to-t from-stone-100 to-neutral-900",
    blue: "bg-gradient-to-b from-blue-200 to-blue-300",
    primary: "bg-gradient-to-t from-orange-100 to-orange-500",
    adribg: "bg-gradient-to-b from-fuchsia-700 to-rose-600",
    omibg: "bg-gradient-to-br from-teal-400 via-sky-600 to-sky-900",
  };
  useEffect(() => {
    const storedFontSize = localStorage.getItem("fontSize");
    const storedFontColor = localStorage.getItem("fontColor");
    const storedFontFamily = localStorage.getItem("fontFamily");
    const storedBgColor = localStorage.getItem("bgColor");

    if (storedFontSize) setFontSize(storedFontSize);
    if (storedFontColor) setFontColor(storedFontColor);
    if (storedFontFamily) setFontFamily(storedFontFamily);
    if (storedBgColor) setBgColor(storedBgColor); // Almacenar el color sin prefijo
  }, []);

  return (
    <SettingsContext.Provider
      value={{
        fontSize,
        setFontSize,
        fontColor,
        setFontColor,
        fontFamily,
        setFontFamily,
        bgColor, // Estado del color de fondo
        setBgColor: (color) => setBgColor(color), // Almacenar el color sin prefijo
      }}
    >
      <div
        className={`${fontSize} ${fontColor} ${fontFamily} ${gradientMap[bgColor]}`}
      >
        {children}
      </div>
    </SettingsContext.Provider>
  );
}

export default SettingsContext;
