"use client";
import { Tooltip, Button } from "@nextui-org/react";
import { useState, useContext, useMemo } from "react";
import { MdOutlineSettings } from "react-icons/md";
import SettingsContext from "@/app/context/SettingsContext";

export default function Customizer() {
  const {
    fontSize = "text-base",
    fontColor = "text-customblack",
    fontFamily = "font-sans",
    bgColor = "background",
    setFontSize,
    setFontColor,
    setFontFamily,
    setBgColor,
  } = useContext(SettingsContext);

  const [topNavChecked, setTopNavChecked] = useState(true); // Top navigation checked by default
  const [sideNavChecked, setSideNavChecked] = useState(false); // Side navigation unchecked by default

  const handleInputChange = (setter) => (e) => setter(e.target.value);

  // Función para asegurar que solo uno esté marcado a la vez
  const handleNavChange = (type) => {
    localStorage.setItem("menuseting", type);
    if (type === "topNav") {
      setTopNavChecked(true);
      setSideNavChecked(false);
    } else {
      setTopNavChecked(false);
      setSideNavChecked(true);
    }
  };

  // Use useMemo to recalculate customClasses whenever settings change
  const customClasses = useMemo(() => {
    return `${fontColor} ${bgColor} ${fontFamily} ${fontSize}`;
  }, [fontColor, bgColor, fontFamily, fontSize]);

  const renderContent = (
    <div className={`px-1 py-2 w-full ${customClasses}`}>
      <p className="text-small font-bold">Dimensions</p>
      <div className="mt-2 flex flex-col gap-2 w-full">
        {/* Font Size */}
        <div className="mb-4">
          <label htmlFor="fontSize" className="block mb-2">
            Font Size
          </label>
          <select
            id="fontSize"
            onChange={handleInputChange(setFontSize)}
            className="border rounded-md p-2 w-full"
            value={fontSize}
          >
            <option value="text-sm">Small</option>
            <option value="text-base">Base</option>
            <option value="text-lg">Large</option>
            <option value="text-xl">Extra Large</option>
          </select>
        </div>

        {/* Font Color */}
        <div className="mb-4">
          <label htmlFor="fontColor" className="block mb-2">
            Font Color
          </label>
          <select
            id="fontColor"
            onChange={handleInputChange(setFontColor)}
            className="border rounded-md p-2 w-full"
            value={fontColor}
          >
            <option value="text-black">Black</option>
            <option value="text-stone-500">Gray</option>
            <option value="text-blue-800">Blue</option>
            <option value="text-red-700">Red</option>
          </select>
        </div>

        {/* Font Family */}
        <div className="mb-4">
          <label htmlFor="fontFamily" className="block mb-2">
            Font Family
          </label>
          <select
            id="fontFamily"
            onChange={handleInputChange(setFontFamily)}
            className="border rounded-md p-2 w-full"
            value={fontFamily}
          >
            <option value="font-sans">Sans</option>
            <option value="font-serif">Serif</option>
            <option value="font-mono">Monospace</option>
            <option value="font-chivo">Chivo</option>
          </select>
        </div>

        {/* Background Color */}
        <div className="mb-4">
          <label htmlFor="bgColor" className="block mb-2">
            Background Color
          </label>
          <select
            id="bgColor"
            onChange={handleInputChange(setBgColor)}
            className="border rounded-md p-2 w-full"
            value={bgColor}
          >
            <option value="whith">White</option>
            <option value="secondary">Light Gray</option>
            <option value="blue">Light Blue</option>
            <option value="primary">Orange</option>
            <option value="adribg"> Violet</option>
            <option value="omibg">Blue</option>
          </select>
        </div>

        {/* Checkbox for navbar options */}
        <div className="mb-4">
          <label className="block mb-2">Navigation Bar</label>

          <div className="flex items-center mb-2">
            <input
              type="checkbox"
              id="topNav"
              className="mr-2"
              checked={topNavChecked}
              onChange={() => handleNavChange("topNav")}
            />
            <label htmlFor="topNav">Top Navigation Bar</label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="sideNav"
              className="mr-2"
              checked={sideNavChecked}
              onChange={() => handleNavChange("sideNav")}
            />
            <label htmlFor="sideNav">Side Navigation Bar</label>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div
      className={`fixed bottom-4 right-4 z-50  ${customClasses} stroke-black fill-black`}
    >
      <Tooltip content={renderContent} placement="top" hideArrow={false}>
        <Button
          variant="bordered"
          className="flex items-center justify-center w-16 h-16 rounded-full border-black"
          aria-label="Customizer"
        >
          <MdOutlineSettings size={24} />
        </Button>
      </Tooltip>
    </div>
  );
}
