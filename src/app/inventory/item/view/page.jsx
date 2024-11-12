"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import InventoryItemCard from "@/app/inventory/item/InventoryItemCard";

function ItemDetailUI() {
  const searchParams = useSearchParams();
  const [itemData, setItemData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Obtener el numserial desde los query parameters
  const numserial = searchParams.get("numserial");

  useEffect(() => {
    console.log("Número serial:", numserial);

    if (!numserial) {
      setError("No se proporcionó número serial");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://uildbknzgh.execute-api.us-east-2.amazonaws.com/dev/items/${numserial}`
        );

        if (!response.ok) {
          throw new Error("Error al obtener los datos");
        }

        const data = await response.json();
        console.log("Datos recibidos:", data);
        setItemData(data);
      } catch (error) {
        console.error("Error:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [numserial]);

  if (loading) return <div className="text-center p-4">Cargando...</div>;
  if (error) return <div className="text-center p-4 text-red-500">{error}</div>;
  if (!itemData)
    return <div className="text-center p-4">No se encontraron datos</div>;

  return (
    <div>
      fallback=
      {
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center p-5">
            <InventoryItemCard item={itemData} />
          </div>
        </div>
      }
    </div>
  );
}

export default function ItemDetail() {
  return (
    <Suspense>
      <ItemDetailUI />
    </Suspense>
  );
}
