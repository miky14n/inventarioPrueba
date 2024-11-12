import { useState } from "react";
import SimpleInput from "@/components/Input";
import NextButton from "@/components/Button";
import Alert from "@/components/Alert";
import NuxWayDropdown from "@/components/NuxWayDropdown";
import createBinnacle from "./createBinnacle";

export default function GenericForm({ fields, apiUrl, entityName }) {
  const [formData, setFormData] = useState({});
  const [success, setSuccess] = useState(null);

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const createEntity = async () => {
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();

        createBinnacle(formData.numSerial); // Si aplicable
        setFormData({});
        setSuccess(true);
      } else {
        const errorResult = await response.json();
        console.error(`Error creating ${entityName}:`, errorResult.message);
        setSuccess(false);
      }
    } catch (error) {
      console.error(`Error creating ${entityName}:`, error);
      setSuccess(false);
    }
  };

  return (
    <>
      {success === true && (
        <Alert
          message={`${entityName} created successfully!`}
          color="success"
          link=""
          setStatus={setSuccess}
        />
      )}
      {success === false && (
        <Alert
          message={`Is not possible to create the ${entityName}`}
          color="danger"
          link=""
          setStatus={setSuccess}
        />
      )}
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-md rounded-lg p-6 w-96">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Create {entityName}
          </h2>
          {fields.map((field) => {
            if (field.type === "dropdown") {
              return (
                <div key={field.name} className="mb-4">
                  <label className="block mb-2 font-semibold">
                    {field.label}
                  </label>
                  <NuxWayDropdown
                    buttonLabel={`Choose ${field.label}`}
                    urlApi={field.urlApi}
                    onActionName={(value) =>
                      handleInputChange(field.name, value)
                    }
                    idOfGet={field.idOfGet}
                    nameOfGet={field.nameOfGet}
                  />
                </div>
              );
            }

            if (field.type === "checkbox") {
              return (
                <div key={field.name} className="mb-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox"
                      checked={formData[field.name] || false}
                      onChange={(e) =>
                        handleInputChange(field.name, e.target.checked)
                      }
                    />
                    <span className="ml-2">{field.label}</span>
                  </label>
                </div>
              );
            }

            return (
              <div key={field.name} className="mb-4">
                <SimpleInput
                  type={field.type}
                  label={field.label}
                  variant="bordered"
                  value={formData[field.name] || ""}
                  onChange={(e) =>
                    handleInputChange(field.name, e.target.value)
                  }
                />
              </div>
            );
          })}
          <NextButton content={`Create ${entityName}`} action={createEntity} />
        </div>
      </div>
    </>
  );
}
