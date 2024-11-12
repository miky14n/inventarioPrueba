"use client";
import NuxButton from "@/components/Button";
import NuxContainer from "@/components/Container";
import NuxwayTable from "@/components/NuxwayTable";

import { getItems } from "../context/data/fetchData";
import { useEffect, useState } from "react";

function Inventory() {
  const [itemsArray, setItemsArray] = useState([]);
  const fetchData = async () => {
    const data = await getItems();
    setItemsArray(Array.isArray(data) ? data : []);
  };
  useEffect(() => {
    fetchData();
  }, []);
  const columns = [
    { name: "Serial Number", uid: "numserial", sortable: true },
    { name: "Category Name", uid: "categoryname", sortable: true },
    { name: "Mark", uid: "mark", sortable: true },
    { name: "Model", uid: "model", sortable: true },
    { name: "Image", uid: "image", sortable: true },
    { name: "Barcode", uid: "bar_code", sortable: true },
    { name: "Imei", uid: "imei" },
    { name: "Port Number", uid: "numberport" },
    { name: "Actions", uid: "actions" },
  ];
  return (
    <div className="w-full">
      <NuxContainer>
        <NuxwayTable
          resources={itemsArray}
          actions={["View", "Edit", "Delete"]}
          columns={columns}
          addInventory={true}
          searchers={["model", "mark", "numserial"]}
        />
      </NuxContainer>
    </div>
  );
}

export default Inventory;
