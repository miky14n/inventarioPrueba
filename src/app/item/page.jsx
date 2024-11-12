"use client";
import { useState, useEffect } from "react";
import SimpleInput from "@/components/Input";
import NextButton from "@/components/Button";
import Alert from "@/components/Alert";
import NuxWayDropdown from "@/components/NuxWayDropdown";
import createBinnacle from "./createBinnacle";
import Link from "next/link";

export default function Item() {
  const [categoryName, setCategoryName] = useState("");
  const [mark, setMark] = useState("");
  const [model, setModel] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [barCode, setBarCode] = useState("n/a");
  const [activated, setActivated] = useState(false);
  const [success, setSuccess] = useState(null);
  const [numSerial, setNumSerial] = useState("");
  const [imei, setImei] = useState("");
  const [port, setPort] = useState("");

  const handleSelect = (id, name) => {
    setCategoryName(name);
  };

  const createItem = async () => {
    const itemData = {
      numserial: numSerial,
      idcategory: categoryName.toString(),
      mark: mark,
      model: model,
      image: imageURL,
      bar_code: barCode,
      activated: activated,
      imei: imei.toString(),
      numberport: port,
    };
    console.log(itemData, "Que se envia");
    try {
      const response = await fetch(
        "https://uildbknzgh.execute-api.us-east-2.amazonaws.com/dev/items",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(itemData),
        }
      );

      if (response.ok) {
        const result = await response.json();
        createBinnacle(numSerial);
        // Reset fields
        setCategoryName("");
        setMark("");
        setModel("");
        setImageURL("");
        setBarCode("");
        setActivated(false);
        setNumSerial("");
        setSuccess(true);
      } else {
        const errorResult = await response.json();
        console.error("Error creating item:", errorResult.message);
        setSuccess(false);
      }
    } catch (error) {
      console.error("Error creating item:", error);
      setSuccess(false);
    }
  };

  return (
    <>
      {success === true && (
        <div className="flex items-center justify-center min-h-screen">
          <div className="bg-white shadow-md rounded-lg p-6 w-96 text-center">
            <div className="flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="ml-1 text-xl font-bold">Success!</span>
            </div>
            <p>Item created successfully!</p>
            <Link href="/inventory">
              <button
                // onClick={() => setSuccess(null)}
                className="mt-4 text-blue-500"
              >
                Close
              </button>
            </Link>
          </div>
        </div>
      )}
      {success === false && (
        <div className="flex items-center justify-center min-h-screen">
          <div className="bg-white shadow-md rounded-lg p-6 w-96 text-center">
            <div className="flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01M12 4.5L2 20h20L12 4.5z"
                />
              </svg>
              <span className="ml-2 text-xl font-bold">Error!</span>
            </div>
            <p>Is not possible to create the Item</p>
            <Link href="/inventory">
              <button
                // onClick={() => setSuccess(null)}
                className="mt-4 text-blue-500"
              >
                Close
              </button>
            </Link>
          </div>
        </div>
      )}

      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-md rounded-lg p-6 w-96">
          <h2 className="text-2xl font-bold mb-4 text-center">Create Item</h2>
          <div className="mb-4">
            <SimpleInput
              type="text"
              label="Serial Number"
              variant="bordered"
              value={numSerial}
              onChange={(e) => setNumSerial(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Category</label>
            <NuxWayDropdown
              buttonLabel="Choose Category"
              urlApi="https://uildbknzgh.execute-api.us-east-2.amazonaws.com/dev/category"
              onActionId={(selectedCategoryName) =>
                setCategoryName(selectedCategoryName)
              }
              idOfGet="idcategory"
              nameOfGet="categoryname"
            />
          </div>
          {categoryName.toString() === "1" && (
            <>
              <div className="mb-4">
                <SimpleInput
                  type="text"
                  label="Imei"
                  variant="bordered"
                  value={imei}
                  onChange={(e) => setImei(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <SimpleInput
                  type="text"
                  label="Number of Port"
                  variant="bordered"
                  value={port}
                  onChange={(e) => setPort(e.target.value)}
                />
              </div>
            </>
          )}

          <div className="mb-4">
            <label className="block mb-2 font-semibold">Mark</label>
            <NuxWayDropdown
              buttonLabel="Choose Mark"
              urlApi="https://uildbknzgh.execute-api.us-east-2.amazonaws.com/dev/suppliers"
              onActionName={(selectedMark) => setMark(selectedMark)}
              idOfGet="idsuppliers"
              nameOfGet="mark"
            />
          </div>
          <div className="mb-4">
            <SimpleInput
              type="text"
              label="Model"
              variant="bordered"
              value={model}
              onChange={(e) => setModel(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <SimpleInput
              type="text"
              label="Image URL"
              variant="bordered"
              value={imageURL}
              onChange={(e) => setImageURL(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <SimpleInput
              type="text"
              label="Bar Code"
              variant="bordered"
              value={barCode}
              onChange={(e) => setBarCode(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox"
                checked={activated}
                onChange={(e) => setActivated(e.target.checked)}
              />
              <span className="ml-2">Activated</span>
            </label>
          </div>

          <NextButton content="Create Item" action={createItem} />
        </div>
      </div>
    </>
  );
}
