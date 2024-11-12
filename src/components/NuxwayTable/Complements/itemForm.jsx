import GenericForm from "./GenericForm";

export default function CreateItem() {
    const itemFields = [
      { name: "numSerial", type: "text", label: "Serial Number" },
      { name: "idcategory", type: "dropdown", label: "Category", urlApi: "https://uildbknzgh.execute-api.us-east-2.amazonaws.com/dev/category", idOfGet: "idcategory", nameOfGet: "categoryname" },
      { name: "mark", type: "dropdown", label: "Mark", urlApi: "https://uildbknzgh.execute-api.us-east-2.amazonaws.com/dev/suppliers", idOfGet: "idsuppliers", nameOfGet: "mark" },
      { name: "model", type: "text", label: "Model" },
      { name: "Image", type: "text", label: "Image URL" },
      { name: "bar_code", type: "text", label: "Bar Code" },
    ];
  
    return (
      <GenericForm
        fields={itemFields}
        apiUrl="https://uildbknzgh.execute-api.us-east-2.amazonaws.com/dev/items"
        entityName="Item"
      />
    );
  }
  