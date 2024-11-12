"use client";
import { Suspense, useEffect, useState } from "react";
import GenericForm from "@/components/GenericForm";
import { Spinner } from "@nextui-org/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function EditItemUI() {
  const [idcategory, setCategory] = useState("");
  const [initialValues, setInitialValues] = useState({});
  const [initilabelCategory, setLabel] = useState("");
  const [success, setSuccess] = useState();
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const numserial = searchParams.get("numserial");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const itemResponse = await fetch(
          `https://uildbknzgh.execute-api.us-east-2.amazonaws.com/dev/items/${numserial}`
        );
        const itemData = await itemResponse.json();
        setInitialValues(itemData);
        if (itemData.categoryname) {
          const categoryResponse = await fetch(
            `https://uildbknzgh.execute-api.us-east-2.amazonaws.com/dev/category`
          );
          const categoryData = await categoryResponse.json();
          const categoryId = categoryData.find(
            (cat) => cat.categoryname === itemData.categoryname
          );
          setCategory(categoryId.idcategory);
          setLabel(itemData.categoryname);
        }
      } catch (error) {
        console.error("Error fetching item:", error);
      } finally {
        setLoading(false);
      }
    };

    if (numserial) {
      fetchData();
    }
  }, [numserial]);

  const handleSubmit = async (formData) => {
    console.log("soy el dato de actualizar", formData);
    const datUpdate = {
      idcategory: idcategory,
      mark: formData.mark,
      model: formData.model,
      image: formData.image,
      bar_code: formData.bar_code,
      activated: formData.activated,
      categoryname: formData.categoryname || null,
    };
    try {
      const response = await fetch(
        `https://uildbknzgh.execute-api.us-east-2.amazonaws.com/dev/items/${numserial}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(datUpdate),
        }
      );
      if (response.ok) {
        setSuccess(true);
        // Puedes redirigir aquí si es necesario
      } else {
        setSuccess(false);
      }
    } catch (error) {
      console.error("Error updating item:", error);
      setSuccess(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <Spinner size="lg" color="primary" />
        <h2 className="mt-4 text-lg text-gray-700">Loading data...</h2>
      </div>
    );
  }

  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center justify-center h-screen">
          <Spinner size="lg" color="primary" />
          <h2 className="mt-4 text-lg text-gray-700">Loading data...</h2>
        </div>
      }
    >
      {loading ? (
        <Spinner size="lg" color="primary" />
      ) : success === true ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="bg-white shadow-md rounded-lg p-6 w-96 text-center">
            <p>Item updated successfully!</p>
            <Link href="/inventory">
              <button className="mt-4 text-blue-500">Close</button>
            </Link>
          </div>
        </div>
      ) : success === false ? (
        <div className="flex items-center justify-center min-h-screen">
          <p>Failed to update item.</p>
          <Link href="/inventory">
            <button className="mt-4 text-blue-500">Close</button>
          </Link>
        </div>
      ) : (
        <GenericForm
          title="Edit Item"
          fields={[
            { name: "numserial", label: "Serial Number", type: "text" },
            { name: "model", label: "Model", type: "text" },
            { name: "image", label: "Image URL", type: "text" },
            { name: "bar_code", label: "Bar Code", type: "text" },
          ]}
          dropdowns={[
            {
              label: "Category",
              buttonLabel: initilabelCategory,
              urlApi:
                "https://uildbknzgh.execute-api.us-east-2.amazonaws.com/dev/category",
              onAction: (selected) => handleInputChange("idcategory", selected),
              idOfGet: "idcategory",
              nameOfGet: "categoryname",
            },
            {
              label: "Mark",
              buttonLabel: initialValues.mark,
              urlApi:
                "https://uildbknzgh.execute-api.us-east-2.amazonaws.com/dev/suppliers",
              onAction: (selected) => handleInputChange("idmark", selected),
              idOfGet: "idsuppliers",
              nameOfGet: "mark",
            },
          ]}
          onSubmit={handleSubmit}
          initialValues={initialValues}
        />
      )}
    </Suspense>
  );
}

export default function EditItem() {
  return (
    <Suspense>
      <EditItemUI />
    </Suspense>
  );
}
