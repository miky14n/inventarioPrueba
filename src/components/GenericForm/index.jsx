"use client";
import { useEffect, useState, useMemo } from "react";
import SimpleInput from "@/components/Input";
import NextButton from "@/components/Button";
import Alert from "@/components/Alert";
import NuxWayDropdown from "@/components/NuxWayDropdown";

export default function GenericForm({
  title,
  fields,
  dropdowns,
  alertConfig = null,
  onSubmit,
  initialValues = {},
  buttonLabel = "Submit",
}) {
  const [formData, setFormData] = useState(initialValues);

  // Memoriza los valores iniciales para evitar cambios innecesarios
  const memoizedInitialValues = useMemo(() => initialValues, [initialValues]);

  useEffect(() => {
    setFormData(memoizedInitialValues);
  }, [memoizedInitialValues]);

  const handleInputChange = (field, value, nameColum) => {
    setFormData((prevData) => ({
      ...prevData,
      [field || nameColum]: value,
    }));
  };

  return (
    <>
      {alertConfig && alertConfig.success !== undefined && (
        <Alert
          message={
            alertConfig.success
              ? alertConfig.successMessage
              : alertConfig.errorMessage
          }
          color={alertConfig.success ? "success" : "danger"}
          link=""
          setStatus={alertConfig.setSuccess}
        />
      )}
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-md rounded-lg p-6 w-96">
          <h2 className="text-2xl font-bold mb-4 text-center">{title}</h2>
          {fields.map((field, index) => (
            <div key={index} className="mb-4">
              <SimpleInput
                type={field.type}
                label={field.label}
                variant="bordered"
                value={formData[field.name] ?? ""}
                onChange={(e) => handleInputChange(field.name, e.target.value)}
              />
            </div>
          ))}
          {dropdowns.map((dropdown, index) => (
            <div key={index} className="mb-4">
              <label className="block mb-2 font-semibold">
                {dropdown.label}
              </label>
              <NuxWayDropdown
                buttonLabel={dropdown.buttonLabel}
                urlApi={dropdown.urlApi}
                onActionName={(selected) =>
                  handleInputChange(
                    dropdown.fieldName,
                    selected,
                    dropdown.nameOfGet
                  )
                }
                idOfGet={dropdown.idOfGet}
                nameOfGet={dropdown.nameOfGet}
              />
            </div>
          ))}
          <NextButton content={buttonLabel} action={() => onSubmit(formData)} />
        </div>
      </div>
    </>
  );
}
