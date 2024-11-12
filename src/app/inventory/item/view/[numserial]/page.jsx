import InventoryItemCard from "../InventoryItemCard";
export default async function ItemDetail({ params }) {
  const { numserial } = params;
  let itemData = null;

  try {
    const response = await fetch(
      `https://uildbknzgh.execute-api.us-east-2.amazonaws.com/dev/items/${numserial}`
    );
    itemData = await response.json();
  } catch (error) {
    console.error("Error:", error);
  }

  //console.log("Datos del ítem:", itemData);
  if (!itemData) return <div>No se encontraron datos</div>;

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
