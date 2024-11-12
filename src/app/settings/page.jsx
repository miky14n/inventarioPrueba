import BasicForm from "@/components/BasicForm";
export default function Settings() {
  /***/
  return (
    <div className="mt-16">
      <div className="mb-8">
        <BasicForm
          layout="horizontal"
          fields={[
            { name: "mark", type: "text", label: "Mark" },
            { name: "isPartner", type: "checkbox", label: "Is Partner?" },
          ]}
          apiUrl="https://uildbknzgh.execute-api.us-east-2.amazonaws.com/dev/suppliers"
          formTitle="Create Supplier"
          onSuccessMessage="Successfully created Supplier"
          onErrorMessage="Error creating Supplier"
          buttonLabel="Create Supplier"
        />
      </div>
      <hr className="border-t-2 border-gray-300 my-6" />
      <div>
        <BasicForm
          layout="horizontal"
          fields={[
            { name: "categoryName", type: "text", label: "Category Name" },
            { name: "description", type: "text", label: "Description" },
          ]}
          apiUrl="https://uildbknzgh.execute-api.us-east-2.amazonaws.com/dev/category"
          formTitle="Create Category"
          onSuccessMessage="Successfully created Category"
          onErrorMessage="Error creating Category"
          buttonLabel="Create Category"
        />
      </div>
    </div>
  );
}
