"use client";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { useState, useEffect } from "react";

export default function NuxWayDropdown({
  buttonLabel,
  urlApi,
  onActionName = () => {},
  onActionId = () => {},
  idOfGet,
  nameOfGet,
}) {
  const [menuItems, setMenuItems] = useState([]);
  const [selectedItemName, setSelectedItemName] = useState(
    buttonLabel || "Choose an option"
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Fetch de datos desde la API (puede ser marcas o categorías según lo que envíes)
  useEffect(() => {
    const fetchApi = async () => {
      setLoading(true);
      try {
        const response = await fetch(urlApi, {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error("Error fetching data");
        }
        const data = await response.json();
        const addData = [{ categoryname: "Todos", idcategory: 99 }, ...data];
        setMenuItems(addData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchApi();
  }, [urlApi]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleSelect = (id, name) => {
    setSelectedItemName(name);
    console.log(name);
    onActionName(name);
    onActionId(id);
  };

  return (
    <Dropdown backdrop="blur">
      <DropdownTrigger>
        <Button variant="bordered">{selectedItemName}</Button>
      </DropdownTrigger>
      <DropdownMenu variant="faded" aria-label="Dropdown Actions">
        {menuItems.map((item) => (
          <DropdownItem
            key={item[idOfGet]}
            onClick={() => handleSelect(item[idOfGet], item[nameOfGet])}
          >
            {item[nameOfGet]}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
