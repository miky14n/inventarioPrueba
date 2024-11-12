"use client";
import { useState, useEffect } from "react";
import NuxWayDropdown from "@/components/NuxWayDropdown";
import NuxwayTable from "@/components/NuxwayTable";
import { getItems, getBinnacle } from "../context/data/fetchData";
import BasicForm from "@/components/BasicForm";
import LoaderDoc from "@/components/LoaderDoc";

async function dataFilter(categoryName, items) {
  let data = items;
  if (!items || items.length === 0) {
    data = await getItems();
  }
  if (categoryName && categoryName !== "Todos") {
    const filteredData = data.filter(
      (item) => item.categoryname === categoryName
    );
    console.log("Filtered data:", filteredData);
    return filteredData;
  } else {
    console.log("Returning all data", data);
    return data;
  }
}
async function binnacleGet(binnacle, items, setBinnacle) {
  let data = binnacle || [];
  if (data.length === 0) {
    data = (await getBinnacle()) || [];
    setBinnacle(data);
    console.log("Respuesta de binncle:", data);
  }
  const uniqueBinnacleData = Array.from(
    new Map(data.map((item) => [item.numserial, item])).values()
  );
  const combinedData = items.map((item) => {
    const matchingEntry = uniqueBinnacleData.find(
      (binnacleItem) => binnacleItem.numserial === item.numserial
    );
    return matchingEntry
      ? { ...item, dateofentry: matchingEntry.dateofentry }
      : item;
  });
  const orderedData = combinedData.sort(
    (a, b) => new Date(a.dateofentry) - new Date(b.dateofentry)
  );

  return orderedData;
}

export default function Sales() {
  const [categoryName, setCategoryName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [items, setItems] = useState([]);
  const [binnacle, setBinnacle] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [itemSelected, setItemSelected] = useState(new Set());

  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await dataFilter(categoryName, items);
      const responseOrder = await binnacleGet(binnacle, result, setBinnacle);
      setFilteredItems(responseOrder);
    };
    fetchData();
  }, [categoryName, items]);

  const columns = [
    { name: "Serial Number", uid: "numserial", sortable: true },
    { name: "Category Name", uid: "categoryname", sortable: true },
    { name: "Mark", uid: "mark", sortable: true },
    { name: "Model", uid: "model", sortable: true },
    { name: "Image", uid: "image", sortable: true },
    { name: "Barcode", uid: "bar_code", sortable: true },
    { name: "Imei", uid: "imei" },
    { name: "Port Number", uid: "numberport" },
  ];

  const valueExtraComponent = (selectedNumSerial) => {
    return {
      numserial: selectedNumSerial,
      dateofentry: filteredItems.find(
        (item) => item.numserial === selectedNumSerial
      )?.dateofentry,
      clientid: companyName,
    };
  };
  const propsForm = (item) => ({
    layout: "horizontal",
    fields: [
      { name: `support`, type: "checkbox", label: "Support" },
      { name: `rack`, type: "checkbox", label: "Rack" },
      { name: `sold`, type: "checkbox", label: "Sold" },
    ],
    apiUrl:
      "https://uildbknzgh.execute-api.us-east-2.amazonaws.com/dev/binnacle",
    typeRequestApi: "PUT",
    formTitle: `Record Inventory Output for ${item}`,
    onSuccessMessage: "Successfully created venta",
    onErrorMessage: "Error creating venta",
    buttonLabel: "Save",
    extraComponent: (
      <div>
        <NuxWayDropdown
          buttonLabel="Choose Client"
          urlApi="https://uildbknzgh.execute-api.us-east-2.amazonaws.com/dev/clients"
          onActionId={(selectedCompanyName) =>
            setCompanyName(selectedCompanyName)
          }
          idOfGet="clientid"
          nameOfGet="companyname"
        />
      </div>
    ),
    valueExtraComponent: valueExtraComponent(item),
    titleDate: "Enter the loan deadline",
    actionOnSuccess: <LoaderDoc />, // Asegúrate de que el nombre de la prop esté correctamente escrito
  });

  return (
    <div className="border-collapse border-spacing-0 border border-gray-300 rounded-lg shadow-lg bg-slate-50">
      <div className="flex justify-start gap-4 mb-4">
        <NuxWayDropdown
          buttonLabel="Choose Category"
          urlApi="https://uildbknzgh.execute-api.us-east-2.amazonaws.com/dev/category"
          onActionName={(selectedCategoryName) =>
            setCategoryName(selectedCategoryName)
          }
          idOfGet="idcategory"
          nameOfGet="categoryname"
        />
      </div>
      <div className="mb-4 flex-grow">
        <NuxwayTable
          resources={filteredItems}
          typeSelection="multiple"
          searchers={["model", "mark"]}
          actions={["View", "Edit", "Delete"]}
          columns={columns}
          setSelecetedItems={setItemSelected}
        />
      </div>

      {itemSelected.size > 0 && (
        <div className="mb-8">
          {Array.from(itemSelected).map((item, index) => (
            <div key={index} className="mb-8">
              <BasicForm {...propsForm(item)} />
              <div className="p-4 border border-gray-300 rounded"></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
